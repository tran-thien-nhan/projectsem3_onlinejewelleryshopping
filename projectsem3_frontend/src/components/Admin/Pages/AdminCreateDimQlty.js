import React, { useState } from "react";
import axios from "axios";

const CreateDimQlty = () => {
  const [newDimQlty, setNewDimQlty] = useState({
    dimQlty_ID: "",
    dimQlty: "",
    visible: true,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDimQlty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(""); // Reset error message when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if dimQlty is not empty and positive
      if (!newDimQlty.dimQlty || Number(newDimQlty.dimQlty) <= 0) {
        setError("DimQlty must be a positive value.");
        return;
      }

      // Kiểm tra trùng lặp tên DimQlty trước khi gửi yêu cầu POST
      const response = await axios.get("https://localhost:7241/api/DimQltyMst");
      const existingDimQltys = response.data.data;
      const isDuplicate = existingDimQltys.some(
        (dimQlty) => dimQlty.dimQlty === newDimQlty.dimQlty
      );
      if (isDuplicate) {
        setError("DimQlty already exists.");
        return;
      }

      // Nếu không có trùng lặp, thực hiện gửi yêu cầu POST
      const postResponse = await axios.post(
        "https://localhost:7241/api/DimQltyMst",
        newDimQlty
      );
      console.log("New DimQlty created:", postResponse.data);
      window.location.href = "/dimQlty";
    } catch (error) {
      console.error("Error creating DimQlty:", error);
    }
  };

  // Kiểm tra xem có lỗi nào không trước khi cho phép submit
  const canSubmit = newDimQlty.dimQlty.trim() !== "" && !error;

  return (
    <div className="container">
      <h2>Create New DimQlty</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dimQlty" className="form-label">
            DimQlty
          </label>
          <input
            type="text"
            className={`form-control ${error && "is-invalid"}`}
            id="dimQlty"
            name="dimQlty"
            placeholder="Input dimQlty"
            value={newDimQlty.dimQlty}
            onChange={handleChange}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
          Create DimQlty
        </button>
      </form>
    </div>
  );
};

export default CreateDimQlty;
