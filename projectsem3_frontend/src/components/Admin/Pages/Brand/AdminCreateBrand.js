
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../../Context/DataContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminCreateBrand = () => {
    const navigate = useNavigate();
    const {
        brands,
        loading,
        error
    } = useData();

    const [brand, setBrand] = useState([
        {
            brand_ID: "",
            brand_Type: "",
            brand_Year: "",
            visible: true,
        },
    ]);

    const [selectedOption, setSelectedOption] = useState(true);
    const [brandType, setBrandType] = useState("");
    const [brandYear, setBrandYear] = useState(0);
    const [brandVisibility, setBrandVisibility] = useState(true);
    const [brandId, setBrandId] = useState(null);

    function handleBrandChange(e) {
        let { name, value } = e.target;
        setBrandId(value);
        setBrandType(value);
        setBrandYear(value);
        setBrandVisibility(value);
        setBrand({ ...brand, [name]: value });
    }

    const handleSelectedOptionChange = (e) => {
        setSelectedOption(e.target.value === "true");
    };

    // const handleBrandVisibilityChange = (e) => {
    //     setBrand({ ...brand, visible: e.target.value });
    // };

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("brand_ID", "brand_ID");
        formData.append("brand_Type", brand.brand_Type);
        formData.append("brand_Year", brand.brand_Year);
        formData.append("visible", selectedOption.toString());

        axios
            .post("https://localhost:7241/api/BrandMst", formData)
            .then((res) => {
                if (res.status === 200) {
                    setBrand([]);
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Brand Created Successfully",
                    });
                    setTimeout(() => {
                        Swal.close();
                        navigate("/brands");
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Brand Creation Failed",
                });
                setTimeout(() => {
                    Swal.close();
                    navigate("/brands");
                }, 1000);
            });
    }

    return (
        <div>
            <div className='container'>
                <h1>Create New Brand</h1>
                <form
                    onSubmit={handleSubmit}
                    className="my-4"
                    encType='multipart/form-data'
                >
                    <div class="mb-3 mt-3" style={{ display: "none" }}>
                        <label for="Brand Name" class="form-label">
                            Brand ID
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="brand_ID"
                            placeholder="Enter brand_ID"
                            name="brand_ID"
                            value={"brand_ID"}
                            onChange={handleBrandChange}
                            readOnly
                        />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="Product Name" class="form-label">
                            Brand Type:
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="brand_Type"
                            placeholder="Enter brand type"
                            name="brand_Type"
                            value={brand.brand_Type}
                            onChange={handleBrandChange}
                        />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="Product Name" class="form-label">
                            Brand Year:
                        </label>
                        <input
                            type="number"
                            class="form-control"
                            id="brand_Year"
                            placeholder="Enter brand year"
                            name="brand_Year"
                            value={brand.brand_Year}
                            onChange={handleBrandChange}
                        />
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="Brand Visibility" class="form-label">
                            Brand Hidden:
                        </label>
                        <select
                            value={selectedOption.toString()}
                            placeholder="Select Brand Visibility"
                            id='visible'
                            name='visible'
                            class="form-select"
                            aria-label="Default select example"
                            onChange={handleSelectedOptionChange}
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Create Brand
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminCreateBrand;