import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { getVans } from '../../services/vans.service';
import './styles.css';


const Vans = () => {
  const [vanData, setVanData] = useState([]);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getVans()
      .then(({ data }) => {
        const userVans = data.filter(van => van.owner === user._id)
        setVanData(userVans)
      })
      .catch(error => console.log(error))
  }, [user])

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div className='van-list'>
        {vanData.map(van => (
          <div key={van._id} className='van-tile'>
            <Link to={`/vans/${van._id}`}>
              <img src={van.imageUrl} />
              <div className='van-info'>
                <h3>{van.name}</h3>
                <p>${van.price}<span>/day</span></p>
              </div>
              <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vans