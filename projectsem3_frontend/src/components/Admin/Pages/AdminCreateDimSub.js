import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateDimQltySub = () => {
    const [newDimQltySub, setNewDimQltySub] = useState({
        dimSubType_ID: '', // Tạm thời để trống, có thể để người dùng nhập hoặc tự động tạo
        dimQlty: '',
        visible: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDimQltySub(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7241/api/DimQltySubMst', newDimQltySub);
            console.log('New DimQltySub created:', response.data);
            // Redirect back to AdminDimSub after successful creation
            window.location.href = '/dimQltySub';
        } catch (error) {
            console.error('Error creating DimQltySub:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Create New DimQltySub</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='dimQlty' className='form-label'>DimQlty</label>
                    <input type='text' className='form-control' id='dimQlty' name='dimQlty' value={newDimQltySub.dimQlty} onChange={handleChange} required />
                </div>
                <button type='submit' className='btn btn-primary'>Create DimQltySub</button>
            </form>
        </div>
    );
};

export default CreateDimQltySub;
