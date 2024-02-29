import React, { useState } from "react";
import { useData } from "../../../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const AdminCreateGold = () => {
  const navigate = useNavigate();
  const { golds, loading, error } = useData();

  const [gold, setGold] = useState([
    {
      goldType_ID: "",
      gold_Crt: "",
      gold_Year: 0,
      visible: true,
    },
  ]);

  const [selectedOption, setSelectedOption] = useState(true);
  const [goldCrt, setGoldCrt] = useState("");
  const [goldYear, setGoldYear] = useState(0);
  const [goldVisibility, setGoldVisibility] = useState(true);
  const [goldTypeID, setGoldTypeID] = useState(null);

  function handleGoldChange(e) {
    let { name, value } = e.target;
    setGoldTypeID(value);
    setGoldCrt(value);
    setGoldYear(value);
    setGoldVisibility(value);
    setGold({ ...gold, [name]: value });
  }

  const handleSelectedOptionChange = (e) => {
    setSelectedOption(e.target.value === "true");
  };

  // const handleGoldVisibilityChange = (e) => {
  //     setGold({ ...gold, visible: e.target.value });
  // };

  function handleSubmit(e) {
    e.preventDefault();
    // Kiểm tra xem gold_Crt chỉ chứa chữ cái và số dương hay không
    if (!/^[a-zA-Z0-9]+$/.test(gold.gold_Crt)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter only letters and positive numbers for Gold Crt",
      });
      return;
    }

    // Kiểm tra gold_Crt không phải là số dương
    if (parseInt(gold.gold_Crt) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a positive number for Gold Crt",
      });
      return;
    }
    const currentYear = new Date().getFullYear();
    if (
      gold.gold_Year <= 0 ||
      isNaN(gold.gold_Year) ||
      gold.gold_Year > currentYear
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a valid year.",
      });
      return;
    }
    const formData = new FormData();
    formData.append("goldType_ID", "goldType_ID");
    formData.append("gold_Crt", gold.gold_Crt);
    formData.append("gold_Year", gold.gold_Year);
    formData.append("visible", selectedOption.toString());

    //xử lý trùng lặp gold_Crt
    if (
      golds.some(
        (i) =>
          i.gold_Crt === gold.gold_Crt && i.goldType_ID !== gold.goldType_ID
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gold Carat Already Exists",
      });
      return;
    }

    axios
      .post("https://localhost:7241/api/GoldKrtMst", formData)
      .then((res) => {
        if (res.status === 200) {
          setGold([]);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Gold Created Successfully",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/gold_krt");
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gold Creation Failed",
        });
        setTimeout(() => {
          Swal.close();
          navigate("/gold_krt");
        }, 1000);
      });
  }
  return (
    <div className="container">
      <h1>Create New Gold</h1>
      <form
        onSubmit={handleSubmit}
        className="my-4"
        encType="multipart/form-data"
      >
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <label for="goldType_ID" className="form-label">
            Gold Type ID
          </label>
          <input
            type="text"
            id="goldType_ID"
            name="goldType_ID"
            value={"goldType_ID"}
            placeholder="Enter Gold ID"
            onChange={handleGoldChange}
            className="form-control"
            readOnly
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Gold Crt" class="form-label">
            Gold Crt:
          </label>
          <input
            type="text"
            class="form-control"
            id="gold_Crt"
            placeholder="Enter Gold year"
            name="gold_Crt"
            value={gold.gold_Crt}
            onChange={handleGoldChange}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Product Name" class="form-label">
            Gold Year:
          </label>
          <input
            type="number"
            class="form-control"
            id="gold_Year"
            placeholder="Enter Gold year"
            name="gold_Year"
            value={gold.gold_Year}
            onChange={handleGoldChange}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Gold Visibility" class="form-label">
            Gold Hidden:
          </label>
          <select
            value={selectedOption.toString()}
            placeholder="Select Gold_Krt Visibility"
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
          Create New Gold
        </button>
      </form>
    </div>
  );
};

export default AdminCreateGold;
