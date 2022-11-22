const {Router} = require('express')
const { getTodos, getTodo, insertTodo, updateTodo, deleteTodo } = require('../controllers/todoController')
const { verifyToken } = require('../Middleware/verifyToken')

const router= Router()

router.get('/',verifyToken, getTodos)
router.get('/:id',verifyToken, getTodo)
router.post('',verifyToken, insertTodo)
router.put('/:id',verifyToken,  updateTodo)
router.delete('/:id',verifyToken,deleteTodo)


module.exports={router}