import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminEditDimSub = () => {
    const { id } = useParams(); 
    const [dimQltySub, setDimQltySub] = useState({
        dimSubType_ID: '',
        dimQlty: '',
        visible: true
    });

    useEffect(() => {
        const fetchDimQltySub = async () => {
            try {
                const response = await axios.get(`https://localhost:7241/api/DimQltySubMst/${id}`);
                setDimQltySub(response.data.data); 
            } catch (error) {
                console.error('Error fetching dimQltySub:', error);
            }
        };

        fetchDimQltySub();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDimQltySub(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7241/api/DimQltySubMst/${id}`, dimQltySub); // Sửa thành phương thức PUT
            window.location.href = '/dimQltySub'; 
        } catch (error) {
            console.error('Error updating dimQltySub:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Edit DimQltySub</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='dimQlty' className='form-label'>DimQlty</label>
                    <input type='text' className='form-control' id='dimQlty' name='dimQlty' value={dimQltySub.dimQlty} onChange={handleChange} required />
                </div>
                <button type='submit' className='btn btn-primary'>Update DimQltySub</button>
            </form>
        </div>
    );
};

export default AdminEditDimSub;
