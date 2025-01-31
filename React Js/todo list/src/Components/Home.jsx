import React, { useState } from 'react'
import Form from './Form'
import ToDoList from './ToDoList'

export default function Home() {

    const [toDoListData, setToDoListData] = useState([]);

    return (
        <>
            <div class='container'>
                <header class='header'>
                    <h1>Todo List</h1>
                </header>

                <Form toDoListData={toDoListData} setToDoListData={setToDoListData}/>

                <section class='todo-list-section'>
                    <ul id='todo-list'>
                        {
                            toDoListData.map((v,i) => {
                                return (
                                    <ToDoList toDoListData={toDoListData} setToDoListData={setToDoListData} data={v} index={i} key={i}/>
                                )
                            })
                        }
                        
                    </ul>
                </section>
            </div>
        </>
    )
}
