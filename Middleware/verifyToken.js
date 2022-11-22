const jwt=require('jsonwebtoken')
const dotenv= require('dotenv')

dotenv.config()

const verifyToken= async(req,res,next)=>{
    try {
        
        const token = req.headers['token']
        if(!token){
           return  res.status(401).json({message:"You don't have access , please provide a token"})
        }

        const decodedData= jwt.verify(token, process.env.SECRET)
        req.info=decodedData

    } catch (error) {
          return  res.status(401).json({message:error.message})
    }

    next()
}

module.exports={
    verifyToken
}