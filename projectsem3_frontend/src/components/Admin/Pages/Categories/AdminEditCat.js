import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useData } from "../../../../Context/DataContext";
import axios from "axios";
import Swal from "sweetalert2";

const AdminEditCat = () => {
  const navigate = useNavigate();
  const { cat_ID } = useParams();
  const { categories, loading, error } = useData();

  const [cat, setCat] = useState({
    cat_ID: "",
    cat_Name: "",
    visible: true,
  });

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/CatMst/getonecategory/${cat_ID}`
        );
        const fetchedCat = response.data.data;
        setCat(fetchedCat);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchCat();
  }, [cat_ID]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setCat((prevCat) => ({
      ...prevCat,
      [name]: value,
    }));
  }

  const handleSelectedOptionChange = (e) => {
    setCat({ ...cat, visible: e.target.value === "true" });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cat_ID", cat.cat_ID);
    formData.append("cat_Name", cat.cat_Name);
    formData.append("visible", cat.visible);

    // Kiểm tra chỉ nhập chữ cái và số dương
    if (!/^[A-Za-z\s]+$/.test(cat.cat_Name)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Category Name should only contain letters and spaces",
      });
      return;
    }

    // Kiểm tra chỉ được nhập số dương cho cat_ID (không kiểm tra số âm và số 0)
    if (parseInt(cat.cat_ID) <= 0 || isNaN(parseInt(cat.cat_ID))) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Category ID should be a positive number",
      });
      return;
    }
    if (
      categories.some(
        (c) => c.cat_Name === cat.cat_Name && c.cat_ID !== cat.cat_ID
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Category name already exists!",
      });
      return;
    }

    axios
      .put(`https://localhost:7241/api/CatMst`, formData)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setCat({
            cat_ID: "",
            cat_Name: "",
            visible: true,
          });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Category updated successfully!",
          });
          setTimeout(() => {
            navigate("/cat");
            window.location.reload();
          }, 1500);
        } else if (response.data.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error updating category!",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error updating category!",
        });
      });
  }

  return (
    <div>
      <div className="container">
        <h1>Update Item</h1>
        <form
          onSubmit={handleSubmit}
          className="my-4"
          encType="multipart/form-data"
        >
          <div className="mb-3 mt-3" style={{ display: "none" }}>
            <label for="Categories" class="form-label">
              Category ID
            </label>
            <input
              type="text"
              class="form-control"
              id="cat_ID"
              placeholder="Enter Category ID"
              name="cat_ID"
              value={"category_ID"}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="mb-3 mt-3">
            <label for="Categories" className="form-label">
              Category Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="cat_Name"
              placeholder="Enter Category Name"
              name="cat_Name"
              value={cat && cat.cat_Name}
              onChange={handleInputChange}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="Categories Visible" class="form-label">
              Categories Hidden:
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={handleSelectedOptionChange}
              value={cat && cat.visible}
            >
              <option selected>Visible</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">
            Edit Categories
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditCat;
