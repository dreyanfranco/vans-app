import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../services/auth.service'

const Register = () => {
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleInputChange = event => {
        const { value, name } = event.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await signup(signupData)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='login-container'>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit} className='login-form'>
                <input
                    type='text'
                    name='username'
                    onChange={handleInputChange}
                    placeholder='Username'
                    value={signupData.username}
                />
                <input
                    type='email'
                    name='email'
                    onChange={handleInputChange}
                    placeholder='Email'
                    value={signupData.email}
                />
                <input
                    type='password'
                    name='password'
                    onChange={handleInputChange}
                    placeholder='Password'
                    value={signupData.password}
                />
                <button>Signup</button>
                <p>Already have an account? <Link to={'/login'}>Log in</Link> </p>
            </form>
        </div>
    )
}

export default Register