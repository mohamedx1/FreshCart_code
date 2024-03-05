import React from 'react'
import {Navigate} from "react-router-dom";



function ProtectedRouts ({children}) {

    if (localStorage.getItem("tkn") != null) {
        return (<>
            {children}
        </>
        )
    }
    
    return <>
        <Navigate to={"/login"} />
    </>



}

export default ProtectedRouts