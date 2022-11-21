const express = require('express')
const {router} =require('./Routes')
const dotenv = require('dotenv')

const app =express()
dotenv.config()
app.use(express.json())
app.use('/todos', router)


app.listen(process.env.PORT|| 4000,()=>{
    console.log(`Server is Running on Port : ${process.env.PORT}`);
})