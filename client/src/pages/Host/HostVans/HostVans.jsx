import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';
import { getVans } from '../../../services/vans.service';
import './styles.css';

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
        <section>
            <h1 className="host-vans-title">
                Your listed vans
            </h1>
            <div className='host-vans-list'>
                {vanData.length > 0 ? (
                    <section>
                        {vanData.map(van => (
                            <Link
                                to={`/host/vans/${van._id}`}
                                key={van._id}
                                className='host-van-link-wrapper'>
                                <div className="host-van-single">
                                    <img src={van.imageUrl} />
                                    <div className='host-van-info'>
                                        <h3>{van.name}</h3>
                                        <p>${van.price}<span>/day</span></p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </section>
                ) : (
                    <h2>Loading...</h2>
                )
                }
            </div>
        </section>
    )
}

export default HostVans