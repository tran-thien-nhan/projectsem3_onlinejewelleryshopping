import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../../Context/DataContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminEditBrand = () => {
  const navigate = useNavigate();
  const { brand_ID } = useParams();
  const { brands, loading, error } = useData();

  const [brand, setBrand] = useState({
    brand_ID: "",
    brand_Type: "",
    brand_Year: 0,
    visible: true,
  });

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/BrandMst/getonebrand/${brand_ID}`
        );
        const fetchedBrand = response.data.data;
        setBrand(fetchedBrand);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchBrand();
  }, [brand_ID]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setBrand((prevBrand) => ({
      ...prevBrand,
      [name]: value,
    }));
  }

  const handleSelectedOptionChange = (e) => {
    setBrand({ ...brand, visible: e.target.value === "true" });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand_ID", brand.brand_ID);
    formData.append("brand_Type", brand.brand_Type);
    formData.append("brand_Year", brand.brand_Year);
    formData.append("visible", brand.visible);

    if (!/^[A-Za-z\s]+$/.test(brand.brand_Type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Certification Type should only contain letters and spaces",
      });
      return;
    }
    const currentYear = new Date().getFullYear();
    if (
      brand.brand_Year <= 0 ||
      isNaN(brand.brand_Year) ||
      brand.brand_Year > currentYear
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a valid year.",
      });
      return;
    }
    if (
      brands.some(
        (b) =>
          b.brand_Type === brand.brand_Type && b.brand_ID !== brand.brand_ID
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Brand name already exists!",
      });
      return;
    }

    axios
      .put(`https://localhost:7241/api/BrandMst`, formData)
      .then((res) => {
        if (res.status === 200) {
          setBrand({
            brand_ID: "",
            brand_Type: "",
            brand_Year: 0,
            visible: true,
          });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Brand updated successfully!",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/brands");
            window.location.reload();
          }, 1500);
        } else if (res.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Brand update failed!",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/brands");
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Brand update failed!",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/brands");
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Error updating Brand:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error updating Brand!",
        });
        setTimeout(() => {
          navigate("/brands");
          window.location.reload();
        }, 1500);
      });
  }

  return (
    <div className="container">
      <h1>Edit Brand</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="my-4"
      >
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <label for="Brand" class="form-label">
            Brand ID
          </label>
          <input
            type="text"
            class="form-control"
            id="brand_ID"
            placeholder="Enter Brand ID"
            name="brand_ID"
            value={"brand_ID"}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Brand" className="form-label">
            Brand Type:
          </label>
          <input
            type="text"
            className="form-control"
            id="brand_Type"
            placeholder="Enter Brand Type"
            name="brand_Type"
            value={brand && brand.brand_Type}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Brand" className="form-label">
            Brand Year:
          </label>
          <input
            type="text"
            className="form-control"
            id="brand_Year"
            placeholder="Enter Brand Year"
            name="brand_Year"
            value={brand && brand.brand_Year}
            onChange={handleInputChange}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Brand Visible" class="form-label">
            Brand Hidden:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleSelectedOptionChange}
            value={brand && brand.visible}
          >
            <option selected>Visible</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Edit Brand
        </button>
      </form>
    </div>
  );
};

export default AdminEditBrand;
