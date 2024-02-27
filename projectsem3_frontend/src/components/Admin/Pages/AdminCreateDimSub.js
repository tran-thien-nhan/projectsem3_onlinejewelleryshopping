import React, { useState } from "react";
import axios from "axios";

const CreateDimQltySub = () => {
  const [newDimQltySub, setNewDimQltySub] = useState({
    dimSubType_ID: "", // Temporarily blank, can be entered by the user or generated automatically
    dimQlty: "",
    visible: true,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDimQltySub((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(""); // Reset error message when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if dimQlty is not 0
      if (parseInt(newDimQltySub.dimQlty) <= 0) {
        setError("DimQlty must not be 0.");
        return;
      }

      // Kiểm tra trùng lặp DimQltySub trước khi gửi yêu cầu POST
      const response = await axios.get(
        "https://localhost:7241/api/DimQltySubMst"
      );
      const existingDimQltySubs = response.data.data; // Truy cập vào thuộc tính chứa mảng dữ liệu
      const isDuplicate = existingDimQltySubs.some(
        (sub) => sub.dimQlty === newDimQltySub.dimQlty
      );
      if (isDuplicate) {
        setError("DimQltySub already exists.");
        return;
      }

      // Nếu không có trùng lặp, thực hiện gửi yêu cầu POST
      const postResponse = await axios.post(
        "https://localhost:7241/api/DimQltySubMst",
        newDimQltySub
      );
      console.log("New DimQltySub created:", postResponse.data);
      // Redirect back to AdminDimSub after successful creation
      window.location.href = "/dimQltySub";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("DimQltySub already exists.");
      } else {
        console.error("Error creating DimQltySub:", error);
      }
    }
  };

  // Kiểm tra xem có lỗi nào không trước khi cho phép submit
  const canSubmit = newDimQltySub.dimQlty.trim() !== "" && !error;

  return (
    <div className="container">
      <h2>Create New DimQltySub</h2>
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
            value={newDimQltySub.dimQlty}
            onChange={handleChange}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
          Create DimQltySub
        </button>
      </form>
    </div>
  );
};

export default CreateDimQltySub;
