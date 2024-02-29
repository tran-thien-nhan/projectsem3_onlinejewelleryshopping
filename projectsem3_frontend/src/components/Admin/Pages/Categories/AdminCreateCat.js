import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../../Context/DataContext";
import axios from "axios";
import Swal from "sweetalert2";

const AdminCreateCat = () => {
  const navigate = useNavigate();
  const { categories, loading, error } = useData();

  const [cat, setCat] = useState([
    {
      cat_ID: "",
      cat_Name: "",
      visible: true,
    },
  ]);
  const [selectedOption, setSelectedOption] = useState(true);
  const [catName, setCatName] = useState("");
  const [catVisibility, setCatVisibility] = useState(true);
  const [catId, setCatId] = useState(null);

  function handleCatChange(e) {
    let { name, value } = e.target;
    setCatId(value);
    setCatName(value);
    setCatVisibility(value);
    setCat({ ...cat, [name]: value });
  }

  const handleSelectedOptionChange = (e) => {
    setSelectedOption(e.target.value === "true");
  };

  const handleCatVisibilityChange = (e) => {
    setCat({ ...cat, visible: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (parseInt(cat.cat_Name) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a positive number for Categories Name",
      });
      return;
    }
    const formData = new FormData();
    formData.append("cat_ID", "cat_ID");
    formData.append("cat_Name", cat.cat_Name);
    formData.append("visible", selectedOption.toString());

    if (
      categories.some(
        (ca) => ca.cat_Name === cat.cat_Name && ca.cat_ID !== cat.cat_ID
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Certification Type Already Exists",
      });
      return;
    }
    axios
      .post("https://localhost:7241/api/CatMst", formData)
      .then((res) => {
        if (res.status === 200) {
          setCat([]);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Categories Created Successfully",
          });
          setTimeout(() => {
            navigate("/cat");
            window.location.reload();
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Categories Created Failed",
        });
        setTimeout(() => {
          Swal.close();
          navigate("/cat");
          window.location.reload();
        }, 1500);
      });
  }

  return (
    <div className="container">
      <h1>Create New Categories</h1>
      <form
        onSubmit={handleSubmit}
        className="my-4"
        encType="multipart/form-data"
      >
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <label for="cat_ID" className="form-label">
            Categories Type ID
          </label>
          <input
            type="text"
            id="cat_ID"
            name="cat_ID"
            value={"cat_ID"}
            placeholder="Enter Categories ID"
            onChange={handleCatChange}
            className="form-control"
            readOnly
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Categories Name" class="form-label">
            Categories Name:
          </label>
          <input
            type="text"
            class="form-control"
            id="cat_Name"
            placeholder="Enter Categories Name"
            name="cat_Name"
            value={cat.cat_Name}
            onChange={handleCatChange}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Categories Visibility" class="form-label">
            Categories Hidden:
          </label>
          <select
            value={selectedOption.toString()}
            placeholder="Select Categories Visibility"
            id="visible"
            name="visible"
            class="form-select"
            aria-label="Default select example"
            onChange={handleSelectedOptionChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Create New Categories
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCat;
