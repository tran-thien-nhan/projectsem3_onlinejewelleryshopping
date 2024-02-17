import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../../Context/DataContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminEditCertify = () => {
    const navigate = useNavigate();
    const { certify_ID } = useParams();
    const {
        certifies,
        loading,
        error,
    } = useData();

    const [certify, setCertify] = useState({
        certify_ID: "",
        certify_Type: "",
        visible: true,
    });

    useEffect(() => {
        const fetchCertify = async () => {
            try {
                const response = await
                    axios
                        .get(
                            `https://localhost:7241/api/CertifyMst/get_1_certification/${certify_ID}`
                        );
                const fetchedCertify = response.data.data;
                setCertify(fetchedCertify);
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        };

        fetchCertify();
    }, [certify_ID]);

    function handleInputChange(event) {
        const { name, value } = event.target;

        setCertify((prevCertify) => ({
            ...prevCertify,
            [name]: value
        }));
    }

    const handleSelectedOptionChange = (e) => {
        setCertify({ ...certify, visible: e.target.value === "true" });
    };

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("certify_ID", certify.certify_ID);
        formData.append("certify_Type", certify.certify_Type);
        formData.append("visible", certify.visible);

        if (
            certifies.some(
                (c) =>
                    c.certify_Type === certify.certify_Type &&
                    c.certify_ID !== certify.certify_ID
            )
        ) {
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: "Certification already exists!",
            });
            return;
        }

        axios
            .put("https://localhost:7241/api/CertifyMst", formData)
            .then((res) => {
                if (res.status === 200) {
                    setCertify({
                        certify_ID: "",
                        certify_Type: "",
                        visible: true,
                    });
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Certification Updated Successfully",
                    });
                    setTimeout(() => {
                        navigate('/certify');
                        window.location.reload();
                    }, 2000);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Certification Updated Failed",
                    });
                    setTimeout(() => {
                        Swal.close();
                        navigate("/certify");
                    }, 1500);
                }
            }).catch((err) => {
                console.error("Error updating Certification:", err);
                Swal.fire({
                    icon: 'error',
                    title: "Error",
                    text: "Error updating Certification!",
                });
                setTimeout(() => {
                    navigate("/certify");
                    window.location.reload();
                }, 1500);
            });
    }

    return (
        <div className='container'>
            <h1>Edit Certification</h1>
            <form
                onSubmit={handleSubmit}
                className='my-4'
                encType='multipart/form-data'
            >
                <div className="mb-3 mt-3" style={{ display: "none" }}>
                    <label for="Certification" class="form-label">
                        Certification ID:
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="certify_ID"
                        placeholder="Enter Certification ID"
                        name="certify_ID"
                        value={"certify_ID"}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div className='mb-3 mt-3'>
                    <label for="Certification" className='form-label'>
                        Certification Type:
                    </label>
                    <input
                        type='text'
                        className='form-control'
                        id='certify_Type'
                        placeholder='Enter certification Type'
                        name='certify_Type'
                        value={certify && certify.certify_Type}
                        onChange={handleInputChange}
                    />
                </div>
                <div class="mb-3 mt-3">
                    <label for="Certification Visible" class="form-label">
                        Certification Hidden:
                    </label>
                    <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={handleSelectedOptionChange}
                        value={certify && certify.visible}
                    >
                        <option selected>Visible</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">
                    Edit Certification
                </button>
            </form>
        </div>
    )
}

export default AdminEditCertify