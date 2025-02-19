import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import app from '../config/firebase';

export default function ViewQuiz() {

    const [getQuizes, setGetQuizes] = useState([]);


    useEffect(() => {
        const db = getDatabase(app);
        const starCountRef = ref(db, 'quizes/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();

            var getQuizData = [];
            for(var index in data){
                getQuizData.push(data[index]);
            }

            console.log(getQuizData)
            setGetQuizes([...getQuizData]);

            // 
            // updateStarCount(postElement, data);
        });
    },[]);


    

    return (
        <>
            <div className='w-[1320px] mx-auto'>
                <section class="bg-white dark:bg-gray-900">
                    <div class="py-8 px-4 mx-auto lg:py-16">
                        <h2 class="mb-12 text-xl font-bold text-gray-900 dark:text-white text-center">View Quiz</h2>

                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            S.No
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Question
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Option A
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Option B
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Option C
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Option D
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Correct Answer
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        (getQuizes.length > 0)
                                            ?
                                        getQuizes.map((v, i) => {
                                            return (
                                                <QuizData quiz={v} key={i}  index={i} />
                                            )
                                        })
                                        :
                                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <td class="px-6 py-4 text-center" colSpan={7}>
                                                No Record Found !!
                                            </td>
                                        </tr>
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}



function QuizData({ quiz, index }) {

    if(quiz.correct_answer == 1){
        quiz.correct_answer = quiz.option_1;
    } else if(quiz.correct_answer == 2){
        quiz.correct_answer = quiz.option_2;
    } else if(quiz.correct_answer == 3){
        quiz.correct_answer = quiz.option_3;
    } else if(quiz.correct_answer == 4){
        quiz.correct_answer = quiz.option_4;
    }

    return (
        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <td class="px-6 py-4">
                {index+1}
            </td>
            <td class="px-6 py-4">
                {quiz.question}
            </td>
            <td class="px-6 py-4">
            {quiz.option_1}
            </td>
            <td class="px-6 py-4">
            {quiz.option_2}
            </td>
            <td class="px-6 py-4">
            {quiz.option_3}
            </td>
            <td class="px-6 py-4">
            {quiz.option_4}
            </td>
            <td class="px-6 py-4">
            {quiz.correct_answer}
            </td>
        </tr>
    )
}