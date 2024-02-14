// AdminEditProd.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminEditProd = () => {
    const { id } = useParams();
    const [prod, setProd] = useState({
        prod_ID: '',
        prod_Type: ''
    });

    useEffect(() => {
        const fetchProd = async () => {
            try {
                const response = await axios.get(`https://localhost:7241/api/ProdMst/getonepro/${id}`);
                setProd(response.data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProd();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProd(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7241/api/ProdMst/${id}`, prod);
            window.location.href = '/prod';
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='prod_Type' className='form-label'>Product Type</label>
                    <input type='text' className='form-control' id='prod_Type' name='prod_Type' value={prod.prod_Type} onChange={handleChange} required />
                </div>
                <button type='submit' className='btn btn-primary'>Update Product</button>
            </form>
        </div>
    );
};

export default AdminEditProd;
