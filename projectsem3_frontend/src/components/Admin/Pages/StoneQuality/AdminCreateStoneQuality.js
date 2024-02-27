import React, { useState } from "react";
import { useData } from "../../../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminCreateStoneQuality = () => {
  const navigate = useNavigate();
  const { stoneQualities, loading, error } = useData();

  const [stoneQuality, setStoneQuality] = useState([
    {
      stoneQlty_ID: "",
      stoneQlty: "",
      stone_Year: 0,
      visible: true,
    },
  ]);

  const [selectedOption, setSelectedOption] = useState(true);
  const [stoneQlty, setStoneQlty] = useState("");
  const [stoneYear, setStoneYear] = useState(0);
  const [stoneVisibility, setStoneVisibility] = useState(true);
  const [stoneQlty_ID, setStoneQlty_ID] = useState(null);

  function handleStoneQualityChange(e) {
    let { name, value } = e.target;
    setStoneQlty_ID(value);
    //setStoneQlty(value);
    setStoneYear(value);
    setStoneVisibility(value);

    setStoneQuality({ ...stoneQuality, [name]: value });
    console.log(e.target.name, e.target.value);
  }

  const handleStoneQualityNameChange = (e) => {
    setStoneQlty(e.target.value);
  };

  const handleSelectedOptionChange = (e) => {
    setSelectedOption(e.target.value === "true");
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("stoneQlty_ID", "stoneQlty_ID");
    formData.append("stoneQlty", stoneQlty.toString());
    formData.append("stone_Year", stoneQuality.stone_Year);
    formData.append("visible", selectedOption.toString());

    // Kiểm tra stone_Qlty chỉ chứa chữ cái
    if (!/^[A-Za-z\s]+$/.test(stoneQlty)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Stone Quality Name should only contain letters",
      });
      return;
    }

    // Kiểm tra stone_Year là số dương
    if (stoneQuality.stone_Year <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a positive number for Stone Quality Year",
      });
      return;
    }
    //xử lý trùng lặp stoneQlty
    if (
      stoneQualities.some(
        (i) =>
          i.stoneQlty === stoneQuality.stoneQlty &&
          i.stoneQlty_ID !== stoneQuality.stoneQlty_ID
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Stone Quality Already Exists",
      });
      return;
    }
    axios
      .post("https://localhost:7241/api/StoneQltyMst", formData)
      .then((res) => {
        if (res.status === 200) {
          setStoneQuality([]);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Stone Quality Created Successfully",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/stone-quality");
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Stone Quality Created Failed",
        });
        setTimeout(() => {
          Swal.close();
          navigate("/stone-quality");
        }, 1500);
      });
  }

  return (
    <div className="container">
      <h1>Create New Stone Quality</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="my-4"
      >
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <label for="stoneQlty_ID" className="form-label">
            Stone Quality ID
          </label>
          <input
            type="text"
            id="stoneQlty_ID"
            name="stoneQlty_ID"
            value={"stoneQlty_ID"}
            placeholder="Enter Stone Quality ID"
            onChange={handleStoneQualityChange}
            className="form-control"
            readOnly
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Stone Quality Name" class="form-label">
            Stone Quality Name:
          </label>
          <input
            type="text"
            class="form-control"
            id="stone_Qlty"
            placeholder="Enter Stone Quality Name"
            name="stone_Qlty"
            value={stoneQlty.toString()}
            onChange={handleStoneQualityNameChange}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Stone Quality Year" class="form-label">
            Stone Quality Year:
          </label>
          <input
            type="number"
            class="form-control"
            id="stone_Year"
            placeholder="Enter Stone Quality Year"
            name="stone_Year"
            value={stoneQuality.stone_Year}
            onChange={handleStoneQualityChange}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Stone Quality Visibility" class="form-label">
            Stone Quality Hidden:
          </label>
          <select
            value={selectedOption.toString()}
            placeholder="Select Stone Quality Visibility"
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
          Create New Stone Quality
        </button>
      </form>
    </div>
  );
};

export default AdminCreateStoneQuality;
