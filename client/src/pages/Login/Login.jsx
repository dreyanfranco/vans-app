import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import authService from '../../services/auth.service'
import './styles.css'


const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const [messageVisible, setMessageVisible] = useState(true)
    const { authenticateUser } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()

    const message = location.state && location.state.message

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessageVisible(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

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
            {messageVisible && message && <p style={{ color: 'red' }}>{message}</p>}
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
                <p>Don't have an account? <Link className='link-button' to={'/signup'}>Signup</Link> </p>
            </form>
        </div>
    )
}

export default Login