import React from 'react'
import { getDatabase, ref, set } from "firebase/database";
import app from '../config/firebase';
import { toast } from 'react-toastify';

export default function AddQuiz() {

    const addQuiz = (event) => {
        event.preventDefault();

        const quizData = {
            question : event.target.question.value,
            option_1 : event.target.option_1.value,
            option_2 : event.target.option_2.value,
            option_3 : event.target.option_3.value,
            option_4 : event.target.option_4.value,
            correct_answer : event.target.correct_answer.value,
        }

        const db = getDatabase(app);
        set(ref(db, 'quizes/' + Date.now()), quizData);
        toast.success('Quiz Added Successfully.')

        event.target.reset();

        console.log(quizData);
    }
    return (
        <>
            <div className='w-[1320px] mx-auto'>
                <section class="bg-white dark:bg-gray-900">
                    <div class="py-8 px-4 mx-auto lg:py-16">
                        <h2 class="mb-12 text-xl font-bold text-gray-900 dark:text-white text-center">Add Quiz</h2>
                        <form onSubmit={ addQuiz } autoComplete='off'>
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div class="sm:col-span-2">
                                    <label for="question" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question</label>
                                    <input type="text" name="question" id="question" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Question" required=""/>
                                </div>
                                <div class="w-full">
                                    <label for="option_1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Option 1</label>
                                    <input type="text" name="option_1" id="option_1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Option 1" required=""/>
                                </div>
                                <div class="w-full">
                                    <label for="option_2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Option 2</label>
                                    <input type="text" name="option_2" id="option_2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Option 2" required=""/>
                                </div>
                                <div class="w-full">
                                    <label for="option_3" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Option 3</label>
                                    <input type="text" name="option_3" id="option_3" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Option 3" required=""/>
                                </div>
                                <div class="w-full">
                                    <label for="option_4" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Option 4</label>
                                    <input type="text" name="option_4" id="option_4" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Option 4" required=""/>
                                </div>
                                
                                
                                <div class="sm:col-span-2">
                                    <label for="correct_answer" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correct Answer</label>
                                    <select id="correct_answer" name='correct_answer' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected="">Select Correct Answer</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                        <option value="4">Option 4</option>
                                    </select>
                                </div>
                                
                            </div>
                            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-purple-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                Add Quiz
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    )
}
