import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    phone: '',
    password: '',
    orst: '',
    haalga: '',
  })
  const registerUser = async e => {
    e.preventDefault()
    const { name, phone, password, orst, haalga } = data
    try {
      const { data } = await axios.post('/register', { name, phone, password, orst, haalga })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({ name: '', phone: '', password: '', orst: '', haalga: ''})
        toast.success('register succussful ')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form
        onSubmit={registerUser}
        className="bg-gray-100 flex items-center justify-center h-screen"
      >
        <div className="border-white p-8 rounded-2xl shadow-lg w-full max-w-sm ">
          <div className="text-center text-2xl font-bold mb-6">Бүртгүүлэх</div>
          <label className="text-sm font-medium text-gray-700">Нэр</label>
          <input
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            placeholder="enter name..."
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
          />
          <label className="text-sm font-medium text-gray-700 ">
            Утасны дугаар
          </label>
          <input
            className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="number"
            placeholder="enter number..."
            value={data.phone}
            onChange={e => setData({ ...data, phone: e.target.value })}
          />
          <label className="text-sm font-medium text-gray-700">Нууц үг</label>
          <input
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="password"
            placeholder="enter password..."
            value={data.password}
            onChange={e => setData({ ...data, password: e.target.value })}
          />

          <div className="flex gap-5 pt-2">
            <div className="flex-1">
              <label className="block mb-1">Орц</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="number"
                placeholder="enter"
                value={data.orst}
                onChange={e => setData({ ...data, orst: e.target.value })}
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1">Тоот</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                type="number"
                placeholder="enter"
                value={data.haalga}
                onChange={e => setData({ ...data, haalga: e.target.value })}
              />
            </div>
          </div>

          <a href="/login" className='mt-2 block'>Бүртгүүлсэн</a>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all cursor-pointer"
          >
            Бүртгүүлэх
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
