 const mssql = require('mssql')
 const {v4} = require('uuid')
 const sqlConfig= require('../Config/index')
const getTodos = async(req,res)=>{
    try {
    const pool = await mssql.connect(sqlConfig)
    const response  =await pool.request().execute('getTodos')
    const todos = await response.recordset
    if(todos.length){
        return res.status(200).json (todos)
    }else{
        res.status(404).json({message:'No Todos Found'})
    }
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

const getTodo = async(req,res)=>{
    try {
        const{id}=req.params
        const pool = await mssql.connect(sqlConfig)
        const todo= await(await pool.request()
        .input('id',mssql.VarChar , id)
        .execute('getTodo')).recordset
        
        if(todo.length){
            res.status(200).json(todo)
        }else{
           res.status(404).json({message: `Todo with id ${id} does not exist`}) 
        }

    } catch (error) {
         res.status(404).json({error:error.message})
    }
}

const insertTodo = async(req,res)=>{
    try {
        const id=v4()
        const {title,description, date} =req.body
        const pool = await mssql.connect(sqlConfig)
        await pool.request()
        .input('id',mssql.VarChar , id)
        .input('title',mssql.VarChar , title)
        .input('description',mssql.VarChar , description)
        .input('date',mssql.VarChar , date)
        .execute('insertTodo')

        res.status(201).json({message:'Todo Inserted'})
    } catch (error) {
         res.status(404).json({error:error.message})
    }
}


const updateTodo = async(req,res)=>{
    try {
        const {id}=req.params
        const {title,description, date} =req.body

        const pool = await mssql.connect(sqlConfig)
        const todo= await(await pool.request()
        .input('id',mssql.VarChar , id)
        .execute('getTodo')).recordset
        if(todo.length){
          await pool.request()
        .input('id',mssql.VarChar , id)
        .input('title',mssql.VarChar , title)
        .input('description',mssql.VarChar , description)
        .input('date',mssql.VarChar , date)
        .execute('updateTodo')
        res.status(200).json({message:'Todo Updated!!'})
        }else{
            res.status(404).json({message: `Todo with id ${id} does not exist`}) 
        }
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

const deleteTodo = async(req,res)=>{
    try {
        const {id}=req.params
        const pool = await mssql.connect(sqlConfig)
        const todo= await(await pool.request()
        .input('id',mssql.VarChar , id)
        .execute('getTodo')).recordset

        if(todo.length){
            await pool.request()
            .query(`DELETE FROM TodosTable WHERE id ='${id}'`)
            res.status(200).json({message:'Todo Deleted!!'})
        }else{
             res.status(404).json({message: `Todo with id ${id} does not exist`}) 
        }
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

module.exports={
    getTodo,
    getTodos,
    insertTodo,
    updateTodo,
    deleteTodo
}