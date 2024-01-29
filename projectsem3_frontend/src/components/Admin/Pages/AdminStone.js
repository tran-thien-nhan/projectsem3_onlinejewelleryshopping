import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../Context/DataContext';

const AdminStone = () => {
    const { stones, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredStones = [...stones].filter(
        (stone) =>
            stone.style_Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stone.stoneQlty_ID.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleReset = () => {
        setSearchTerm("");
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
                                        {/* <a href={`/admin/cat/${cat.cat_ID}`}>
                                            <button className="btn btn-primary">Edit</button>
                                        </a>
                                        <a href={`/admin/cat/${cat.cat_ID}`}>
                                            <button className="btn btn-primary">Edit</button>
                                        </a> */}
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
        </div>
    );
};

export default AdminStone