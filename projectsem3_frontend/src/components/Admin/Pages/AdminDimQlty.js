import React, { useState } from 'react';
import { useData } from '../../../Context/DataContext';
import { TailSpin } from 'react-loader-spinner';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminQlty = () => {
    const { dimQlty, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [visibilityFilter, setVisibilityFilter] = useState("all");

    const handleVisibilityFilterChange = (filter) => {
        setVisibilityFilter(filter);
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUpdateVisibility = async (dimQlty_ID) => {
        try {
            await axios.put(
                `https://localhost:7241/api/DimQltyMst/updatevisibility/${dimQlty_ID}`
            );
            await window.location.reload();
        } catch (error) {
            console.error("Update dimQlty visibility error:", error);
        }
    };

    const filteredDimQlty = dimQlty.filter(
        (dimQltyItem) => {
            const matchesSearchTerm =
                dimQltyItem.dimQlty.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesVisibilityFilter =
                visibilityFilter === "all" ||
                (visibilityFilter === "show" && dimQltyItem.visible) ||
                (visibilityFilter === "hide" && !dimQltyItem.visible);

            return matchesSearchTerm && matchesVisibilityFilter;
        }
    );

    return (
        <div className="container-fluid">
            <div className="mb-3">
                <label htmlFor="searchTerm">Search by DimQlty</label>
                <input
                    type="text"
                    className="form-control"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="visibilityFilter" className="form-label">Filter by Visibility</label>
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
            <div className="site-blocks-table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>DimQlty</th>
                            <th>Date</th>
                            <th>Status</th>
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
                        ) : error ? (
                            <tr>
                                <td colSpan="4">Error: {error.message}</td>
                            </tr>
                        ) : (
                            filteredDimQlty.map((dimQltyItem) => (
                                <tr key={dimQltyItem.dimQlty_ID}>
                                    <td>{dimQltyItem.dimQlty}</td>
                                    <td>{new Date(dimQltyItem.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateVisibility(dimQltyItem.dimQlty_ID)}
                                        >
                                            {dimQltyItem.visible ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/editDimQlty/${dimQltyItem.dimQlty_ID}`} className='btn btn-secondary'>Edit</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mb-3">
                <Link to='/createDimQlty' className='btn btn-primary'>Create DimQltySub</Link>
            </div>
        </div>
    );
};

export default AdminQlty;
