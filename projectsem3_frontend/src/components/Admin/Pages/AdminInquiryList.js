import React, { useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../Context/DataContext';

const AdminInquiry = () => {
    const { inquiry, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleReset = () => {
        setSearchTerm('');
    };

    const handleDeleteInquiry = async (id) => {
        try {
            await axios.delete(`https://localhost:7241/api/Inquiry/${id}`);
            // Reload the inquiries after deleting
            window.location.reload();
        } catch (error) {
            console.error('Delete inquiry error:', error);
        }
    };

    const filteredInquiries = inquiry.filter((inquiryItem) => {
        const matchesSearchTerm =
            inquiryItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiryItem.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiryItem.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiryItem.emailID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiryItem.comment.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearchTerm;
    });

    return (
        <div className='container-fluid'>
            <div className='mb-3'>
                <label htmlFor='searchTerm'>
                    Search by Name, City, Contact, Email, or Comment
                </label>
                <input
                    type='text'
                    className='form-control'
                    id='searchTerm'
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </div>
            <div className='site-blocks-table'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Action</th> {/* Add Action column for delete button */}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan='6' style={{ textAlign: 'center' }}>
                                    <TailSpin color='red' radius={8} />
                                </td>
                            </tr>
                        ) : filteredInquiries.length > 0 ? (
                            filteredInquiries.map((inquiryItem) => (
                                <tr key={inquiryItem.ID}>
                                    <td>{inquiryItem.name}</td>
                                    <td>{inquiryItem.city}</td>
                                    <td>{inquiryItem.contact}</td>
                                    <td>{inquiryItem.emailID}</td>
                                    <td>{inquiryItem.comment}</td>
                                    <td> {/* Add delete button */}
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => handleDeleteInquiry(inquiryItem.inquiry_ID)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='6'>No Inquiry Found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='mb-3 d-flex'>
                <button className='btn btn-secondary' onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default AdminInquiry;
