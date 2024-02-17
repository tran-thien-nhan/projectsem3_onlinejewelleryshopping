import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditDimInfo = () => {
    const { id } = useParams();
    const [dimInfo, setDimInfo] = useState({
        dimType: '',
        dimSubType: '',
        dimCrt: '',
        dimPrice: '',
        dimYear: '',
        dimImg: ''
    });
    const [file, setFile] = useState(null); // State để lưu trữ tệp hình ảnh mới

    useEffect(() => {
        const fetchDimInfo = async () => {
            try {
                const response = await axios.get(`https://localhost:7241/api/DimInfoMst/getonediminfo/${id}`);
                if (response.status === 200) {
                    const dimData = response.data.data;
                    setDimInfo({
                        dimType: dimData.dimType || '',
                        dimSubType: dimData.dimSubType || '',
                        dimCrt: dimData.dimCrt || '',
                        dimPrice: dimData.dimPrice || '',
                        dimYear: dimData.dimYear || '',
                        dimImg: dimData.dimImg || ''
                    });
                } else {
                    console.error('DimInfo not found');
                }
            } catch (error) {
                console.error('Error fetching DimInfo:', error);
            }
        };

        fetchDimInfo();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDimInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        // Lưu trữ tệp hình ảnh mới khi người dùng chọn
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('dimID', id);
            formData.append('dimType', dimInfo.dimType);
            formData.append('dimSubType', dimInfo.dimSubType);
            formData.append('dimCrt', dimInfo.dimCrt);
            formData.append('dimPrice', dimInfo.dimPrice);
            formData.append('dimYear', dimInfo.dimYear);
            formData.append('file', file); // Sử dụng tệp mới được lưu trữ

            const response = await axios.put(`https://localhost:7241/api/DimInfoMst`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                console.log('DimInfo updated:', response.data);
                window.location.href = '/dimInfo';
            }
        } catch (error) {
            console.error('Error updating DimInfo:', error);
        }
    };

    return (
        <div className="container">
            <h1>Edit DimInfo</h1>
            <form onSubmit={handleSubmit} className="my-4" encType="multipart/form-data">
                <div className="mb-3 mt-3">
                    <label htmlFor="dimType" className="form-label">Dim Type:</label>
                    <input type="text" className="form-control" id="dimType" name="dimType" value={dimInfo.dimType} onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="dimSubType" className="form-label">Dim SubType:</label>
                    <input type="text" className="form-control" id="dimSubType" name="dimSubType" value={dimInfo.dimSubType} onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="dimCrt" className="form-label">Dim Carat:</label>
                    <input type="text" className="form-control" id="dimCrt" name="dimCrt" value={dimInfo.dimCrt} onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="dimPrice" className="form-label">Dim Price:</label>
                    <input type="text" className="form-control" id="dimPrice" name="dimPrice" value={dimInfo.dimPrice} onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="dimYear" className="form-label">Dim Year:</label>
                    <input type="text" className="form-control" id="dimYear" name="dimYear" value={dimInfo.dimYear} onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="dimImg" className="form-label">Dim Image:</label>
                    <input type="file" className="form-control-file" id="dimImg" name="dimImg" onChange={handleFileChange} />
                    {dimInfo.dimImg && (
                        <img src={dimInfo.dimImg} alt="Image Preview" style={{ marginTop: '10px', maxWidth: '100px' }} />
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Edit DimInfo</button>
            </form>
        </div>
    );
};

export default EditDimInfo;
