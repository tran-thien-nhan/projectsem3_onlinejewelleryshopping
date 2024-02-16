import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../../Context/DataContext';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AdminBrand = () => {
    const { brands, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [visibilityFilter, setVisibilityFilter] = useState("all");
    const [createBrandLoading, setCreateBrandLoading] = useState(false);



    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const handleVisibilityFilterChange = (filter) => {
        setVisibilityFilter(filter);
    };

    const filteredBrands = [...brands].filter(
        (brand) => {
            const matchesSearchTerm =
                brand.brand_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                brand.brand_Type.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesVisibilityFilter =
                visibilityFilter === "all" ||
                (visibilityFilter === "show" && brand.visible) ||
                (visibilityFilter === "hide" && !brand.visible);

            return (
                matchesSearchTerm && matchesVisibilityFilter
            );
        }
    );

    const handleReset = () => {
        setVisibilityFilter("all");
        setSearchTerm("");
    };

    const handleUpdateVisibility = async (brand_ID) => {
        try {
            await axios.put(
                `https://localhost:7241/api/BrandMst/updatevisibility/${brand_ID}`
            );
            // Update the visibility of the item in the state or fetch the updated data again
            await window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='mb-3'>
                <label for="">
                    Search by ID or Name
                </label>
                <input
                    type="text"
                    id='searchTerm'
                    onChange={handleSearchTermChange}
                    className="form-control"
                    value={searchTerm}
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
                            <th>Brand ID</th>
                            <th>Brand Type</th>
                            <th>Hide</th>
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
                        ) : Array.isArray(filteredBrands) && filteredBrands.length > 0 ? (
                            filteredBrands.map((brand) => (
                                <tr key={brand.brand_ID}>
                                    <td>{brand.brand_ID}</td>
                                    <td>{brand.brand_Type}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateVisibility(brand.brand_ID)}
                                        >
                                            {brand.visible ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                    <td>
                                        <a
                                            href={`/edit-brand/${brand.brand_ID}`}
                                            className="btn btn-danger"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No brands found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='mb-3 d-flex'>
                <button className="btn btn-secondary" onClick={handleReset}>
                    Reset
                </button>
                <div className="btn btn-primary">
                    <a
                        href="/create-brand"
                        style={{ textDecoration: "none" }}
                        className="text-white"
                        onClick={() => setCreateBrandLoading(true)}
                    >
                        {createBrandLoading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <>Create New Brand</>
                        )}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminBrand