import React, {createContext, useEffect, useState} from 'react'


export const myContext = createContext(0);

function AuthContextProvider ({children}) {

    const [token, setToken] = useState(null);


    useEffect(() => {
        let value = localStorage.getItem("tkn");
        if ( value != null) {
            setToken(value)
        }
    } , [])

    return( <myContext.Provider value={{token:token , setToken}}>
        {children}
    </myContext.Provider>
    )
}

export default AuthContextProvider;