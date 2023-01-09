import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form } from 'react-router-dom'

const TodosContainer = () => {
    const [todos, setTodos] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [inputValueGroup, setInputValueGroup] = useState("")
    const [groups, setGroups] = useState([])
    const [groupId, setGroupId] = useState("")

    function handleChange(e) {
        setInputValue(e.target.value)
    }

    function handleGroupChange(e) {
      setInputValueGroup(e.target.value)
  }

      function getGroups() {
        axios.get('/api/v1/groups')
        .then(response => {
          setGroups(response.data)
        })
        .catch(error => console.log(error))
      }

      function createGroup (e){
        if (e.key === 'Enter' && !(e.target.value === '')){
            axios.post('/api/v1/groups', {group: {title: e.target.value}})
            .then(response => {
                setGroups([response.data, ...groups])
                setInputValueGroup("")
            })
            .catch(error => console.log(error))
        }
      }

      function getTodos() {
        axios.get('/api/v1/todos')
        .then(response => {
            setTodos(response.data)
        })
        .catch(error => console.log(error))
      }
    
      function handleNewTask (){
        console.log(groupId,inputValue, "check new task")
        if (!(inputValue === '')){
            axios.post(`/api/v1/todos`, {lala: {group_id: groupId, title: inputValue} })
            .then(response => {
                setTodos([response.data, ...todos])
                setInputValue("")
                console.log(response, "this is response of Post")
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
        axios.put(`/api/v1/todos/${id}`, {lala: {done: e.target.checked}})
        .then(response => {
          console.log(response.data.done, "check")
        const todoIndex = todos.findIndex(x => x.id === id)
        const updated = {...todos[todoIndex].done = response.data.done}
        setTodos([...todos])
        })
        .catch(error => console.log(error.response))
      }

      const [clicked, setClicked] = useState(false)

      function handleNewTaskGroup () {
        setClicked(true)
      }

      function handleGroupSelection (id) {
        setGroupId(id)
      }

    useEffect(()=> {
      getGroups()
      getTodos()
      }, [])

  return (
    <div>
	<div className="inputContainer">
      <input className="taskInput" type="text" 
        placeholder="Add a task" maxLength="50"
          value={inputValue} onChange={handleChange} 
          />
      <div>
        {clicked? <><input className="groupInput" type="text" 
        placeholder="Add a group name" maxLength="50" value={inputValueGroup} onChange={handleGroupChange} onKeyPress={createGroup} /> </> : <button onClick={handleNewTaskGroup}>Create a new task group</button>}
      
      <label className="label"> Assign a group from existing groups
      <select onChange={(e) => handleGroupSelection(e.target.value)}>
        <option >Default Unassigned</option>
      {groups.map((group) => {
        return (
          <option value={group.id} >{group.title}</option>
            )
        })}
      </select>
      </label>
      </div>
      <button onClick={handleNewTask}>Submit a new Task</button>
	</div>  	    
	<div className="listWrapper">
	   <ul className="taskList">
       {groups.map((group) => {
            return (
                <li className="task" group={group} key={group.id}>
                <label className="taskLabel">{group.title}</label>
                <div className="listWrapper">
	   <ul className="taskList">
       {todos.map((todo) => {
            return (
              todo.group_id == group.id ? <>
                <li className="task" todo={todo} key={todo.id}>
                <input className="taskCheckbox" type="checkbox" 
                 checked={todo.done} onChange={(e) => updateTodo(e, todo.id)}/>              
                <label className="taskLabel">{todo.title}</label>
                <span className="deleteTaskBtn" onClick={()=> deleteTodo(todo.id)}>x</span>
                  </li>    
                  </>: null
            )
        })}
	   </ul>
	</div>
                  </li>    
            )
        })}
	   </ul>
	</div>


      </div>  
  )
}

export default TodosContainer