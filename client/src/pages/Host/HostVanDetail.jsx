import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const HostVanDetail = () => {
    const [currentVan, setCurrentVan] = useState(null)
    const { van_id } = useParams()

    useEffect(() => {
        first

        return () => {
            second
        }
    }, [third])



    return (
        <div>HostVanDetail</div>
    )
}

export default HostVanDetail