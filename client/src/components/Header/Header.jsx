import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import avatar from '../../assets/avatar-icon.png';
import { AuthContext } from '../../context/auth.context';

const Header = () => {
    const { user, logout } = useContext(AuthContext)

    return (
        <header>
            <Link className="site-logo" to='/'>#VanLife</Link>
            <nav>
                <NavLink to='/host' className={({ isActive }) => isActive ? "active-link" : null}>Host</NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? "active-link" : null}>About</NavLink>
                <NavLink to='/vans' className={({ isActive }) => isActive ? "active-link" : null}>Vans</NavLink>
                {user ? (
                    <div>
                        <Link to='/host' className="login-link">
                            <img src={avatar} className='login-icon' alt="User Avatar" />
                            <span>{user.username}</span>
                        </Link>
                        <button className='link-button' onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <Link to='/login' className="login-link">
                        <img src={avatar} className='login-icon' alt="Login" />
                    </Link>
                )}
            </nav>
        </header>
    )
}

export default Header