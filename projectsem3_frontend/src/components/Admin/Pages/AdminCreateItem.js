import React, { useState } from "react";
import { useData } from "../../../Context/DataContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminCreateItem = () => {
  const navigate = useNavigate();
  const {
    items,
    loading,
    error,
    brands,
    categories,
    certifies,
    prod,
    golds,
    jewelry,
    stoneQualities,
  } = useData();
  const [item, setItem] = useState([]);
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [prodQuality, setProdQuality] = useState("");
  const [pairs, setPairs] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [goldweight, setGoldWeight] = useState(0);
  const [stoneweight, setStoneWeight] = useState(0);
  const [wastage, setWastage] = useState(0);
  const [goldrate, setGoldRate] = useState(0);
  const [goldmaking, setGoldMaking] = useState(0);
  const [stonemaking, setStoneMaking] = useState(0);
  const [othermaking, setOtherMaking] = useState(0);
  const [styleCode, setStyleCode] = useState(null);

  function handleChangeInput(e) {
    let { name, value } = e.target;
    setStyleCode(value);
    setProductName(value);
    setProdQuality(value);
    setPairs(value);
    setQuantity(value);
    setGoldWeight(value);
    setStoneWeight(value);
    setWastage(value);
    setGoldRate(value);
    setGoldMaking(value);
    setStoneMaking(value);
    setOtherMaking(value);
    //setImagePath(e.target.files[0]);
    setItem({ ...item, [name]: value });
  }

  // Trích xuất giá trị cho các select dropdown
  const handleBrandChange = (e) => {
    setItem({ ...item, brand_ID: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setItem({ ...item, cat_ID: e.target.value });
  };

  const handleCertifyChange = (e) => {
    setItem({ ...item, certify_ID: e.target.value });
  };

  const handleProdChange = (e) => {
    setItem({ ...item, prod_ID: e.target.value });
  };

  const handleGoldTypeChange = (e) => {
    setItem({ ...item, goldType_ID: e.target.value });
  };

  const handleJewelryTypeChange = (e) => {
    setItem({ ...item, jewellery_ID: e.target.value });
  };

  const handleStoneQualityChange = (e) => {
    setItem({ ...item, stoneQlty_ID: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("style_Code", "abc");
    formData.append("product_Name", item.product_Name);
    formData.append("pairs", item.pairs);
    formData.append("quantity", item.quantity);
    formData.append("prod_Quality", item.prod_Quality);
    formData.append("gold_Wt", item.gold_Wt);
    formData.append("gold_Rate", item.gold_Rate);
    formData.append("stone_Wt", item.stone_Wt);
    formData.append("wstg", item.wstg);
    formData.append("gold_Making", item.gold_Making);
    formData.append("stone_Making", item.stone_Making);
    formData.append("other_Making", item.other_Making);
    formData.append("brand_ID", item.brand_ID);
    formData.append("cat_ID", item.cat_ID);
    formData.append("certify_ID", item.certify_ID);
    formData.append("prod_ID", item.prod_ID);
    formData.append("goldType_ID", item.goldType_ID);
    formData.append("jewellery_ID", item.jewellery_ID);
    formData.append("stoneQlty_ID", item.stoneQlty_ID);
    formData.append("file", file);

    axios
      .post("https://localhost:7241/api/ItemMst", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          //setItems((prevs) => [...prevs, res.data.data]);
          setItem([]);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Item added successfully!",
          });
          setTimeout(() => {
            Swal.close(); // Close the SweetAlert2 message
            navigate("/items");
            window.location.reload();
          }, 1000);
        } else if (res.data.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.data.message,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while adding the item",
        });
      });
  }

  return (
    <div className="container">
      <h1>Create New Item</h1>
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
            name="style_Code"
            value={"abc"}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Product Name" class="form-label">
            Product Name:
          </label>
          <input
            type="text"
            class="form-control"
            id="product_Name"
            placeholder="Enter product name"
            name="product_Name"
            value={item.product_Name}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Pairs" class="form-label">
            Pairs:
          </label>
          <input
            type="number"
            class="form-control"
            id="pairs"
            placeholder="Enter pairs"
            name="pairs"
            value={item.pairs}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Quantity" class="form-label">
            Quantity:
          </label>
          <input
            type="number"
            class="form-control"
            id="quantity"
            placeholder="Enter quantity"
            name="quantity"
            value={item.quantity}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Product Quality" class="form-label">
            Product Quality:
          </label>
          <input
            type="text"
            class="form-control"
            id="prod_Quality"
            placeholder="Enter Product Quality"
            name="prod_Quality"
            value={item.prod_Quality}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Gold Weight" class="form-label">
            Gold Weight (g):
          </label>
          <input
            type="number"
            class="form-control"
            id="gold_Wt"
            placeholder="Enter gold weight"
            name="gold_Wt"
            value={item.gold_Wt}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Gold Weight" class="form-label">
            Gold Rate:
          </label>
          <input
            type="number"
            class="form-control"
            id="gold_Rate"
            placeholder="Enter gold rate"
            name="gold_Rate"
            value={item.gold_Rate}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Stone Weight" class="form-label">
            Stone Weight (g):
          </label>
          <input
            type="number"
            class="form-control"
            id="stone_Wt"
            placeholder="Enter stone_Wt"
            name="stone_Wt"
            value={item.stone_Wt}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Wastage" class="form-label">
            Wastage (g):
          </label>
          <input
            type="number"
            class="form-control"
            id="wstg"
            placeholder="Enter Wastage"
            name="wstg"
            value={item.wstg}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="gold_Making" class="form-label">
            Gold Making Charges
          </label>
          <input
            type="number"
            class="form-control"
            id="gold_Making"
            placeholder="Enter gold making charges"
            name="gold_Making"
            value={item.gold_Making}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="stone_Making" class="form-label">
            Stone Making Charges
          </label>
          <input
            type="number"
            class="form-control"
            id="stone_Making"
            placeholder="Enter stone making charges"
            name="stone_Making"
            value={item.stone_Making}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="other_Making" class="form-label">
            Other Making Charges
          </label>
          <input
            type="number"
            class="form-control"
            id="other_Making"
            placeholder="Enter other making charges"
            name="other_Making"
            value={item.other_Making}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Brand" class="form-label">
            Brand:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleBrandChange}
            value={item.brand_ID || ""}
          >
            <option selected>Select Brand</option>
            {brands.map((brand) => (
              <option value={brand.brand_ID}>{brand.brand_Type}</option>
            ))}
          </select>
        </div>
        <div class="mb-3 mt-3">
          <label for="Category" class="form-label">
            Category:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleCategoryChange}
            value={item.cat_ID || ""}
          >
            <option selected>Select Category</option>
            {categories.map((cat) => (
              <option value={cat.cat_ID}>{cat.cat_Name}</option>
            ))}
          </select>
        </div>
        <div class="mb-3 mt-3">
          <label for="Certify" class="form-label">
            Certification:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleCertifyChange}
            value={item.certify_ID || ""}
          >
            <option selected>Select Certification</option>
            {certifies.map((cer) => (
              <option value={cer.certify_ID}>{cer.certify_Type}</option>
            ))}
          </select>
        </div>
        <div class="mb-3 mt-3">
          <label for="Certify" class="form-label">
            Product Type:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleProdChange}
            value={item.prod_ID || ""}
          >
            <option selected>Select Product Type</option>
            {prod.map((pro) => (
              <option value={pro.prod_ID}>{pro.prod_Type}</option>
            ))}
          </select>
        </div>
        <div class="mb-3 mt-3">
          <label for="Certify" class="form-label">
            Gold Type:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleGoldTypeChange}
            value={item.goldType_ID || ""}
          >
            <option selected>Select Gold Type</option>
            {golds.map((gold) => (
              <option value={gold.goldType_ID}>{gold.gold_Crt}</option>
            ))}
          </select>
        </div>
        <div class="mb-3 mt-3">
          <label for="Certify" class="form-label">
            Jewelry Type:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleJewelryTypeChange}
            value={item.jewellery_ID || ""}
          >
            <option selected>Select Jewelry Type</option>
            {jewelry.map((jewel) => (
              <option value={jewel.jewellery_ID}>{jewel.jewellery_Type}</option>
            ))}
          </select>
        </div>
        <div class="mb-3 mt-3">
          <label for="Certify" class="form-label">
            Stone Quality:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleStoneQualityChange}
            value={item.stoneQlty_ID || ""}
          >
            <option selected>Select Stone Quality</option>
            {stoneQualities.map((sq) => (
              <option value={sq.stoneQlty_ID}>{sq.stoneQlty}</option>
            ))}
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="imagePath" className="form-label">
            Image:
          </label>
          <input
            type="file"
            className="form-control-file"
            id="imagePath"
            name="imagePath"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Image Preview"
              style={{ marginTop: "10px", maxWidth: "100px" }}
            />
          )}
        </div>
        <button type="submit" class="btn btn-primary">
          Create Item
        </button>
      </form>
    </div>
  );
};

export default AdminCreateItem;
