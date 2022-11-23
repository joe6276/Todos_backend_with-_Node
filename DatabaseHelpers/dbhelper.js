const mssql = require('mssql')
 const sqlConfig= require('../Config/index')
class Connection { 
    constructor(){
        this.connecttoDb()
    }
    // creating a connection pool
    connecttoDb= async()=>{
        try {
          this.pool = await mssql.connect(sqlConfig)  
        } catch (error) {
            throw new Error(error.message)
        }
    }

    createRequest=async(request, data={})=>{
        const keys = Object.keys(data)
        keys.map((keyName)=>{
         const keyValue=data[keyName]   
         request.input(keyName, keyValue)
        })
        return request
    }

    exec=async(storedproc, data={})=>{
      try {
        let request= await this.pool.request()  
      request= await this.createRequest(request,data)
      const result = await request.execute(storedproc)
      return result
      } catch (error) {
        throw new Error(error.message)
      }
    }
    query=async(query)=>{
       try {
         const result= await this.pool.request().query(query)
        return result
       } catch (error) {
        throw new Error(error.message)
       }
    }

}

module.exports={
    exec: new Connection().exec,
    query: new Connection().query
}