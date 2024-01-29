import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useData } from '../../../Context/DataContext';

const AdminBrand = () => {
    const { brands, loading, error } = useData();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBrands = [...brands].filter(
        (brand) =>
            brand.brand_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.brand_Type.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <th>Brand ID</th>
                            <th>Brand Type</th>
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
                                        {/* <a href={`/admin/brand/${brand.brand_ID}`}>
                                            <button className="btn btn-primary">Edit</button>
                                        </a>
                                        <a href={`/admin/brand/${brand.brand_ID}`}>
                                            <button className="btn btn-primary">Edit</button>
                                        </a> */}
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
        </div>
    );
};

export default AdminBrand