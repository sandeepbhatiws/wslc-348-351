import React from 'react'

export default function Form({ toDoListData, setToDoListData }) {

    const formHandler = (event) => {
        event.preventDefault();

        var data = {
            task_title : event.target.task.value
        }

        var finalData = [data, ...toDoListData];
        setToDoListData(finalData);

        event.target.reset();

    }

    return (
        <>
            <form onSubmit={ formHandler } autoComplete='off'>
                <section class='todo-input-section'>
                    <div class='todo-input-wrapper'>
                        <input type='text' name='task' id='todo-input' placeholder='What do you want to do?' />
                        <button type='submit' id='add-button'>Add</button>
                    </div>
                </section>
            </form>
        </>
    )
}
