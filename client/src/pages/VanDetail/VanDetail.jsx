import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVanById } from '../../services/vans.service';
import './styles.css';

const VanDetail = () => {
    const [vanData, setVanData] = useState();
    const { van_id } = useParams();

    useEffect(() => {
        getVanById(van_id)
            .then(({ data }) => setVanData(data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='van-detail-container'>
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