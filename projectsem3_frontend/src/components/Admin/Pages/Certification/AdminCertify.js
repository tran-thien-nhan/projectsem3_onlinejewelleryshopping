import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../../Context/DataContext';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const AdminCertify = () => {
    const { certifies, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [visibilityFilter, setVisibilityFilter] = useState("all");
    const [createCertifyLoading, setCreateCertifyLoading] = useState(false);

    const handleVisibilityFilterChange = (filter) => {
        setVisibilityFilter(filter);
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCertify = [...certifies].filter(
        (certify) => {
            const matchesSearchTerm =
                certify.certify_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                certify.certify_Type.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesVisibilityFilter =
                visibilityFilter === "all" ||
                (visibilityFilter === "show" && certify.visible) ||
                (visibilityFilter === "hide" && !certify.visible);

            return matchesSearchTerm && matchesVisibilityFilter;
        }
    );

    const handleReset = () => {
        setSearchTerm("");
        setVisibilityFilter("all");
    };

    const handleUpdateVisibility = async (certify_ID) => {
        try {
            await axios.put(
                `https://localhost:7241/api/CertifyMst/updatevisibility/${certify_ID}`
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
                            <th>Certification ID</th>
                            <th>Certification Type</th>
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
                        ) : Array.isArray(filteredCertify) && filteredCertify.length > 0 ? (
                            filteredCertify.map((certify) => (
                                <tr key={certify.certify_ID}>
                                    <td>{certify.certify_ID}</td>
                                    <td>{certify.certify_Type}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateVisibility(certify.certify_ID)}
                                        >
                                            {certify.visible ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                    <td>
                                        <a
                                            href={`/edit-certify/${certify.certify_ID}`}
                                            className="btn btn-danger"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No Certification Founded.</td>
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
                        href="/create-certify"
                        style={{ textDecoration: "none" }}
                        className="text-white"
                        onClick={() => setCreateCertifyLoading(true)}
                    >
                        {createCertifyLoading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <>Create New Certification</>
                        )}
                    </a>
                </div>
            </div>


        </div>
    );
};

export default AdminCertify

