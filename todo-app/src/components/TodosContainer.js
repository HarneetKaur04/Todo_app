import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form } from 'react-router-dom'

const TodosContainer = () => {
    const [todos, setTodos] = useState([])
    const [inputValue, setInputValue] = useState("")

    function handleChange(e) {
        setInputValue(e.target.value)
    }

    function getTodos() {
        axios.get('/api/v1/todos')
        .then(response => {
            setTodos(response.data)
        })
        .catch(error => console.log(error))
      }
    
      function createTodo (e){
        if (e.key === 'Enter' && !(e.target.value === '')){
            axios.post('/api/v1/todos', {todo: {title: e.target.value}})
            .then(response => {
                setTodos([response.data, ...todos])
                setInputValue("")
            })
            .catch(error => console.log(error))
        }
      }


      function deleteTodo(id) {
        axios.delete(`/api/v1/todos/${id}`)
        .then(response => {
            const todoIndex = todos.findIndex(x => x.id === id)
            const remainingTodo = todos.splice(todoIndex, 1)
            setTodos([...todos])
        })
        .catch(error => console.log(error))
      }
      
      function updateTodo(e,id) {
        axios.put(`/api/v1/todos/${id}`, {todo: {done: e.target.checked}})
        .then(response => {
          console.log(response.data.done, "check")
        const todoIndex = todos.findIndex(x => x.id === id)
        const updated = {...todos[todoIndex].done = response.data.done}
        setTodos([...todos])
        })
        .catch(error => console.log(error.response))
      }
      const [clicked, setClicked] = useState(false)

      // function handleNewTaskGroup () {
      //   setClicked(true)
      // }

    useEffect(()=> {
        getTodos()
      }, [])


  return (
    <div>
	<div className="inputContainer">
    <form>
      <input className="taskInput" type="text" 
        placeholder="Add a task" maxLength="50"
          onKeyPress={createTodo} 
          value={inputValue} onChange={handleChange}
          />
      <div>
        {/* {clicked? <><input className="groupInput" type="text" 
        placeholder="Add a group name" maxLength="50" value={inputValue} onChange={handleChange}/> </> : <button onClick={handleNewTaskGroup}>Create a new task group</button>} */}
      
      <label className="label"> Assign a group from existing groups
        <select className="dropdown"> 
          <option value>None</option>
          <option value>Group 1</option>
        </select>
      </label>
      </div>
    </form >
	</div>  	    
	<div className="listWrapper">
	   <ul className="taskList">
       {todos.map((todo) => {
            return (
                <li className="task" todo={todo} key={todo.id}>
                <input className="taskCheckbox" type="checkbox" 
                 checked={todo.done} onChange={(e) => updateTodo(e, todo.id)}/>              
                <label className="taskLabel">{todo.title}</label>
                <span className="deleteTaskBtn" onClick={()=> deleteTodo(todo.id)}>x</span>
                  </li>    
            )
        })}
	   </ul>
	</div>
      </div>  
  )
}

export default TodosContainer