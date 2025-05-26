  import axios from '../axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
const User = () => {
  const [data, setData] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    const user = async () => {
      try {
        const response = await axios.get('/userData')
        setData(response.data)
      } catch (err) {
        console.log('aldaa garlaa', err)
      }
    }
    user()
  }, [])
  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        {<Spinner />}
      </div>
    )
  }
  const { name, phone, tolbor, orst, haalga } = data.user

  const logOut = () => {
    localStorage.clear('token')
    navigate('/login')
  }
  return (
    <div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-2xl text-white transition-all cursor-pointer rounded-lg py-2 px-6 ml-auto block m-2"
        onClick={logOut}
      >
        Гарах
      </button>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {name}
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Утас:</strong> {phone}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Орц:</strong> {orst}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Тоот:</strong> {haalga}
        </p>
        <p className=" text-gray-600 ">
          <strong>Төлбөр:</strong> {tolbor}₮
        </p>
      </div>
    </div>
  )
}

export default User
