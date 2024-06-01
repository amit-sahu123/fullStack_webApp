import React from 'react'
import axios from 'axios';
import PropertyDetailsComponent from '../Components/PropertyDetailsComponent';
import { useParams } from 'react-router-dom';

function PropertydetailPage() {
    const { id } = useParams();
  const handleUpdateProperty = (propertyId, updatedData ) => {
    axios.put(`${import.meta.env.VITE_BASE_URL}/api/properties/${propertyId}`, updatedData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => {
       setFilteredProperties(filteredProperties.map(property => 
            property._id === propertyId ? res.data : property
        ));
        setSelectedProperty(null);
    })
    .catch(err => {
        console.error('Error updating property:', err);
    });
};
  return (
    <div>
        <PropertyDetailsComponent handleUpdateProperty={handleUpdateProperty}/>
    </div>
  )
}

export default PropertydetailPage;


