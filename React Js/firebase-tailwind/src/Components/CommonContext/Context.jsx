import React, { createContext, useState } from 'react'

const ContextData = createContext();

export default function Context({ children }) {

    const getLoginUserInfo = JSON.parse(localStorage.getItem('loginUser'));    
    const [isLogin, setIsLogin] = useState((getLoginUserInfo ? true : false));

    const data = { isLogin, setIsLogin }

    return (
        <>
            <ContextData.Provider value={ data }>
                {children}
            </ContextData.Provider>
        </>
    )
}

export { ContextData };