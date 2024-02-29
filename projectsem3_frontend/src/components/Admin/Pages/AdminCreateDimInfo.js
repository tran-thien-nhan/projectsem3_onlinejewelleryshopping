import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminCreateDimInfo = () => {
  const navigate = useNavigate();
  const [dimInfo, setDimInfo] = useState({
    dimType: "",
    dimSubType: "",
    dimCrt: "",
    dimPrice: "",
    dimYear: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDimInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dimInfo.dimCrt <= 0 || dimInfo.dimPrice <= 0 || dimInfo.dimYear <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Dimensions must be positive numbers.",
      });
      return;
    }

    try {
      // Kiểm tra trùng lặp tên Dim Type trước khi gửi yêu cầu POST
      const response = await axios.get("https://localhost:7241/api/DimInfoMst");
      const existingDimTypes = response.data.data; // Truy cập vào thuộc tính chứa mảng dữ liệu
      const isDuplicate = existingDimTypes.some(
        (dim) => dim.dimType === dimInfo.dimType
      );
      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Duplicate Dim Type",
          text: "A Dim Type with the same name already exists.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("dimID", "abc"); // Hardcoded for now
      formData.append("dimType", dimInfo.dimType);
      formData.append("dimSubType", dimInfo.dimSubType);
      formData.append("dimCrt", parseFloat(dimInfo.dimCrt));
      formData.append("dimPrice", parseFloat(dimInfo.dimPrice));
      formData.append("dimYear", parseInt(dimInfo.dimYear));
      formData.append("file", file);

      const postResponse = await axios.post(
        "https://localhost:7241/api/DimInfoMst",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("New DimInfo created:", postResponse.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "DimInfo added successfully!",
      });
      setTimeout(() => {
        Swal.close();
        navigate("/dimInfo");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error creating DimInfo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create DimInfo!",
      });
    }
  };

  return (
    <div className="container">
      <h1>Create New DimInfo</h1>
      <form
        onSubmit={handleSubmit}
        className="my-4"
        encType="multipart/form-data"
      >
        <div class="mb-3 mt-3" style={{ display: "none" }}>
          <label for="Product Name" class="form-label">
            Style Code
          </label>
          <input
            type="text"
            class="form-control"
            id="style_Code"
            placeholder="Enter style_Code"
            name="dimID"
            value={"abc"}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="dimType" className="form-label">
            Dim Type:
          </label>
          <input
            type="text"
            className="form-control"
            id="dimType"
            name="dimType"
            value={dimInfo.dimType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="dimSubType" className="form-label">
            Dim SubType:
          </label>
          <input
            type="text"
            className="form-control"
            id="dimSubType"
            name="dimSubType"
            value={dimInfo.dimSubType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="dimCrt" className="form-label">
            Dim Carat:
          </label>
          <input
            type="number"
            className="form-control"
            id="dimCrt"
            name="dimCrt"
            value={dimInfo.dimCrt}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="dimPrice" className="form-label">
            Dim Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="dimPrice"
            name="dimPrice"
            value={dimInfo.dimPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="dimYear" className="form-label">
            Dim Year:
          </label>
          <input
            type="number"
            className="form-control"
            id="dimYear"
            name="dimYear"
            value={dimInfo.dimYear}
            onChange={handleChange}
            maxLength={4}
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="dimImg" className="form-label">
            Dim Image:
          </label>
          <input
            type="file"
            className="form-control-file"
            id="dimImg"
            name="dimImg"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create DimInfo
        </button>
      </form>
    </div>
  );
};

export default AdminCreateDimInfo;
