import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditDimInfo = () => {
  const { id } = useParams();
  const [dimInfo, setDimInfo] = useState({
    dimType: "",
    dimSubType: "",
    dimCrt: "",
    dimPrice: "",
    dimYear: "",
    dimImg: "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({
    dimType: "",
    dimSubType: "",
    dimCrt: "",
    dimPrice: "",
    dimYear: "",
  });

  useEffect(() => {
    const fetchDimInfo = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/DimInfoMst/getonediminfo/${id}`
        );
        if (response.status === 200) {
          const dimData = response.data.data;
          setDimInfo({
            dimType: dimData.dimType || "",
            dimSubType: dimData.dimSubType || "",
            dimCrt: dimData.dimCrt || "",
            dimPrice: dimData.dimPrice || "",
            dimYear: dimData.dimYear || "",
            dimImg: dimData.dimImg || "",
          });
        } else {
          console.error("DimInfo not found");
        }
      } catch (error) {
        console.error("Error fetching DimInfo:", error);
      }
    };

    fetchDimInfo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDimInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Kiểm tra các trường dữ liệu
    if (dimInfo.dimType <= 0) {
      newErrors.dimType = "Dim Type must be a positive number.";
    }
    if (dimInfo.dimSubType <= 0) {
      newErrors.dimSubType = "Dim SubType must be a positive number.";
    }
    if (dimInfo.dimCrt <= 0) {
      newErrors.dimCrt = "Dim Carat must be a positive number.";
    }
    if (dimInfo.dimPrice <= 0) {
      newErrors.dimPrice = "Dim Price must be a positive number.";
    }
    if (dimInfo.dimYear <= 0) {
      newErrors.dimYear = "Dim Year must be a positive number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Kiểm tra trùng lặp `dimType`
      const responseCheckDuplicate = await axios.get(
        "https://localhost:7241/api/DimInfoMst"
      );
      const existingDimTypes = responseCheckDuplicate.data.data;
      const isDuplicate = existingDimTypes.some(
        (dim) => dim.dimType === dimInfo.dimType && dim.dimID !== id
      );
      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Dim Type already exists!",
        });
        return;
      }

      const formData = new FormData();
      formData.append("dimID", id);
      formData.append("dimType", dimInfo.dimType);
      formData.append("dimSubType", dimInfo.dimSubType);
      formData.append("dimCrt", dimInfo.dimCrt);
      formData.append("dimPrice", dimInfo.dimPrice);
      formData.append("dimYear", dimInfo.dimYear);
      formData.append("file", file);

      const responseUpdateDimInfo = await axios.put(
        `https://localhost:7241/api/DimInfoMst`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (responseUpdateDimInfo.status === 200) {
        console.log("DimInfo updated:", responseUpdateDimInfo.data);
        window.location.href = "/dimInfo";
      }
    } catch (error) {
      console.error("Error updating DimInfo:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit DimInfo</h1>
      <form
        onSubmit={handleSubmit}
        className="my-4"
        encType="multipart/form-data"
      >
        <div className="mb-3 mt-3">
          <label htmlFor="dimType" className="form-label">
            Dim Type:
          </label>
          <input
            type="text"
            className={`form-control ${errors.dimType && "is-invalid"}`}
            id="dimType"
            name="dimType"
            value={dimInfo.dimType}
            onChange={handleChange}
          />
          {errors.dimType && (
            <div className="invalid-feedback">{errors.dimType}</div>
          )}
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="dimSubType" className="form-label">
            Dim SubType:
          </label>
          <input
            type="text"
            className={`form-control ${errors.dimSubType && "is-invalid"}`}
            id="dimSubType"
            name="dimSubType"
            value={dimInfo.dimSubType}
            onChange={handleChange}
          />
          {errors.dimSubType && (
            <div className="invalid-feedback">{errors.dimSubType}</div>
          )}
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="dimCrt" className="form-label">
            Dim Carat:
          </label>
          <input
            type="text"
            className={`form-control ${errors.dimCrt && "is-invalid"}`}
            id="dimCrt"
            name="dimCrt"
            value={dimInfo.dimCrt}
            onChange={handleChange}
          />
          {errors.dimCrt && (
            <div className="invalid-feedback">{errors.dimCrt}</div>
          )}
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="dimPrice" className="form-label">
            Dim Price:
          </label>
          <input
            type="text"
            className={`form-control ${errors.dimPrice && "is-invalid"}`}
            id="dimPrice"
            name="dimPrice"
            value={dimInfo.dimPrice}
            onChange={handleChange}
          />
          {errors.dimPrice && (
            <div className="invalid-feedback">{errors.dimPrice}</div>
          )}
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="dimYear" className="form-label">
            Dim Year:
          </label>
          <input
            type="text"
            className={`form-control ${errors.dimYear && "is-invalid"}`}
            id="dimYear"
            name="dimYear"
            value={dimInfo.dimYear}
            onChange={handleChange}
            maxLength={4}
          />
          {errors.dimYear && (
            <div className="invalid-feedback">{errors.dimYear}</div>
          )}
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
            onChange={handleFileChange}
          />
          {dimInfo.dimImg && (
            <img
              src={dimInfo.dimImg}
              alt="Image Preview"
              style={{ marginTop: "10px", maxWidth: "100px" }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Edit DimInfo
        </button>
      </form>
    </div>
  );
};

export default EditDimInfo;
