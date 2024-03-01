import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useData } from "../../../Context/DataContext";

const AdminEditDim = () => {
  const navigate = useNavigate();
  const { dimMst_ID } = useParams();
  const { items, dimQlty, categories, dimQltySub, dimInfo, loading, error } =
    useData();
  const [cate, setCate] = useState("");
  const [img, setImg] = useState("");
  const [dim, setDim] = useState({
    style_Code: "",
    dimMst_ID: "",
    dimQlty_ID: "",
    dimSubType_ID: "",
    dimID: "",
    dim_Crt: 0,
    dim_Pcs: 0,
    dim_Gm: 0,
    dim_Size: "",
    dim_Rate: 0,
    dim_Amt: 0,
    visible: true,
  });
  const [errors, setErrors] = useState({
    dim_Crt: "",
    dim_Pcs: "",
    dim_Gm: "",
    dim_Size: "",
    dim_Rate: "",
    dim_Amt: "",
  });
  const itemDiamond = items.filter(
    (item) => item.catMst.cat_ID === cate && item.dimMsts == null
  );

  console.log(dim);

  useEffect(() => {
    const fetchDim = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/DimMst/getonedim/${dimMst_ID}`
        );
        const fetchedDim = response.data.data;
        setDim(fetchedDim);
      } catch (error) {
        console.error("Error fetching dim:", error);
      }
    };

    fetchDim();
  }, [dimMst_ID]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDim((prevDim) => ({
      ...prevDim,
      [name]: value,
    }));

    if (name === "style_Code") {
      const selectedDim = items.find((item) => item.style_Code === value);
      setDim((prevDim) => ({
        ...prevDim,
        dimMst_ID: selectedDim.dimMst_ID,
      }));
      setImg(selectedDim.imagePath);
    }
  };

  const handleCateChange = (e) => {
    const selectedCate = e.target.value;
    setCate(selectedCate);
  };

  const handleUpdateDim = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường không được nhập số âm và số 0
    const inputErrors = {};
    if (dim.dim_Crt <= 0) {
      inputErrors.dim_Crt = "Dim Carat must be greater than 0";
    }
    if (dim.dim_Pcs <= 0) {
      inputErrors.dim_Pcs = "Dim Pieces must be greater than 0";
    }
    if (dim.dim_Gm <= 0) {
      inputErrors.dim_Gm = "Dim Grams must be greater than 0";
    }
    if (dim.dim_Size <= 0) {
      inputErrors.dim_Size = "Dim Grams must be greater than 0";
    }
    if (dim.dim_Rate <= 0) {
      inputErrors.dim_Rate = "Dim Rate must be greater than 0";
    }
    if (dim.dim_Amt <= 0) {
      inputErrors.dim_Amt = "Dim Amount must be greater than 0";
    }
    setErrors(inputErrors);

    // Kiểm tra nếu có lỗi thì không gửi dữ liệu lên server
    if (Object.keys(inputErrors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append("dimMst_ID", dimMst_ID);
    formData.append("style_Code", dim.style_Code);
    formData.append("dimQlty_ID", dim.dimQlty_ID);
    formData.append("dimSubType_ID", dim.dimSubType_ID);
    formData.append("dimID", dim.dimID);
    formData.append("dim_Crt", dim.dim_Crt);
    formData.append("dim_Pcs", dim.dim_Pcs);
    formData.append("dim_Gm", dim.dim_Gm);
    formData.append("dim_Size", dim.dim_Size);
    formData.append("dim_Rate", dim.dim_Rate);
    formData.append("dim_Amt", dim.dim_Amt);
    formData.append("visible", dim.visible);

    try {
      const response = await axios.put(
        `https://localhost:7241/api/DimMst`,
        formData
      );

      if (response.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Dim Updated successfully!",
        });
        setTimeout(() => {
          Swal.close();
          navigate("/dim");
          window.location.reload();
        }, 1500);
      } else if (response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
        setTimeout(() => {
          Swal.close();
          navigate("/dim");
          window.location.reload();
        }, 1500);
      } else {
        console.log(response);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Dim Update Failed!",
        });
        setTimeout(() => {
          Swal.close();
          // navigate("/dim");
          // window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating dim:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating Dim!",
      });
      setTimeout(() => {
        Swal.close();
        navigate("/dim");
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="container">
      <h1>Edit Dim</h1>
      <form onSubmit={handleUpdateDim} className="my-4">
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <label
            htmlFor="dimMst_ID"
            className="form-label"
          >
            Dim Master ID
          </label>
          <input
            type="text"
            className="form-control"
            id="dimMst_ID"
            name="dimMst_ID"
            value={dim.dimMst_ID}
            onChange={handleInputChange}
            readOnly
          />
        </div>

        <div className="mb-3 mt-3">
          <label for="category">Category:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleCateChange}
            value={cate || ""}
          >
            <option selected>Select Category</option>
            {categories.map((category) => (
              <option value={category.cat_ID}>{category.cat_Name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="style_Code" className="form-label">
            Product
          </label>
          <select
            className="form-select"
            id="style_Code"
            name="style_Code"
            value={dim.style_Code}
            onChange={handleInputChange}
          >
            <option value="">select Product</option>
            {itemDiamond.map((dimQuality) => (
              <option key={dimQuality.style_Code} value={dimQuality.style_Code}>
                {dimQuality.product_Name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 mt-3">
          <img
            src={img || "https://via.placeholder.com/150"}
            alt="Image Preview"
            style={{ marginTop: "10px", maxWidth: "100px" }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dimQlty_ID" className="form-label">
            Dim Quality ID
          </label>
          <select
            className="form-select"
            id="dimQlty_ID"
            name="dimQlty_ID"
            value={dim.dimQlty_ID}
            onChange={handleInputChange}
          >
            <option value="">Select Dim Quality ID</option>
            {dimQlty.map((dimQuality) => (
              <option key={dimQuality.dimQlty_ID} value={dimQuality.dimQlty_ID}>
                {dimQuality.dimQlty}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dimSubType_ID" className="form-label">
            Dim Subtype ID
          </label>
          <select
            className="form-select"
            id="dimSubType_ID"
            name="dimSubType_ID"
            value={dim.dimSubType_ID}
            onChange={handleInputChange}
          >
            <option value="">Select Dim Subtype ID</option>
            {dimQltySub.map((dimSub) => (
              <option key={dimSub.dimSubType_ID} value={dimSub.dimSubType_ID}>
                {dimSub.dimQlty}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dimID" className="form-label">
            Dim ID
          </label>
          <select
            className="form-select"
            id="dimID"
            name="dimID"
            value={dim.dimID}
            onChange={handleInputChange}
          >
            <option value="">Select Dim ID</option>
            {dimInfo.map((dimItem) => (
              <option key={dimItem.dimID} value={dimItem.dimID}>
                {dimItem.dimType}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dim_Crt" className="form-label">
            Dim Carat
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Crt"
            name="dim_Crt"
            value={dim.dim_Crt}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dim_Pcs" className="form-label">
            Dim Pieces
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Pcs"
            name="dim_Pcs"
            value={dim.dim_Pcs}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dim_Gm" className="form-label">
            Dim Grams
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Gm"
            name="dim_Gm"
            value={dim.dim_Gm}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dim_Size" className="form-label">
            Dim Size
          </label>
          <input
            type="text"
            className="form-control"
            id="dim_Size"
            name="dim_Size"
            value={dim.dim_Size}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dim_Rate" className="form-label">
            Dim Rate
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Rate"
            name="dim_Rate"
            value={dim.dim_Rate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dim_Amt" className="form-label">
            Dim Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Amt"
            name="dim_Amt"
            value={dim.dim_Amt}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="visible" className="form-label">
            Visible
          </label>
          <select
            className="form-control"
            id="visible"
            name="visible"
            value={dim.visible}
            onChange={handleInputChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Edit Dim
        </button>
      </form>
    </div>
  );
};

export default AdminEditDim;
