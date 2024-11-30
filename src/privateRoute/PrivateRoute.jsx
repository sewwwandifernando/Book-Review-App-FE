import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'
import { Spinner } from "flowbite-react";

const PrivateRoute = ({children}) => {
    const { user, loading} = useContext(AuthContext)
    const location = useLocation();

    if(loading) {
        return <div className="text-center">
                    <Spinner aria-label="Center-aligned spinner example" />
                </div>
    } 

    if(user?.roleId == 1) {
        console.log(user)
        return children;
    } 
    
    if(user?.roleId == 2) {
       return(
        <Navigate to="/fobbidden" state={{from: location}} replace ></Navigate>
       )
    }

    return (
        <Navigate to="/login" state={{from: location}} replace></Navigate>
    )
}

export default PrivateRoute