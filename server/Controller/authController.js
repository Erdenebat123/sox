const User = require('../Model/user')
const { hashPassword, comparePassword } = require('../helpers/auth.js')
// const { use } = require('../Routes/authRoutes');

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

const loginUser =  async (req, res)=>{
  try{
    const {email, password} = reg.body
    const user = await User.findOne({email})
    if(!user){
      return res.json({
        error: "no user found"
      })
    }
    const match = await comparePassword(password, user.password)
    if(match){
      res.json(
        "passwords match"
      )
    }
  }catch(error){
    console.log(error)
  }
}
module.exports = {
  test,
  registerUser,
  loginUser
  
}
