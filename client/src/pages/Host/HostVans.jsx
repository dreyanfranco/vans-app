import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../context/auth.context';
import { getVans } from '../../services/vans.service';
// import { getVansFromHost } from '../../services/vans.service';

const HostVans = () => {
    const [vanData, setVanData] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            getVans()
                .then(({ data }) => {
                    const hostVans = data.filter(van => van.owner === user._id)
                    setVanData(hostVans)
                })
                .catch(error => console.log('Error fetching host vans', error))
        }
    }, [user])

    return (
        <div>
            <h2>Vans owned by host id:{user._id}</h2>
            <ul>
                {vanData.map((van) => {
                    <li key={van._id}>
                        <h3>{van.name}</h3>
                        <p>{van.description}</p>
                        <img src={van.imageUrl} alt={van.name} />
                    </li>
                })}
            </ul>
        </div>
    )
}

export default HostVans