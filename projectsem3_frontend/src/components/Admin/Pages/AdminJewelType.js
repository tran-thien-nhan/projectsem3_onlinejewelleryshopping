import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../Context/DataContext';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminJewelType = () => {
    const { jewelry, loading, error } = useData();
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

    const handleUpdateVisibility = async (jewellery_ID) => {
        try {
            await axios.put(
                `https://localhost:7241/api/JewelTypeMst/updatevisibility/${jewellery_ID}`
            );
            // Update the visibility of the item in the state or fetch the updated data again
            await window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const filteredJewelType = [...jewelry].filter(
        (jewelTypeItem) => {
            const matchesSearchTerm =
                jewelTypeItem.jewellery_Type.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesVisibilityFilter =
                visibilityFilter === "all" ||
                (visibilityFilter === "show" && jewelTypeItem.visible) ||
                (visibilityFilter === "hide" && !jewelTypeItem.visible);

            return matchesSearchTerm && matchesVisibilityFilter;
        }
    );

    return (
        <div className='container-fluid'>
            <h2 className='mt-4'>Jewel Type</h2>
            <div className='mb-3'>
                <label htmlFor="">
                    Search by Jewel Type
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
                            <th>Jewel Type</th>
                            <th>Visibility</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100vh",
                                }}
                            >
                                <TailSpin color="red" radius={8} />{" "}
                            </div>
                        ) : Array.isArray(filteredJewelType) && filteredJewelType.length > 0 ? (
                            filteredJewelType.map((jewelTypeItem) => (
                                <tr key={jewelTypeItem.jewellery_ID}>
                                    <td>{jewelTypeItem.jewellery_Type}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateVisibility(jewelTypeItem.jewellery_ID)}
                                        >
                                            {jewelTypeItem.visible ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/editJewelType/${jewelTypeItem.jewellery_ID}`} className='btn btn-secondary'>Edit</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No Jewel Type Founded.</td>
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
            <div className="mb-3">
                <Link to='/createJewelType' className='btn btn-primary'>Create Jewel Type</Link>
            </div>
        </div>
    );
};

export default AdminJewelType;
