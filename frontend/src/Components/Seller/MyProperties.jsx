import React, { useEffect, useState } from 'react';
// import SideDrawer from '../common/SideDrower';
import axios from 'axios';
import PropertyCard from '../../common/PropertyCard';
import { Link, useNavigate } from 'react-router-dom';

const MyPropertiesComponent = () => {
    const [user, setUser] = useState([]);
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
  const router = useNavigate();
    useEffect(() => {
        let userd = JSON.parse(localStorage.getItem("userInfo"));
        setUser(
            JSON.parse(userd)
        );
        if (!userd) {
            router.push('/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/properties`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setProperties(res.data.properties);
                const userProperties = filterPropertiesByUserId(res.data.properties, user._id);
                setFilteredProperties(userProperties);
                // setTotalPages(res.data.totalPages);
            })
            .catch(err => {
                console.error('Error fetching user properties:', err);
            });
    }, [user, router]);


    const filterPropertiesByUserId = (properties, userId) => {
        return properties.filter(property => property.userId === userId);
    };

    const handleDelete = async (e, propertyId) => {
        if (e.stopPropagation) e.stopPropagation();
        const token = localStorage.getItem('token');
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/properties/${propertyId}`, config);
            setProperties(properties?.filter((property) => property?._id !== propertyId));
        } catch (error) {
            console.log('error', error)
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: "20px", justifyContent: 'center', alignItems: 'center', }}>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", width: '95%', padding: "20px 50px" }}>
                <h1 style={{ fontSize: '30px' }}>My Properties</h1>
            </div>
            {filteredProperties.length > 0 ?
                <>
                    <ul style={{ display: 'flex', gap: "20px", flexWrap: 'wrap' }}>
                        {filteredProperties?.map((property, i) => (
                            // <Link to={`/property/${property._id}`}>
                                <PropertyCard property={property} i={i} isSelerPage={true} handleDelete={handleDelete} />
                            // </Link>
                        ))}
                    </ul>
                    {/* <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    /> */}
                </>
                :
                <div
                    style={{
                        height: "20vh",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid',
                        padding: '30px',
                        gap: '20px',
                        borderRadius: ' 20px'
                    }}>
                    <h1>No Properties Listed Yet !</h1>
                    <Link href='sell-property'>
                        <button variant='outlined'> Add Your Property</button>
                    </Link>
                </div>
            }

            {/* <SideDrawer
                open={isFilterOpen}
                title={'Filter properties'}
                subtitle="See the data in an organized manner by applying filters"
                apply="Apply"
                submit={handleFilter}
                cancel="Clear all"
                closeDrawer={handleFilterOpen}
            >
                <PropertyFilter onFilter={handleFilter} />
            </SideDrawer> */}
        </div>
    );
};

export default MyPropertiesComponent;
