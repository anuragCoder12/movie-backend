const Users = require('../models/users')
const jwt = require('jsonwebtoken')

//  creating json web tokens
const createToken = async (_id) => {
   return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d' })
}
// register user
const registerUser = async(req, res) => {
    try {
        const { userName, email, password, role } = req.body;
       const newUser = await Users.signUp(userName, email, password, role)
       const token = await createToken(newUser._id)
       console.log(newUser)
       res.status(200).json({
        success: true,
        message: " user registered successfully ",
        data: { userName, email, role, token }
       }) 
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// login an user
const loginUser = async(req, res) => {
   try {
    const { userName, password, email, role} = req.body;
       const logInUser = await Users.logIn(userName, password, email, role)
       const token = await createToken(logInUser._id)
       res.status(200).json({
        success: true,
        message: "logged in successfully",
        data: {
            userName,
            token,
            email, 
            role
        }
       })
   } catch (error) {
    res.status(400).json({error: error.message})
   }
}
module.exports = {
    registerUser,
    loginUser
}