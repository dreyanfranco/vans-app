import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>

            <div>Dashboard</div>
            <Link to={'/host/new-van'}>
                New van
            </Link>
        </>
    )
}

export default Dashboard