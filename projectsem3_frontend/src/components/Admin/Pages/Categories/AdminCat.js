import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../../Context/DataContext';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AdminCat = () => {
    const { categories, loading, error } = useData();
    const [visibilityFilter, setVisibilityFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [createCatLoading, setCreateCatLoading] = useState(false);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleVisibilityFilterChange = (filter) => {
        setVisibilityFilter(filter);
    };

    const filteredCats = [...categories].filter(
        (cat) => {
            const matchesSearchTerm =
                cat.cat_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cat.cat_Name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesVisibilityFilter =
                visibilityFilter === "all" ||
                (visibilityFilter === "show" && cat.visible) ||
                (visibilityFilter === "hide" && !cat.visible);
            return (
                matchesSearchTerm && matchesVisibilityFilter
            );
        }
    );

    const handleReset = () => {
        setVisibilityFilter("all");
        setSearchTerm("");
    };

    const handleUpdateVisibility = async (cat_ID) => {
        try {
            await axios.put(
                `https://localhost:7241/api/CatMst/updatevisibility/${cat_ID}`
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
            </div>
            <div className='site-blocks-table'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Category ID</th>
                            <th>Category Name</th>
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
                        ) : Array.isArray(filteredCats) && filteredCats.length > 0 ? (
                            filteredCats.map((cat) => (
                                <tr key={cat.cat_ID}>
                                    <td>{cat.cat_ID}</td>
                                    <td>{cat.cat_Name}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateVisibility(cat.cat_ID)}
                                        >
                                            {cat.visible ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                    <td>
                                        <a
                                            href={`/edit-cat/${cat.cat_ID}`}
                                            className="btn btn-danger"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No Category Found.</td>
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
                        href="/create-cat"
                        style={{ textDecoration: "none" }}
                        className="text-white"
                        onClick={() => setCreateCatLoading(true)}
                    >
                        {createCatLoading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <>Create New Categories</>
                        )}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminCat