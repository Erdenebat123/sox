const User = require('../Model/user')
const { hashPassword, comparePassword } = require('../helpers/auth.js')
const jwt = require('jsonwebtoken')

const test = (reg, res) => {
  res.json('test is working')
}
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name) {
      return res.json({
        error: 'name is required',
      })
    }

    if (!password || password.length < 6) {
      return res.json({
        error: 'Password bogino',
      })
    }

    const exits = await User.findOne({ email })
    if (exits) {
      return res.json({
        error: 'email burguulsen baina',
      })
    }
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    return res.json(user)
  } catch (err) {
    console.log(err)
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({
        error: 'no user found',
      })
    }
    const match = await comparePassword(password, user.password)
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie('token', token).json(user)
        }
      )
    }
  } catch (error) {
    console.log(error)
  }
}
const getProfile = (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, process.env.JWT, {}, (err, user)=>{
      if(err) throw err;
      res.json(user)
    })
  }else{
    res.json(null )
  }
}
module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
}
