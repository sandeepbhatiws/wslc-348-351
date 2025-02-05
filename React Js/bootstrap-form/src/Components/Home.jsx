import React, { useState } from 'react'
import UserForm from './UserForm'
import UserTable from './UserTable'
import { ToastContainer } from 'react-toastify';

export default function Home() {

    const [allUserData, setAllUserData] = useState([]);

    return (
        <>
            <ToastContainer/>
            <div className='container-fluid p-5'>
                <div className='container'>
                    <div className='row text-center mb-4'>
                        <h1>User Form</h1>
                    </div>
                    <div className='row justify-content-center '>
                        <div className='col-6 border p-4 rounded-3'>
                            <UserForm allUserData={allUserData} setAllUserData={setAllUserData}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container-fluid pb-5'>
                <div className='container'>
                    <div className='row text-center mb-4'>
                        <h1>User Data</h1>
                    </div>
                    <div className='row justify-content-center '>
                        <div className='col-12 p-4 rounded-3'>
                            <UserTable allUserData={allUserData} setAllUserData={setAllUserData}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
