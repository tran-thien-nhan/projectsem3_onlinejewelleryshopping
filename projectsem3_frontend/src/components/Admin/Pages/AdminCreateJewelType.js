import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AdminCreateJewelType = () => {
    const [newJewelType, setNewJewelType] = useState({
        jewellery_ID: '', // Tạm thời để trống, có thể để người dùng nhập hoặc tự động tạo
        jewellery_Type: '', // Chỉnh sửa tên trường nếu cần thiết
        visible: true,
        // Thêm các trường dữ liệu khác của JewelType tại đây
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewJewelType(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7241/api/JewelTypeMst', newJewelType);
            console.log('New JewelType created:', response.data);
            // Điều hướng về trang AdminJewelType sau khi tạo thành công
            window.location.href = '/jewelType';
        } catch (error) {
            console.error('Error creating JewelType:', error);
        }
    };

    return (
        <div className='container'>
            <h2>Create New Jewel Type</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='jewellery_Type' className='form-label'>Jewel Type Name</label>
                    <input type='text' className='form-control' id='jewellery_Type' name='jewellery_Type' value={newJewelType.jewellery_Type} onChange={handleChange} required />
                </div>
                {/* Thêm các trường dữ liệu khác của JewelType vào đây */}
                <button type='submit' className='btn btn-primary'>Create Jewel Type</button>
            </form>
        </div>
    );
};

export default AdminCreateJewelType;
