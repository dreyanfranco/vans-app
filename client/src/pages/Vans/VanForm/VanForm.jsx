import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveVan } from '../../../services/vans.service'

const VanForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
        type: ''
    })

    const navigate = useNavigate()

    const handleInputChange = event => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleForm = async (event) => {
        event.preventDefault()
        try {
            await saveVan(formData)
            navigate('/host')
        } catch (error) {

        }
    }

    return (
        <div className='login-container'>
            <h1>Your new van</h1>
            <form onSubmit={handleForm} className="login-form">
                <input
                    type="text"
                    name='name'
                    onChange={handleInputChange}
                    placeholder='Name of Van'
                    value={setFormData.username}
                />
                <input
                    type="number"
                    name='price'
                    onChange={handleInputChange}
                    placeholder='Price'
                    value={setFormData.password}
                />
                <input
                    type="text"
                    name='description'
                    onChange={handleInputChange}
                    placeholder='Description'
                    value={setFormData.password}
                />
                <input
                    type="url"
                    name='imageUrl'
                    onChange={handleInputChange}
                    placeholder='Add image url'
                    value={setFormData.password}
                />
                <input
                    type="text"
                    name='type'
                    onChange={handleInputChange}
                    placeholder='Type of van'
                    value={setFormData.password}
                />
                <button>🚌 Save van 🚌</button>
            </form>
        </div>
    )
}

export default VanForm