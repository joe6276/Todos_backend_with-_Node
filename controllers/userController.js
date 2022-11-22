const  bcrypt = require('bcrypt')
const  mssql =require('mssql')
const  config = require('../Config/index')
const jwt= require('jsonwebtoken')
const dotenv =require('dotenv')

dotenv.config()

 const signupUser= async(req,res)=>{
    try {
        const pool = await mssql.connect(config)
        const {username, email, password}= req.body
        const hashedpassword =await bcrypt.hash(password,8)
        await pool.request()
        .input('email', email)
        .input('username', username)
        .input('password', hashedpassword)
        .execute('addUser')
        return res.status(201).json({message:'User Added Successfully'})
        
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}


 const loginUser= async(req,res)=>{
    try {
        const {email,password}= req.body;
        const pool = await mssql.connect(config)
        const user =await (await pool.request().input('email', email).execute('getUser')).recordset[0]
        if(user){
            // check password
        const checkPassword= await bcrypt.compare(password, user.password)
          if(checkPassword){
            const {password, id ,...payload}=user
            const token = jwt.sign(payload,process.env.SECRET, {expiresIn:'120s'})
            return res.status(200).json({message:'Logged in !!',token})
          }else{
           return res.status(400).json({message:"User Not Found"})
          }
        }else{
            return res.status(400).json({message:"User Not Found"})
        }
        
    } catch (error) {
         return res.status(400).json({message:error.message})
    }
}



const homepage=async(req,res)=>{
   try {
     const {username}= req.info
    res.json(`Welcome to The System ${username}`)
   } catch (error) {
    return res.status(400).json({message:error.message})
   }
}
module.exports={
    signupUser,
    loginUser,
    homepage
}