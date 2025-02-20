import React, { useContext, useEffect } from 'react'
import { ContextData } from './CommonContext/Context';
import { useNavigate } from 'react-router-dom';

export default function PlayQuiz() {

    const { isLogin } = useContext(ContextData);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isLogin){
            navigate('/login');
        }
    },[])

    return (
        <>
            <div className='w-[1320px] mx-auto'>
                <section class="bg-white dark:bg-gray-900">
                    <div class="py-8 px-4 mx-auto lg:py-16">
                        <h2 class="mb-12 text-xl font-bold text-gray-900 dark:text-white text-center">Play Quiz</h2>
                    </div>
                </section>
            </div>
        </>
    )
}
