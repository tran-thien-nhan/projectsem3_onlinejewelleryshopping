import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../../Context/DataContext';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AdminStone = () => {
    const { stones, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [visibilityFilter, setVisibilityFilter] = useState("all");
    const [createStoneLoading, setCreateStoneLoading] = useState(false);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleVisibilityFilterChange = (filter) => {
        setVisibilityFilter(filter);
    };

    const filteredStones = [...stones].filter(
        (stone) => {
            const matchesSearchTerm =
                stone.style_Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stone.stoneQlty_ID.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesVisibilityFilter =
                visibilityFilter === "all" ||
                (visibilityFilter === "show" && stone.visible) ||
                (visibilityFilter === "hide" && !stone.visible);
            return (
                matchesSearchTerm && matchesVisibilityFilter
            );
        }
    );

    const handleReset = () => {
        setSearchTerm("");
    };

    const handleUpdateVisibility = async (style_Code) => {
        try {
            await axios.put(
                `https://localhost:7241/api/StoneMst/updatevisibility/${style_Code}`
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
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                            <th>Stone ID</th>
                            <th>Stone Quality</th>
                            <th>Mass (Gram)</th>
                            <th>Total stone per Item</th>
                            <th>Carat</th>
                            <th>Price per Stone</th>
                            <th>Total Price</th>
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
                        ) : Array.isArray(filteredStones) && filteredStones.length > 0 ? (
                            filteredStones.map((stone) => (
                                <tr key={stone.style_Code}>
                                    <td>{stone.style_Code}</td>
                                    <td>{stone.stoneQlty_ID}</td>
                                    <td>{stone.stone_Gm}</td>
                                    <td>{stone.stone_Pcs}</td>
                                    <td>{stone.stone_Crt}</td>
                                    <td>{stone.stone_Rate}</td>
                                    <td>{stone.stone_Amt}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateVisibility(stone.style_Code)}
                                        >
                                            {stone.visible ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                    <td>
                                        <a
                                            href={`/edit-stone/${stone.style_Code}`}
                                            className="btn btn-danger"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No Stone Found.</td>
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
                        href="/create-stone"
                        style={{ textDecoration: "none" }}
                        className="text-white"
                        onClick={() => setCreateStoneLoading(true)}
                    >
                        {createStoneLoading ? (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <>Create New Stone</>
                        )}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminStone