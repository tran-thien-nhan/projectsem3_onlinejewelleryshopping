import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../Context/DataContext';

const AdminCat = () => {
    const { categories, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCats = [...categories].filter(
        (cat) =>
            cat.cat_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.cat_Name.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <th>Category ID</th>
                            <th>Category Name</th>
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
                                <td colSpan="4">No Category Found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCat