import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AdminCreateProd = () => {
    const [newProd, setNewProd] = useState({
        // Tạm thời để trống, có thể để người dùng nhập hoặc tự động tạo
        prod_ID: '', 
        prod_Type: '',
        visible: true,
        // Thêm các trường dữ liệu khác của sản phẩm tại đây
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProd(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7241/api/ProdMst', newProd);
            console.log('New Prod created:', response.data);
            // Redirect back to AdminProd after successful creation
            window.location.href = '/prod'; // Điều hướng về trang AdminProd sau khi tạo thành công
        } catch (error) {
            console.error('Error creating Prod:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Create New Prod</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='prod_Type' className='form-label'>Product Name</label>
                    <input type='text' className='form-control' id='prod_Type' name='prod_Type' value={newProd.prod_Type} onChange={handleChange} required />
                </div>
                {/* Thêm các trường dữ liệu khác của sản phẩm vào đây */}
                <button type='submit' className='btn btn-primary'>Create Prod</button>
            </form>
        </div>
    );
};

export default AdminCreateProd;
