import React, { useState } from "react";
import { useData } from "../../../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const AdminCreateStone = () => {
  const navigate = useNavigate();
  const { stones, stoneQualities, loading, error } = useData();

  const [stone, setStone] = useState([]);
  const [selectedOption, setSelectedOption] = useState(true);
  const [stoneGm, setStoneGm] = useState(0);
  const [stonePcs, setStonePcs] = useState(0);
  const [stoneCrt, setStoneCrt] = useState(0);
  const [stoneRate, setStoneRate] = useState(0);
  //const [stoneAmt, setStoneAmt] = useState(0);
  const [stoneVisibility, setStoneVisibility] = useState(true);

  function handleStoneChange(e) {
    let { name, value } = e.target;
    setStoneGm(value);
    setStonePcs(value);
    setStoneCrt(value);
    setStoneRate(value);
    //setStoneAmt(value);
    setStoneVisibility(value);
    setStone({ ...stone, [name]: value });
  }

  const handleSelectedOptionChange = (e) => {
    setSelectedOption(e.target.value === "true");
  };

  const handleStoneQualityChange = (e) => {
    setStone({ ...stone, stoneQlty_ID: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("stone_ID", "stone_ID");
    formData.append("stoneQlty_ID", stone.stoneQlty_ID);
    formData.append("stone_Gm", stone.stone_Gm);
    formData.append("stone_Pcs", stone.stone_Pcs);
    formData.append("stone_Crt", stone.stone_Crt);
    formData.append("stone_Rate", stone.stone_Rate);
    //formData.append("stone_Amt", stone.stone_Amt);
    formData.append("visible", selectedOption.toString());

    // Kiểm tra stone_Gm là số dương
    if (stone.stone_Gm <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a positive number for Stone Weight in Gm",
      });
      return;
    }

    // Kiểm tra stone_Pcs là số dương
    if (stone.stone_Pcs <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a positive number for Total Stone Per Pieces",
      });
      return;
    }

    // Kiểm tra stone_Crt là số dương
    if (stone.stone_Crt <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a positive number for Carat Per Stone",
      });
      return;
    }

    // Kiểm tra stone_Rate là số dương
    if (stone.stone_Rate <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a positive number for Stone Rate",
      });
      return;
    }
    //xử lý trùng lặp stone_Gm
    if (
      stones.some(
        (s) =>
          s.stoneQlty_ID === stone.stoneQlty_ID && s.stone_ID !== stone.stone_ID
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Stone Weight Already Exists",
      });
      return;
    }

    axios
      .post("https://localhost:7241/api/StoneMst", formData)
      .then((res) => {
        if (res.status === 200) {
          setStone([]);
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Stone Added Successfully",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/stones");
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Error Adding Stone:", error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Adding Stone",
        });
        setTimeout(() => {
          Swal.close();
          navigate("/stones");
          window.location.reload();
        }, 1500);
      });
  }

  return (
    <div className="container">
      <h1>Create New Stone</h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="my-4"
      >
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <label for="style_Code" className="form-label">
            Stone ID
          </label>
          <input
            type="text"
            id="stone_ID"
            name="stone_ID"
            value={"stone_ID"}
            placeholder="Stone ID"
            onChange={handleStoneChange}
            className="form-control"
            readOnly
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Weight in Gm" className="form-label">
            Stone Weight in Gm
          </label>
          <input
            type="number"
            className="form-control"
            id="stone_Gm"
            placeholder="Enter Stone Weight in Gm"
            name="stone_Gm"
            value={stone.stone_Gm}
            onChange={handleStoneChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Total Stone Per Pieces" className="form-label">
            Total Stone Per Pieces
          </label>
          <input
            type="number"
            className="form-control"
            id="stone_Pcs"
            placeholder="Enter Total Stone Per Pieces"
            name="stone_Pcs"
            value={stone.stone_Pcs}
            onChange={handleStoneChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Carat Per Stone" className="form-label">
            Carat Per Stone
          </label>
          <input
            type="number"
            className="form-control"
            id="stone_Crt"
            placeholder="Enter Carat Per Stone"
            name="stone_Crt"
            value={stone.stone_Crt}
            onChange={handleStoneChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Categories" className="form-label">
            Stone Rate:
          </label>
          <input
            type="number"
            className="form-control"
            id="stone_Rate"
            placeholder="Enter Stone Rate"
            name="stone_Rate"
            value={stone.stone_Rate}
            onChange={handleStoneChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Quality">Stone Quality:</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleStoneQualityChange}
            value={stone.stoneQlty_ID || ""}
          >
            <option selected>Select Stone Quality</option>
            {stoneQualities.map((stoneQuality) => (
              <option value={stoneQuality.stoneQlty_ID}>
                {stoneQuality.stoneQlty}
              </option>
            ))}
          </select>
        </div>
        <div class="mb-3 mt-3">
          <label for="Stone Hidden" class="form-label">
            Stone Hidden:
          </label>
          <select
            value={selectedOption.toString()}
            placeholder="Select Stone Visibility"
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
          Create New Stone
        </button>
      </form>
    </div>
  );
};

export default AdminCreateStone;
