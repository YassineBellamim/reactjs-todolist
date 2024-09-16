import { useState, useEffect } from "react"
import TodoInput from "./components/todoinput"
import TodoList from "./components/todolist"

function App() {
  const [todos , setTodos] = useState([])
  const [TodoValue, setTodoValue] = useState('')

  function presistData(newList){
    localStorage.setItem('todos',JSON.stringify({ todos: newList}))

  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos,newTodo]
    presistData(newTodoList)
    setTodos(newTodoList)
  }
  function handleDeletTodo(index){
    const newTodoList = todos.filter((todo , todoIndex) =>{
      return todoIndex !== index 
    })
    presistData(newTodoList)
    setTodos(newTodoList)
  }
  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeletTodo(index)
  }

  useEffect(()=> {
    if (!localStorage) {
      return
    }
    let localTodos =localStorage.getItem('todos')
    if (!localTodos){
      return 
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  },[])
  return (
    <>
      <TodoInput TodoValue={TodoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList handleDeletTodo={handleDeletTodo} handleEditTodo={handleEditTodo} todos={todos} />
    </> 
  )
}

export default App