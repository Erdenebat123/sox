import axios from '../axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    phone: '',
    password: '',
  })

  const loginUser = async e => {
    e.preventDefault()
    const { phone, password } = data
    try {
      const { data } = await axios.post('/login', {
        phone,
        password,
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        toast.success('amjilttai login hiilee')
        localStorage.setItem('token', data.token)
        if (data.user.role === 'admin') navigate('/admin')
        else {
          navigate('/user')
        }
        setData({ phone: '', password: '' })
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <div>
      <form
        onSubmit={loginUser}
        className="bg-gray-100 flex justify-center items-center h-screen"
      >
        <div className="border-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="text-center text-2xl font-bold mb-6">Нэвтрэх</div>
          <label className="text-sm font-medium text-gray-700">Утасны дугаар</label>
          <input
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="tel"
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
            <a href="/register" className='mt-2 block'>Бүртгүүлэх</a>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
