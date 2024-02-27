import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useData } from "../../../../Context/DataContext";
import axios from "axios";
import Swal from "sweetalert2";

const AdminEditGold = () => {
  const navigate = useNavigate();
  const { goldType_ID } = useParams();
  const { golds, loading, error } = useData();

  const [gold, setGold] = useState({
    goldType_ID: "",
    gold_Crt: "",
    gold_Year: 0,
    visible: true,
  });

  useEffect(() => {
    const fetchGold = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/GoldKrtMst/getonegoldkrt/${goldType_ID}`
        );
        const fetchedGold = response.data.data;
        setGold(fetchedGold);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchGold();
  }, [goldType_ID]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setGold((prevGold) => ({
      ...prevGold,
      [name]: value,
    }));
  }

  const handleSelectedOptionChange = (e) => {
    setGold({ ...gold, visible: e.target.value === "true" });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("goldType_ID", gold.goldType_ID);
    formData.append("gold_Crt", gold.gold_Crt);
    formData.append("gold_Year", gold.gold_Year);
    formData.append("visible", gold.visible);

    if (!/^[A-Za-z\s\d]+$/.test(gold.gold_Crt)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Gold Carat should only contain letters, spaces, and 'k'",
      });
      return;
    }

    // Kiểm tra chỉ được nhập số dương cho gold_Year (không kiểm tra số âm)
    if (parseInt(gold.gold_Year) < 0 || isNaN(parseInt(gold.gold_Year))) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Gold Year should be a non-negative number",
      });
      return;
    }
    if (
      golds.some(
        (g) =>
          g.gold_Crt === gold.gold_Crt && g.goldType_ID !== gold.goldType_ID
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gold already exists!",
      });
      return;
    }

    axios
      .put(`https://localhost:7241/api/GoldKrtMst`, formData)
      .then((res) => {
        if (res.status === 200) {
          setGold({
            goldType_ID: "",
            gold_Crt: "",
            gold_Year: 0,
            visible: true,
          });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Gold Updated Successfully",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/gold_krt");
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Gold Updated Failed",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/gold_krt");
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Error updating Gold:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error updating Gold!",
        });
        setTimeout(() => {
          navigate("/gold_krt");
          window.location.reload();
        }, 1500);
      });
  }

  return (
    <div className="container">
      <h1>Edit Gold</h1>
      <form
        onSubmit={handleSubmit}
        className="my-4"
        encType="multipart/form-data"
      >
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <label for="Gold" class="form-label">
            Gold ID:
          </label>
          <input
            type="text"
            class="form-control"
            id="goldType_ID"
            placeholder="Enter Gold ID"
            name="goldType_ID"
            value={"goldType_ID"}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Gold Carat" className="form-label">
            Gold Carat:
          </label>
          <input
            type="text"
            className="form-control"
            id="gold_Crt"
            placeholder="Enter Gold Crt"
            name="gold_Crt"
            value={gold && gold.gold_Crt}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Gold Year" className="form-label">
            Gold Year:
          </label>
          <input
            type="number"
            className="form-control"
            id="gold_Year"
            placeholder="Enter Gold Year"
            name="gold_Year"
            value={gold && gold.gold_Year}
            onChange={handleInputChange}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Gold Visible" class="form-label">
            Gold Hidden:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleSelectedOptionChange}
            value={gold && gold.visible}
          >
            <option selected>Visible</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Edit Gold
        </button>
      </form>
    </div>
  );
};

export default AdminEditGold;
