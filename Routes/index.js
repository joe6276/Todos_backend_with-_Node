const {Router} = require('express')
const { getTodos, getTodo, insertTodo, updateTodo, deleteTodo } = require('../controllers')

const router= Router()

router.get('/', getTodos)
router.get('/:id',getTodo)
router.post('',insertTodo)
router.put('/:id', updateTodo)
router.delete('/:id',deleteTodo)


module.exports={router}