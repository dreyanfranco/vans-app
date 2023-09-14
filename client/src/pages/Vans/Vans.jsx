import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { getVans } from '../../services/vans.service';
import './styles.css';


const Vans = () => {
  const [vanData, setVanData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useContext(AuthContext)

  const typeFilter = searchParams.get('type')

  const displayedVans = typeFilter ? vanData.filter(van => van.type === typeFilter) : vanData

  useEffect(() => {
    getVans()
      .then(({ data }) => setVanData(data))
      .catch(error => console.log(error))
  }, [user])

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div className='van-list-filter-buttons'>
        <button onClick={() => setSearchParams({ type: 'simple' })} className='van-type simple'>Simple</button>
        <button onClick={() => setSearchParams({ type: 'luxury' })} className='van-type luxury'>Luxury</button>
        <button onClick={() => setSearchParams({ type: 'rugged' })} className='van-type rugged'>Rugged</button>
        <button onClick={() => setSearchParams({})} className='van-type clear-filters'>Clear</button>
      </div>
      <div className='van-list'>
        {displayedVans.length > 0 && displayedVans.map(van => (
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