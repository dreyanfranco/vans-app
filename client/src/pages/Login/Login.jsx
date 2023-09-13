import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import authService from '../../services/auth.service'
import './styles.css'


const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    const { authenticateUser, user } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await authService.login(loginData);
            localStorage.setItem('authToken', data.authToken);
            authenticateUser();
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='login-container'>
            <h1>Sign in to your account</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    name='username'
                    onChange={handleInputChange}
                    placeholder='Username'
                    value={loginData.username}
                />
                <input
                    type="password"
                    name='password'
                    onChange={handleInputChange}
                    placeholder='Password'
                    value={loginData.password}
                />
                <button>Log in</button>
                <p>Don't have an account? <Link to={'register'}>Register</Link> </p>
            </form>
        </div>
    )
}

export default Login