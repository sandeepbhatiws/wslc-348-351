import React, { createContext, useState } from 'react'

const ContextData = createContext();

export default function Context({ children }) {

    const [isLogin, setIsLogin] = useState(false);

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