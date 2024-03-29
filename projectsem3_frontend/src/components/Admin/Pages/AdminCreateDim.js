import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../Context/DataContext";

const AdminCreateDim = () => {
  const navigate = useNavigate();
  const { items, itemListWithDim, categories, dimQlty, dimInfo, dimQltySub } =
    useData();
  const [dim, setDim] = useState([]);
  const [selectedOption, setSelectedOption] = useState(true);
  const [dim_Crt, setDim_Crt] = useState(0);
  const [dim_Pcs, setDim_Pcs] = useState(0);
  const [dim_Gm, setDim_Gm] = useState(0);
  const [dim_Size, setDim_Size] = useState(0);
  const [dim_Rate, setDim_Rate] = useState(0);
  const [dim_Amt, setDim_Amt] = useState(0);
  const [dimVisibility, setDimVisibility] = useState(true);
  const [cate, setCate] = useState("");
  const [style_Code, setStyle_Code] = useState("");
  const [img, setImg] = useState("");

  //console.log(cate);

  const itemDiamond = items.filter(
    (item) => item.catMst.cat_ID === cate && item.dimMsts == null
  );
  //console.log(itemDiamond);
  //console.log(items);
  //console.log(categories);

  function handleDimChange(e) {
    let { name, value } = e.target;
    setDim_Crt(value);
    setDim_Pcs(value);
    setDim_Gm(value);
    setDim_Size(value);
    setDim_Rate(value);
    setDim_Amt(value);
    setDimVisibility(value);
    setDim({ ...dim, [name]: value });
  }

  const handleSelectedOptionChange = (e) => {
    setSelectedOption(e.target.value === "true");
  };

  const handleDimQualityChange = (e) => {
    setDim({ ...dim, dimQlty_ID: e.target.value });
  };

  const handleDimSubChange = (e) => {
    setDim({ ...dim, dimSubType_ID: e.target.value });
  };
  const handleDimInfoChange = (e) => {
    setDim({ ...dim, dimID: e.target.value });
  };

  const handleCateChange = (e) => {
    const selectedCate = e.target.value;
    setCate(selectedCate);
  };

  const handleProductChange = (e) => {
    setDim({ ...dim, style_Code: e.target.value });
    //lấy hình ảnh imagePath
    const selectedProduct = e.target.value;
    const item = items.find((item) => item.style_Code === selectedProduct);
    console.log(item.imagePath);
    setImg(item.imagePath);
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("style_Code", dim.style_Code);
    formData.append("dimMst_ID", dim.dimMst_ID);
    formData.append("dimQlty_ID", dim.dimQlty_ID);
    formData.append("dimSubType_ID", dim.dimSubType_ID);
    formData.append("dimID", dim.dimID);
    formData.append("dim_Crt", dim.dim_Crt);
    formData.append("dim_Pcs", dim.dim_Pcs);
    formData.append("dim_Gm", dim.dim_Gm);
    formData.append("dim_Size", dim.dim_Size);
    formData.append("dim_Rate", dim.dim_Rate);
    formData.append("dim_Amt", dim.dim_Amt);
    formData.append("visible", selectedOption.toString());

    // Kiểm tra số âm hoặc số 0
    if (
      dim.dim_Crt <= 0 ||
      dim.dim_Pcs <= 0 ||
      dim.dim_Gm <= 0 ||
      dim.dim_Size <= 0 ||
      dim.dim_Rate <= 0 ||
      dim.dim_Amt <= 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Dimensions must be positive numbers.",
      });
      return;
    }
    axios
      .post("https://localhost:7241/api/DimMst", formData)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Dim Created Successfully",
            icon: "success",
            text: "Stone Added Successfully",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/dim");
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Dim creation error:", error);
        Swal.fire({
          title: "Diamond Creation Failed",
          icon: "error",
          text: "Error Adding Stone",
        });
        setTimeout(() => {
          Swal.close();
          navigate("/dim");
          window.location.reload();
        }, 1500);
      });
  }

  return (
    <div className="container">
      <h1>Create New dim</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="my-4"
      >
        <div className="mb-3" style={{ display: "none" }}>
          <label for="dimMst_ID" className="form-label">
            dimMst_ID
          </label>
          <input
            type="text"
            id="dimMst_ID"
            name="dimMst_ID"
            value="dimMst_ID"
            placeholder="dimMst_ID"
            onChange={handleDimChange}
            className="form-control"
            readOnly
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Weight in Gm" className="form-label">
            Dim Carat
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Crt"
            placeholder="Enter Dim Carat"
            name="dim_Crt"
            value={dim.dim_Crt}
            onChange={handleDimChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Weight in dim_Pcs" className="form-label">
            dim_Pcs
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Pcs"
            placeholder="Enter dim_Pcs"
            name="dim_Pcs"
            value={dim.dim_Pcs}
            onChange={handleDimChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Weight in Gm" className="form-label">
            dim_Gm
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Gm"
            placeholder="Enter dim_Gm"
            name="dim_Gm"
            value={dim.dim_Gm}
            onChange={handleDimChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Weight in Gm" className="form-label">
            dim_Size
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Size"
            placeholder="Enter dim_Size"
            name="dim_Size"
            value={dim.dim_Size}
            onChange={handleDimChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Weight in Gm" className="form-label">
            dim_Rate
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Rate"
            placeholder="Enter dim_Rate"
            name="dim_Rate"
            value={dim.dim_Rate}
            onChange={handleDimChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Weight in dim_Amt" className="form-label">
            dim_Amt
          </label>
          <input
            type="number"
            className="form-control"
            id="dim_Amt"
            placeholder="Enter dim_Amt"
            name="dim_Amt"
            value={dim.dim_Amt}
            onChange={handleDimChange}
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

        <div className="mb-3 mt-3">
          <label for="Stone Quality">Product:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleProductChange}
            value={dim.style_Code || ""}
          >
            <option selected>Select Product</option>
            {itemDiamond.map((d) => (
              <option value={d.style_Code}>{d.product_Name}</option>
            ))}
          </select>
        </div>

        {/* hiển thị hình ảnh được chọn  */}
        <div className="mb-3 mt-3">
          <img
            src={img || "https://via.placeholder.com/150"}
            alt="Image Preview"
            style={{ marginTop: "10px", maxWidth: "100px" }}
          />
        </div>

        <div className="mb-3 mt-3">
          <label for="Stone Quality">dimQlty_ID:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleDimQualityChange}
            value={dim.dimQlty_ID || ""}
          >
            <option selected>Select Dim Quality</option>
            {dimQlty.map((dimQuality) => (
              <option value={dimQuality.dimQlty_ID}>
                {dimQuality.dimQlty}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Quality">dimSubType_ID:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleDimSubChange}
            value={dim.dimSubType_ID || ""}
          >
            <option selected>Select DimSub Quality</option>
            {dimQltySub.map((dimSub) => (
              <option value={dimSub.dimSubType_ID}>{dimSub.dimQlty}</option>
            ))}
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label for="DImInfo Quality">dimID:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleDimInfoChange}
            value={dim.dimID || ""}
          >
            <option selected>Select Info Quality</option>
            {dimInfo.map((dimInfoQuality) => (
              <option value={dimInfoQuality.dimID}>
                {dimInfoQuality.dimType}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label for="visible">Visible:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleSelectedOptionChange}
            value={selectedOption}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Create New Dim
        </button>
      </form>
    </div>
  );
};

export default AdminCreateDim;
