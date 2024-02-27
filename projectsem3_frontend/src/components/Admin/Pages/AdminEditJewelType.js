import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminEditJewelType = () => {
  const { id } = useParams();
  const [jewelType, setJewelType] = useState({
    jewellery_ID: "",
    jewellery_Type: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJewelType = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/JewelTypeMst/${id}`
        );
        setJewelType(response.data.data);
      } catch (error) {
        console.error("Error fetching jewel type:", error);
      }
    };

    fetchJewelType();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJewelType((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra trùng lặp tên jewellery_Type trước khi gửi yêu cầu PUT
    try {
      const response = await axios.get(
        "https://localhost:7241/api/JewelTypeMst"
      );
      const existingJewelTypes = response.data.data;
      const isDuplicate = existingJewelTypes.some(
        (j) =>
          j.jewellery_Type === jewelType.jewellery_Type &&
          j.jewellery_ID !== jewelType.jewellery_ID
      );
      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Jewel Type already exists!",
        });
        return;
      }

      // Kiểm tra nếu jewellery_Type không phải là số dương
      if (parseFloat(jewelType.jewellery_Type) <= 0) {
        setError("Jewel Type must be a positive number.");
        return;
      }

      await axios.put(
        `https://localhost:7241/api/JewelTypeMst/${id}`,
        jewelType
      );
      window.location.href = "/jewelType";
    } catch (error) {
      console.error("Error updating jewel type:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Jewel Type</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="jewellery_Type" className="form-label">
            Jewel Type
          </label>
          <input
            type="text"
            className={`form-control ${error && "is-invalid"}`}
            id="jewellery_Type"
            name="jewellery_Type"
            value={jewelType.jewellery_Type}
            onChange={handleChange}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Update Jewel Type
        </button>
      </form>
    </div>
  );
};

export default AdminEditJewelType;
