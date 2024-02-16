import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../../Context/DataContext';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AdminGold = () => {
    const { golds, loading, error } = useData();
    const [visibilityFilter, setVisibilityFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [createGoldLoading, setCreateGoldLoading] = useState(false);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleVisibilityFilterChange = (filter) => {
        setVisibilityFilter(filter);
    };

    const filteredGolds = [...golds].filter(
        (gold) => {
            const matchesSearchTerm =
                gold.goldType_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                gold.gold_Crt.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesVisibilityFilter =
                visibilityFilter === "all" ||
                (visibilityFilter === "show" && gold.visible) ||
                (visibilityFilter === "hide" && !gold.visible);
            return (
                matchesSearchTerm && matchesVisibilityFilter
            );
        }

    );

    const handleReset = () => {
        setVisibilityFilter("all");
        setSearchTerm("");
    };

    const handleUpdateVisibility = async (goldType_ID) => {
        try {
            await axios.put(
                `https://localhost:7241/api/GoldKrtMst/updatevisibility/${goldType_ID}`
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
                            <th>Gold ID</th>
                            <th>Gold Crt</th>
                            <th>Gold Year</th>
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
                        ) : Array.isArray(filteredGolds) && filteredGolds.length > 0 ? (
                            filteredGolds.map((gold) => (
                                <tr key={gold.goldType_ID}>
                                    <td>{gold.goldType_ID}</td>
                                    <td>{gold.gold_Crt}</td>
                                    <td>{gold.gold_Year}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateVisibility(gold.goldType_ID)}
                                        >
                                            {gold.visible ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                    <td>
                                        <a
                                            href={`/edit-gold/${gold.goldType_ID}`}
                                            className="btn btn-danger"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No Gold founded in the list.</td>
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
                        href="/create-gold"
                        style={{ textDecoration: "none" }}
                        className="text-white"
                        onClick={() => setCreateGoldLoading(true)}
                    >
                        {createGoldLoading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <>Create New Gold</>
                        )}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminGold