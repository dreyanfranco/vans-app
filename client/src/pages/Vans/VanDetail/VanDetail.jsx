import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getOneVan } from '../../../services/vans.service';
import './styles.css';

const VanDetail = () => {
    const [vanData, setVanData] = useState();
    const { van_id } = useParams();
    const location = useLocation()

    useEffect(() => {
        getOneVan(van_id)
            .then(({ data }) => setVanData(data))
            .catch(error => console.log(error))
    }, [van_id])

    const search = location.state?.search || ''
    const type = location.state?.type || 'all'

    return (
        <div className='van-detail-container'>
            <Link to={`..${search}`} relative='path' className='back-button'>
                &larr; <span>Back to {type} vans</span>
            </Link>
            {vanData ? (
                <div className='van-detail'>

                    <img src={vanData.imageUrl} />
                    <i className={`van-type ${vanData.type} selected`}>{vanData.type}</i>
                    <h2>{vanData.name}</h2>
                    <p className='van-price'><span>${vanData.price}</span>/day</p>
                    <p>{vanData.descroption}</p>
                    <button className='link-button'>Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}

export default VanDetail