import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../context/auth.context';
import { getVans } from '../../../services/vans.service';
import './styles.css';


const VansList = () => {
  const [vanData, setVanData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useContext(AuthContext)

  const typeFilter = searchParams.get('type')

  const displayedVans = typeFilter ? vanData.filter(van => van.type === typeFilter) : vanData

  useEffect(() => {
    setLoading(true)
    getVans()
      .then(({ data }) => {
        setVanData(data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })

  }, [user])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div className='van-list-filter-buttons'>
        <button
          onClick={() => setSearchParams({ type: 'simple' })}
          className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>Simple</button>
        <button
          onClick={() => setSearchParams({ type: 'luxury' })}
          className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}>Luxury</button>
        <button
          onClick={() => setSearchParams({ type: 'rugged' })}
          className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}>Rugged</button>
        {typeFilter ? (
          <button
            onClick={() => setSearchParams({})}
            className='van-type clear-filters'>Clear</button>
        ) : null}
      </div>
      <div className='van-list'>
        {displayedVans.length > 0 && displayedVans.map(van => (
          <div key={van._id} className='van-tile'>
            <Link
              to={van._id}
              state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
            >
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

export default VansList