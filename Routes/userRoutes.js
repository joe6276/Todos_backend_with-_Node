const { Router} = require('express')
const { signupUser, loginUser, homepage } = require('../controllers/userController')
const { verifyToken } = require('../Middleware/verifyToken')

const userRoutes= Router()

userRoutes.post('/signup', signupUser)
userRoutes.post('/login', loginUser)
userRoutes.get('/home',verifyToken, homepage)


module.exports={
    userRoutes
}