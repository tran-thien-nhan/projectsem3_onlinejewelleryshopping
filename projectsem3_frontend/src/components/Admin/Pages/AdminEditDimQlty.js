import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminEditDimQlty = () => {
    const { id } = useParams();
    const [dimQlty, setDimQlty] = useState({
        dimQlty_ID: '',
        dimQlty: '',
        visible: true
    });

    useEffect(() => {
        const fetchDimQlty = async () => {
            try {
                const response = await axios.get(`https://localhost:7241/api/DimQltyMst/getonedimqlty/${id}`);
                const fetchedDimQlty = response.data.data;
                if (fetchedDimQlty) {
                    setDimQlty(fetchedDimQlty);
                }
            } catch (error) {
                console.error('Error fetching DimQlty:', error);
            }
        };
    
        fetchDimQlty();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDimQlty(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7241/api/DimQltyMst/${id}`, dimQlty);
            window.location.href = '/dimQlty';
        } catch (error) {
            console.error('Error updating DimQlty:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Chỉnh sửa DimQlty</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='dimQlty' className='form-label'>DimQlty</label>
                    <input type='text' className='form-control' id='dimQlty' name='DimQlty' value={dimQlty.dimQlty || ''} onChange={handleChange} required />
                </div>
                <button type='submit' className='btn btn-primary'>Cập nhật DimQlty</button>
            </form>
        </div>
    );
};

export default AdminEditDimQlty;
