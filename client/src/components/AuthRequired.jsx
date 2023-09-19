import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

const AuthRequired = () => {
    const { user, loadUser } = useContext(AuthContext)

    // if (loadUser) {
    //     return <h1>Loading...</h1>
    // }

    if (!user) {
        return <Navigate to={'/login'} />
    }
    return (
        <Outlet />
    )
}

export default AuthRequired