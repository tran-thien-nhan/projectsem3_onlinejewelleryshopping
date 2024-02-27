import React, { useState } from "react";
import axios from "axios";

const AdminCreateJewelType = () => {
  const [newJewelType, setNewJewelType] = useState({
    jewellery_ID: "",
    jewellery_Type: "",
    visible: true,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJewelType((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(""); // Reset error message when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if jewellery_Type is not empty
      if (!newJewelType.jewellery_Type.trim()) {
        setError("Jewel Type Name is required.");
        return;
      }

      // Check if jewellery_Type is not a negative number or zero
      if (parseInt(newJewelType.jewellery_Type) <= 0) {
        setError("Jewel Type Name must be a positive number.");
        return;
      }
      // Kiểm tra trùng lặp tên Jewel Type trước khi gửi yêu cầu POST
      const response = await axios.get(
        "https://localhost:7241/api/JewelTypeMst"
      );
      const existingJewelTypes = response.data.data; // Truy cập vào thuộc tính chứa mảng dữ liệu
      const isDuplicate = existingJewelTypes.some(
        (type) => type.jewellery_Type === newJewelType.jewellery_Type
      );
      if (isDuplicate) {
        setError("Jewel Type already exists.");
        return;
      }

      // Nếu không có trùng lặp, thực hiện gửi yêu cầu POST
      const postResponse = await axios.post(
        "https://localhost:7241/api/JewelTypeMst",
        newJewelType
      );
      console.log("New Jewel Type created:", postResponse.data);
      // Redirect back to AdminJewelType after successful creation
      window.location.href = "/jewelType";
    } catch (error) {
      console.error("Error creating Jewel Type:", error);
    }
  };

  // Kiểm tra xem có lỗi nào không trước khi cho phép submit
  const canSubmit = newJewelType.jewellery_Type.trim() !== "" && !error;

  return (
    <div className="container">
      <h2>Create New Jewel Type</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="jewellery_Type" className="form-label">
            Jewel Type Name
          </label>
          <input
            type="text"
            className={`form-control ${error && "is-invalid"}`}
            id="jewellery_Type"
            name="jewellery_Type"
            value={newJewelType.jewellery_Type}
            onChange={handleChange}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        {/* Thêm các trường dữ liệu khác của JewelType vào đây */}
        <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
          Create Jewel Type
        </button>
      </form>
    </div>
  );
};

export default AdminCreateJewelType;
