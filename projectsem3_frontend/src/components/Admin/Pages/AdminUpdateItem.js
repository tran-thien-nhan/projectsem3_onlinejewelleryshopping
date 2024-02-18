import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../../Context/DataContext";
import axios from "axios";
import Swal from "sweetalert2";
import { use } from "i18next";

const AdminUpdateItem = () => {
  const navigate = useNavigate();
  const { style_Code } = useParams();
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
  const [item, setItem] = useState({
    style_Code: "",
    product_Name: "",
    prod_Quality: "",
    pairs: 0,
    quantity: 0,
    gold_Wt: 0,
    stone_Wt: 0,
    wstg: 0,
    gold_Rate: 0,
    gold_Making: 0,
    stone_Making: 0,
    other_Making: 0,
    brand_ID: "",
    cat_ID: "",
    certify_ID: "",
    prod_ID: "",
    goldType_ID: "",
    jewellery_ID: "",
    stoneQlty_ID: "",
    imagePath: "",
  });
  const [file, setFile] = useState(null);
  const [oldImage, setOldImage] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/ItemMst/getoneitem/${style_Code}`
        );
        setOldImage(response.data.data.imagePath);
        const fetchedItem = response.data.data;
        setItem(fetchedItem);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [style_Code]);

  //console.log(oldImage);

  function handleChangeInput(e) {
    const { name, value } = e.target;
    if (name === "gold_Rate") {
      if (value < 0) {
        return;
      }
    }
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  }

  // Trích xuất giá trị cho các select dropdown
  const handleBrandChange = (e) => {
    const { value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      brand_ID: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      cat_ID: value,
    }));
  };

  const handleCertifyChange = (e) => {
    const { value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      certify_ID: value,
    }));
  };

  const handleProdChange = (e) => {
    const { value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      prod_ID: value,
    }));
  };

  const handleGoldTypeChange = (e) => {
    const { value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      goldType_ID: value,
    }));
  };

  const handleJewelryTypeChange = (e) => {
    const { value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      jewellery_ID: value,
    }));
  };

  const handleStoneQualityChange = (e) => {
    const { value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      stoneQlty_ID: value,
    }));
  };

  function processImageName(imagePath) {
    const part = imagePath.split("/").slice(-1)[0].split("_");
    const name = part[part.length - 2] + part[part.length - 1];
    return name;
  }
  //console.log(processImageName(item.imagePath));

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("style_Code", item.style_Code);
    formData.append("product_Name", item.product_Name);
    formData.append("pairs", item.pairs);
    formData.append("quantity", item.quantity);
    formData.append("prod_Quality", item.prod_Quality);
    formData.append("gold_Wt", item.gold_Wt);
    formData.append("gold_Rate", item.gold_Rate * 100);
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
    //formData.append("file", file);

    //xử lý nếu trùng tên với 1 trong các sản phẩm đã có
    if (
      items.some(
        (i) =>
          file !== null &&
          i.product_Name === item.product_Name &&
          i.style_Code !== item.style_Code
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Product Name already exists!",
      });
      return;
    }

    //xử lý nếu trùng hình ảnh với 1 trong các sản phẩm đã có
    if (
      items.some(
        (i) =>
          processImageName(i.imagePath) === processImageName(item.imagePath) &&
          i.style_Code !== item.style_Code
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Image already exists!",
      });
      return;
    }

    if (file === null) {
      setFile(oldImage);
      formData.append("file", item.imagePath);
    } else {
      formData.append("file", file);
    }

    axios
      .put("https://localhost:7241/api/ItemMst", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          setItem({
            style_Code: "",
            product_Name: "",
            prod_Quality: "",
            pairs: 0,
            quantity: 0,
            gold_Wt: 0,
            stone_Wt: 0,
            wstg: 0,
            gold_Rate: 0,
            gold_Making: 0,
            stone_Making: 0,
            other_Making: 0,
            brand_ID: "",
            cat_ID: "",
            certify_ID: "",
            prod_ID: "",
            goldType_ID: "",
            jewellery_ID: "",
            stoneQlty_ID: "",
            imagePath: "",
          });
          //console.log(file);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Item Updated successfully!",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/items");
            window.location.reload();
          }, 1000);
        } else if (res.data.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error updating item!",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating item:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error updating item!",
        });
      });
  }

  return (
    <div className="container">
      <h1>Update Item</h1>
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
            value={item && item.product_Name}
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
            value={item && item.pairs}
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
            value={item && item.quantity}
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
            value={item && item.prod_Quality}
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
            value={item && item.gold_Wt}
            onChange={handleChangeInput}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Gold Weight" class="form-label">
            Gold Rate: (%)
          </label>
          <input
            type="number"
            class="form-control"
            id="gold_Rate"
            placeholder="Enter gold rate"
            name="gold_Rate"
            //value={item && item.gold_Rate * 100 >= 100 ? item.gold_Rate / 100 : item.gold_Rate}
            value={item && item.gold_Rate}
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
            value={item && item.stone_Wt}
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
            value={item && item.wstg}
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
            value={item && item.gold_Making}
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
            value={item && item.stone_Making}
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
            value={item && item.other_Making}
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
            value={item && item.brand_ID}
          >
            <option selected>Select Brand</option>
            {brands.map((b) => (
              <option key={b.brand_ID} value={b.brand_ID}>
                {b.brand_Type}
              </option>
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
            value={item && item.cat_ID}
          >
            <option selected>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.cat_ID} value={cat.cat_ID}>
                {cat.cat_Name}
              </option>
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
            value={item && item.certify_ID}
          >
            <option selected>Select Certification</option>
            {certifies.map((cer) => (
              <option key={cer.certify_ID} value={cer.certify_ID}>
                {cer.certify_Type}
              </option>
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
            value={item && item.prod_ID}
          >
            <option selected>Select Product Type</option>
            {prod.map((pro) => (
              <option key={pro.prod_ID} value={pro.prod_ID}>
                {pro.prod_Type}
              </option>
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
            value={item && item.goldType_ID}
          >
            <option selected>Select Gold Type</option>
            {golds.map((gold) => (
              <option key={gold.goldType_ID} value={gold.goldType_ID}>
                {gold.gold_Crt}
              </option>
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
            value={item && item.jewellery_ID}
          >
            <option selected>Select Jewelry Type</option>
            {jewelry.map((jewel) => (
              <option key={jewel.jewellery_ID} value={jewel.jewellery_ID}>
                {jewel.jewellery_Type}
              </option>
            ))}
          </select>
        </div>
        <div class="mb-3 mt-3">
          <label for="Certify" class="form-label">
            Stone Qualty:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleStoneQualityChange}
            value={item && item.stoneQlty_ID}
          >
            <option selected>Select Stone Quality</option>
            {stoneQualities.map((sq) => (
              <option key={sq.stoneQlty_ID} value={sq.stoneQlty_ID}>
                {sq.stoneQlty}
              </option>
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
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (!selectedFile) {
                setItem((prevItem) => ({
                  ...prevItem,
                  imagePath: oldImage,
                }));
                return;
              }
              setFile(selectedFile);
              setItem((prevItem) => ({
                ...prevItem,
                imagePath: URL.createObjectURL(selectedFile),
              }));
            }}
          />
          {item.imagePath && (
            <img
              src={item.imagePath}
              alt="Image Preview"
              style={{ marginTop: "10px", maxWidth: "100px" }}
            />
          )}
        </div>
        <button type="submit" class="btn btn-primary">
          Edit Item
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateItem;
