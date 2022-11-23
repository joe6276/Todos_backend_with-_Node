 const {v4} = require('uuid')
 
 const {exec,query}= require('../DatabaseHelpers/dbhelper')
const getTodos = async(req,res)=>{
    try {
    const todos = await (await exec('getTodos')).recordset
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
       const todo = await(await exec('getTodo', {id})).recordset 
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
        await exec('insertTodo',{id,title,description,date})
        res.status(201).json({message:'Todo Inserted'})
    } catch (error) {
         res.status(404).json({error:error.message})
    }
}


const updateTodo = async(req,res)=>{
    try {
        const {id}=req.params
        const {title,description, date} =req.body
        const todo = await(await exec('getTodo', {id})).recordset 
        if(todo.length){
         await exec('updateTodo',{id,title,description,date})
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
        const todo = await(await exec('getTodo', {id})).recordset 

        if(todo.length){
            query(`DELETE FROM TodosTable WHERE id ='${id}'`)
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