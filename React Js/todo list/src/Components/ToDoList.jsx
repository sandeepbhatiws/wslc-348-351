import React from 'react'

export default function ToDoList({data, index, toDoListData, setToDoListData}) {

    const deleteToDo = (id) => {
        if(confirm('Are you sure you want to delete ?')){
            toDoListData.splice(id,1);
            setToDoListData([...toDoListData]);
            console.log(toDoListData);
        }
        
    }
  return (
    <>
        <li class='todo-item'>
            <span class='task-text'>{ data.task_title } </span>
            <button class='delete-button' onClick={ () => deleteToDo(index) }>Delete</button>
        </li>
    </>
  )
}
