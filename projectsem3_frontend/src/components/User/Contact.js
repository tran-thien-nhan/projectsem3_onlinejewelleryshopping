import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        contact: '',
        emailID: '',
        comment: '',
        visible: true
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const userLoggedIn = sessionStorage.getItem('userID');
        if (userLoggedIn) {
            axios.get(`https://localhost:7241/api/User/getuserbyid/${userLoggedIn}`)
                .then(response => {
                    const userData = response.data.data;
                    setFormData({
                        name: userData.userName || '',
                        city: userData.city || '',
                        contact: userData.mobNo || '',
                        emailID: userData.emailID || '',
                        comment: ''
                    });
                })
              
        }
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gửi yêu cầu HTTP để tạo comment mới
            const response = await axios.post('https://localhost:7241/api/Inquiry/create', formData);
            setSuccessMessage('Comment submitted successfully!');
            // Xóa dữ liệu trong formData để chuẩn bị cho comment tiếp theo
            setFormData({ name: '', city: '', contact: '', emailID: '', comment: '' });
        } catch (error) {
            console.error('Error submitting comment:', error);
            setErrorMessage('Failed to submit comment.');
        }
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-4 text-center">Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="contact" name="contact" value={formData.contact} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailID" className="form-label">Email</label>
                    <input type="email" className="form-control" id="emailID" name="emailID" value={formData.emailID} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">Comment</label>
                    <textarea className="form-control" id="comment" name="comment" rows="4" value={formData.comment} onChange={handleChange}></textarea>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                </div>
            </form>
            {successMessage && <div className="alert alert-success mt-3" role="alert">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger mt-3" role="alert">{errorMessage}</div>}
        </div>
    );
};

export default Contact;
