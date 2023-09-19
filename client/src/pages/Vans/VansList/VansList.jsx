import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getVans } from '../../../services/vans.service';
import './styles.css';

const VansList = () => {
  const [vanData, setVanData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const typeFilter = searchParams.get('type')

  const displayedVans = typeFilter ? vanData.filter(van => van.type === typeFilter) : vanData

  useEffect(() => {
    getVans()
      .then(({ data }) => {
        setVanData(data)
      })
      .catch(error => {
        console.log(error)
      })

  }, [])


  function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <div className='van-list-filter-buttons'>
        <button
          onClick={() => handleFilterChange('type', 'simple')}
          className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>Simple</button>
        <button
          onClick={() => handleFilterChange('type', 'luxury')}
          className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}>Luxury</button>
        <button
          onClick={() => handleFilterChange('type', 'rugged')}
          className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}>Rugged</button>
        {typeFilter ? (
          <button
            onClick={() => handleFilterChange('type', null)}
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