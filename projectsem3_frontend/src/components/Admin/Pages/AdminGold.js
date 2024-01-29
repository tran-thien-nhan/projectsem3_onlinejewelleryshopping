import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../Context/DataContext';

const AdminGold = () => {
    const { golds, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredGolds = [...golds].filter(
        (gold) =>
            gold.goldType_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gold.gold_Crt.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <th>Gold ID</th>
                            <th>Gold Krt</th>
                            {/* <th>Gold Visible</th> */}
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
                                    {/* <td>{gold.visible}</td> */}
                                    <td>
                                        {/* <a href={`/admin/brand/${brand.brand_ID}`}>
                                            <button className="btn btn-primary">Edit</button>
                                        </a>
                                        <a href={`/admin/brand/${brand.brand_ID}`}>
                                            <button className="btn btn-primary">Delete</button>
                                        </a> */}
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
        </div>
    );
};

export default AdminGold