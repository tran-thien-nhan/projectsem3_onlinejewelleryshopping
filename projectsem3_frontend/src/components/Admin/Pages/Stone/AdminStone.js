import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../../Context/DataContext';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminStone = () => {
    const { stoneQualities, stones, loading, error } = useData();
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
                stone.stone_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        setVisibilityFilter("all");
    };

    const handleUpdateVisibility = async (stone_ID) => {
        try {
            await axios.put(
                `https://localhost:7241/api/StoneMst/updatevisibility/${stone_ID}`
            );
            // Update the visibility of the item in the state or fetch the updated data again
            await window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (stone_ID) => {
        try {
            //confirm button
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });
            if (confirm.isConfirmed) {
                const res = await axios.delete(
                    `https://localhost:7241/api/StoneMst/${stone_ID}`
                );
                console.log(res.data);
                if (res.data.status === 200) {
                    Swal.fire("Success", res.data.message, "success");
                    setTimeout(() => {
                        Swal.close(); // Close the SweetAlert2 message
                        window.location.reload();
                    }, 1500);
                } else if (res.data.status === 409) {
                    Swal.fire("Error", res.data.message, "error");
                } else if (res.data.status === 402) {
                    Swal.fire("Error", "Cannot Delete This Stone", "error");
                }
            }
            else if (!confirm.isConfirmed) {
                Swal.fire("Cancelled", "Your Stone is safe :)", "success");
            }
            // await window.location.reload();
        } catch (error) {
            console.log(error);
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className='container-fluid'>
            <h1 className='mt-4'>Stone Info List</h1>
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
                            {/* <th>Stone ID</th> */}
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
                                <tr key={stone.stone_ID}>
                                    {/* <td>{stone.stone_ID}</td> */}
                                    <td>{stoneQualities.map((stoneQuality) => (
                                        stoneQuality.stoneQlty_ID === stone.stoneQlty_ID ? stoneQuality.stoneQlty : null
                                    ))
                                    }

                                    </td>
                                    <td>{stone.stone_Gm}</td>
                                    <td>{stone.stone_Pcs}</td>
                                    <td>{stone.stone_Crt}</td>
                                    <td>{stone.stone_Rate}</td>
                                    <td>{stone.stone_Amt}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateVisibility(stone.stone_ID)}
                                        >
                                            {stone.visible ? <FaTimes /> : <FaCheck />}
                                        </button>
                                    </td>
                                    <td>
                                        <a
                                            href={`/edit-stone/${stone.stone_ID}`}
                                            className="btn btn-danger"
                                        >
                                            Edit
                                        </a>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => handleDelete(stone.stone_ID)}
                                        >
                                            Delete
                                        </button>
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

export default AdminStone;