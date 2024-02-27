import React, { useState } from "react";
import axios from "axios";

const AdminCreateProd = () => {
  const [newProd, setNewProd] = useState({
    prod_ID: "",
    prod_Type: "",
    visible: true,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(""); // Reset error message when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if prod_Type is not empty
      if (!newProd.prod_Type.trim()) {
        setError("Product Name is required.");
        return;
      }

      if (parseInt(newProd.prod_Type) <= 0) {
        setError("Jewel Type Name must be a positive number.");
        return;
      }
      // Kiểm tra trùng lặp tên sản phẩm trước khi gửi yêu cầu POST
      const response = await axios.get("https://localhost:7241/api/ProdMst");
      const existingProds = response.data.data;
      const isDuplicate = existingProds.some(
        (prod) => prod.prod_Type === newProd.prod_Type
      );
      if (isDuplicate) {
        setError("Product with the same name already exists.");
        return;
      }

      // Nếu không có trùng lặp, thực hiện gửi yêu cầu POST
      const postResponse = await axios.post(
        "https://localhost:7241/api/ProdMst",
        newProd
      );
      console.log("New Prod created:", postResponse.data);
      // Redirect back to AdminProd after successful creation
      window.location.href = "/prod";
    } catch (error) {
      console.error("Error creating Prod:", error);
    }
  };

  // Kiểm tra xem có lỗi nào không trước khi cho phép submit
  const canSubmit = newProd.prod_Type.trim() !== "" && !error;

  return (
    <div className="container">
      <h2>Create New Prod</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="prod_Type" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className={`form-control ${error && "is-invalid"}`}
            id="prod_Type"
            name="prod_Type"
            value={newProd.prod_Type}
            onChange={handleChange}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        {/* Thêm các trường dữ liệu khác của sản phẩm vào đây */}
        <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
          Create Prod
        </button>
      </form>
    </div>
  );
};

export default AdminCreateProd;
