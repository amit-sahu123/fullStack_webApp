import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { Box, Button, TextField } from '@mui/material';
import PropertyFormComponent from '../common/PropertyFormComponent.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyForm = () => {
  const router = useNavigate();
  const onSubmit = async (property) => {
    const token = localStorage.getItem('token'); // Assuming you have saved the token in localStorage
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/properties`, property, config);
        router('/my-properties'); // Redirect to my properties page after adding
    } catch (error) {
        console.error('Error adding property:', error.response ? error.response.data : error.message);
    }
};

    const [property, setProperty] = useState({
        place: '',
        area: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        nearbyHospitals: '',
        nearbyColleges: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty((prevProperty) => ({
            ...prevProperty,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(property);
    };

    return (
        <div style={{ minHeight: '70vh', alignItems: 'center', display: "flex", justifyContent: 'center', flexDirection:'column' }}>
           <PropertyFormComponent
           property={property}
           handleSubmit={handleSubmit}
           handleChange={handleChange}
           btxText="Submit"
           />
        </div>
    );
};

export default PropertyForm;
