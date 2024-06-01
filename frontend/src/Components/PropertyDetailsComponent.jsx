import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import PropertyFormComponent from '../common/PropertyFormComponent';
import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PropertyFormComponent from '../common/PropertyFormComponent';

const PropertyDetailsComponent = ({ handleUpdateProperty }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty((prevProperty) => ({
            ...prevProperty,
            [name]: value,
        }));
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [onEditClick, setOnEditClick] = useState(false);
    const [user, setUser] = useState({});
    const router = useNavigate();
    const { id } = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdateProperty(property._id, property);
        setOnEditClick(false);
        fetchProperty();
    };
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(JSON.parse(userInfo));
    }, [id])

    useEffect(() => {
        if (!user) {
            router('/login');  
            return;
        }

        const fetchProperty = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/properties/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProperty(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching property');
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [user]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", width: '95%', padding: "20px 50px" }}>
                <h3>Property Id: {property._id}</h3>
                {property.userId == user?._id &&
                    <Button variant='outlined' onClick={() => setOnEditClick(true)}>Edit</Button>
                }
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: "400px", boxShadow: "1px 1px 2px 1px orange", borderRadius: "20px", color: 'green', padding: '30px', margin: 'auto', zIndex: '1' }}>
                <h1> Area :{property?.area}</h1>
                <h1> Area :{property?.area}</h1>
                <h1>Price: {property?.price}</h1>
            </Box>
            {onEditClick &&
                (<div style={{ width: '100%', alignItems: 'center', display: "flex", justifyContent: 'center' }}>
                    <PropertyFormComponent
                        property={property}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        btxText="Update"
                        handeClosePopup={() => setOnEditClick(false)}
                    />
                </div>)
            }
        </div>
    );
};

export default PropertyDetailsComponent;
