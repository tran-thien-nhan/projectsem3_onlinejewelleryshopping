import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../Context/DataContext';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminProd = () => {
    const { prod, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [visibilityFilter, setVisibilityFilter] = useState("all");

    const handleVisibilityFilterChange = (filter) => {
        setVisibilityFilter(filter);
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleReset = () => {
        setSearchTerm("");
        setVisibilityFilter("all");
    };

    const handleUpdateVisibility = async (prodID) => {
        try {
            // Gọi API để cập nhật trạng thái của sản phẩm
            await axios.put(
                `https://localhost:7241/api/ProdMst/updatevisibility/${prodID}`
            );
            // Cập nhật trạng thái của sản phẩm trong state hoặc tải dữ liệu mới
            await window.location.reload();
        } catch (error) {
            console.error("Update product visibility error:", error);
        }
    };
    

    const filteredProd = [...prod].filter(
        (prodItem) => {
            const matchesSearchTerm =
                prodItem.prod_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prodItem.prod_Type.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesVisibilityFilter =
                visibilityFilter === "all" ||
                (visibilityFilter === "show" && prodItem.visible) ||
                (visibilityFilter === "hide" && !prodItem.visible);

            return matchesSearchTerm && matchesVisibilityFilter;
        }
    );

    return (
        <div className='container-fluid'>
            <h1 className='mt-4'>Product Type</h1>
            <div className='mb-3'>
                <label htmlFor="searchTerm">
                    Search by ID or Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="visibilityFilter" className="form-label">
                    Filter by Visibility
                </label>
                <select
                    className="form-select"
                    id="visibilityFilter"
                    onChange={(e) => handleVisibilityFilterChange(e.target.value)}
                    value={visibilityFilter}
                >
                    <option value="all">All</option>
                    <option value="show">Show</option>
                    <option value="hide">Hide</option>
                </select>
            </div>
            <div className='site-blocks-table'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Product Type</th>
                            <th>Visibility</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center" }}>
                                    <TailSpin color="red" radius={8} />
                                </td>
                            </tr>
                        ) : Array.isArray(filteredProd) && filteredProd.length > 0 ? (
                            filteredProd.map((prodItem) => (
                                <tr key={prodItem.prod_ID}>
                                    <td>{prodItem.prod_Type}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateVisibility(prodItem.prod_ID)}
                                        >
                                            {prodItem.visible ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                    <td>
                                    <Link to={`/editProd/${prodItem.prod_ID}`} className='btn btn-secondary'>Edit</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No Product Found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='mb-3 d-flex'>
                <button className="btn btn-secondary" onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div className='mb-3'>
                {/* Nút để chuyển hướng sang trang tạo mới */}
                <Link to='/createProd' className='btn btn-primary'>Create Prod</Link>
            </div>
        </div>
    );
};

export default AdminProd;
