import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateDimQlty = () => {
    const [newDimQlty, setNewDimQlty] = useState({
        dimQlty_ID: '',
        dimQlty: '',
        visible: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDimQlty(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7241/api/DimQltyMst', newDimQlty);
            console.log('New DimQlty created:', response.data);
            // Redirect back to AdminQlty after successful creation
            window.location.href = '/dimQlty'; // Update the URL as needed
        } catch (error) {
            console.error('Error creating DimQlty:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create New DimQlty</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="dimQlty" className="form-label">DimQlty</label>
                    <input type="text" className="form-control" id="dimQlty" name="dimQlty" value={newDimQlty.dimQlty} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Create DimQlty</button>
            </form>
        </div>
    );
};

export default CreateDimQlty;
