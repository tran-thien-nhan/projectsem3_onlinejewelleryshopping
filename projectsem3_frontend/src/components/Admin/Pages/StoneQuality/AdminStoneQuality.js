import React, { useState } from 'react'
import { useData } from '../../../../Context/DataContext';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AdminStoneQuality = () => {
    const { stoneQualities, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [visibilityFilter, setVisibilityFilter] = useState("all");
    const [createStoneQualityLoading, setCreateStoneQualityLoading] = useState(false);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleVisibilityFilterChange = (filter) => {
        setVisibilityFilter(filter);
    };

    const filteredStoneQualities = [...stoneQualities].filter(
        (stoneQuality) => {
            const matchesSearchTerm =
                stoneQuality.stoneQlty_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stoneQuality.stoneQlty.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesVisibilityFilter =
                visibilityFilter === "all" ||
                (visibilityFilter === "show" && stoneQuality.visible) ||
                (visibilityFilter === "hide" && !stoneQuality.visible);
            return (
                matchesSearchTerm && matchesVisibilityFilter
            );
        }
    );

    const handleReset = () => {
        setVisibilityFilter("all");
        setSearchTerm("");
    };

    const handleUpdateVisibility = async (stoneQlty_ID) => {
        try {
            await axios.put(
                `https://localhost:7241/api/StoneQltyMst/updatevisibility/${stoneQlty_ID}`
            );
            // Update the visibility of the item in the state or fetch the updated data again
            await window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container-fluid'>
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
                            <th>Stone Quality ID</th>
                            <th>Stone Quality Name</th>
                            <th>Stone Quality Year</th>
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
                        ) : Array.isArray(filteredStoneQualities) && filteredStoneQualities.length > 0 ? (
                            filteredStoneQualities.map((stoneQlty) => (
                                <tr key={stoneQlty.stoneQlty_ID}>
                                    <td>{stoneQlty.stoneQlty_ID}</td>
                                    <td>{stoneQlty.stoneQlty}</td>
                                    <td>{stoneQlty.stone_Year}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateVisibility(stoneQlty.stoneQlty_ID)}
                                        >
                                            {stoneQlty.visible ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                    <td>
                                        <a
                                            href={`/edit-stone-quality/${stoneQlty.stoneQlty_ID}`}
                                            className="btn btn-danger"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No Stone Quality Found.</td>
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
                        href="/create-stone-quality"
                        style={{ textDecoration: "none" }}
                        className="text-white"
                        onClick={() => setCreateStoneQualityLoading(true)}
                    >
                        {createStoneQualityLoading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <>Create New Stone Quality</>
                        )}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AdminStoneQuality