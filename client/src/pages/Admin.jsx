import axios from '../axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Admin = () => {
  const [data, setData] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('/getusers')
      setData(response.data)
    }
    getUser()
  }, [])

  const userDelete = async id => {
    if (confirm('Устгахдаа итгэлтэй байна уу?')) {
      try {
        await axios.delete(`/deleteuser/${id}`)
        setData(data.filter(user => user._id !== id))
        toast.success('hereglegchiig amjilttai ustgalaa')
      } catch (err) {
        toast.error('aldaa garlaa', err)
      }
    }
  }

  const userUpdate = async (id, newTolbor) => {
    try {
      await axios.put(`/updateuser/${id}`, { tolbor: newTolbor })

      setData(
        data.map(user =>
          user._id === id ? { ...user, tolbor: newTolbor } : user
        )
      )
      toast.success('tolboriig amjilttai shinchlelee')
    } catch (err) {
      toast.error('Шинэчлэхэд алдаа гарлаа')
    }
  }

  const logOut = () => {
    localStorage.clear('token')
    navigate('/login')
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        {<Spinner />}
      </div>
    )
  }

  return (
    <div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-2xl text-white transition-all cursor-pointer rounded-lg py-2 px-6 ml-auto block m-2"
        onClick={logOut}
      >
        Гарах
      </button>
      <div className="p-2">
        <h1 className="text-3xl font-bold text-center">ADMIN</h1>
        <h1 className="text-2xl font-bold mb-4 ">Хэрэглэгчдийн жагсаалт</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Нэр</th>
                <th className="border px-4 py-2">Утас</th>
                <th className="border px-4 py-2">Орц</th>
                <th className="border px-4 py-2">Тоот</th>
                <th className="border px-4 py-2">Төлбөр</th>
                <th className="border px-4 py-2">Үйлдэл</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter(user => user.role !== 'admin')
                .map((el, index) => (
                  <tr key={el._id} className="text-center hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{el.name}</td>
                    <td className="border px-4 py-2">{el.phone}</td>
                    <td className="border px-4 py-2">{el.orst}</td>
                    <td className="border px-4 py-2">{el.haalga}</td>
                    <td className="border px-4 py-2">
                      {el.tolbor.toLocaleString()}₮
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => {
                          const newTolbor = prompt(
                            'Шинэ төлбөрийг оруулна уу:',
                            el.tolbor
                          )
                          if (newTolbor) {
                            userUpdate(el._id, parseInt(newTolbor))
                          }
                        }}
                        className="bg-blue-500 rounded px-2 hover:bg-blue-600 mr-5 "
                      >
                        Засах
                      </button>
                      <button
                        className="bg-red-500 rounded px-2 hover:bg-red-600"
                        onClick={() => userDelete(el._id)}
                      >
                        Устгах
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Admin
