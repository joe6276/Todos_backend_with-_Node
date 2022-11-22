const express = require('express')
const {router} =require('./Routes/todoRoutes')
const dotenv = require('dotenv')
const { userRoutes } = require('./Routes/userRoutes')

const app =express()
dotenv.config()
app.use(express.json())
app.use('/todos', router)
app.use('/user', userRoutes)


app.listen(process.env.PORT|| 4000,()=>{
    console.log(`Server is Running on Port : ${process.env.PORT}`);
})