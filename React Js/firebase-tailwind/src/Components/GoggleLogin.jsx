import React, { useContext,useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContextData } from './CommonContext/Context';
import { toast } from 'react-toastify';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function GoggleLogin() {
    const { isLogin, setIsLogin } = useContext(ContextData);
    const [buttonLoading, setButtonLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(isLogin){
            navigate('/play-quiz');
        }
    },[isLogin])

    const loginWithGoogle = () => {
        setButtonLoading(true)

        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);

                setIsLogin(true);
                localStorage.setItem('loginUser', JSON.stringify(user))
                toast.success('User Login succussfully.')
                navigate('/play-quiz');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                setButtonLoading(false);
                toast.error(errorMessage);
            });
    }

    return (
        <div class="flex justify-center" onClick={loginWithGoogle}>
            <button type="button" class="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={buttonLoading ? 'disabled' : ''}>
                {buttonLoading ? 'Loading...' : 'Login with Google'}
            </button>
        </div>
    )
}
