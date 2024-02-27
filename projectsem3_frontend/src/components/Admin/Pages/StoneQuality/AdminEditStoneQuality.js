import React, { useEffect, useState } from "react";
import { useData } from "../../../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminEditStoneQuality = () => {
  const navigate = useNavigate();
  const { stoneQlty_ID } = useParams();
  const { stoneQualities, loading, error } = useData();

  const [stoneQuality, setStoneQuality] = useState({
    stoneQlty_ID: "",
    stoneQlty: "",
    stone_Year: 0,
    visible: true,
  });

  useEffect(() => {
    const fetchStoneQuality = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/StoneQltyMst/${stoneQlty_ID}`
        );
        const fetchedStoneQuality = response.data.data;
        setStoneQuality(fetchedStoneQuality);
        console.log(stoneQlty_ID);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchStoneQuality();
  }, [stoneQlty_ID]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setStoneQuality((prevStoneQuality) => ({
      ...prevStoneQuality,
      [name]: value,
    }));
  }

  const handleSelectedOptionChange = (e) => {
    setStoneQuality({ ...stoneQuality, visible: e.target.value === "true" });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("stoneQlty_ID", stoneQuality.stoneQlty_ID);
    formData.append("stoneQlty", stoneQuality.stoneQlty);
    formData.append("stone_Year", stoneQuality.stone_Year);
    formData.append("visible", stoneQuality.visible);

    // Kiểm tra chỉ nhập chữ cái và số dương
    if (!/^[A-Za-z\s]+$/.test(stoneQuality.stoneQlty)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Stone Quality Year should only contain letters and spaces",
      });
      return;
    }

    // Kiểm tra chỉ được nhập số dương cho stone_Year (không kiểm tra số âm và số 0)
    // if (
    //   parseInt(stoneQuality.stone_Year) <= 0 ||
    //   isNaN(parseInt(stoneQuality.stone_Year))
    // ) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Invalid Input",
    //     text: "Stone Quality Year should be a positive number",
    //   });
    //   return;
    // }
    if (
      stoneQualities.some(
        (s) =>
          s.stoneQlty === stoneQuality.stoneQlty &&
          s.stoneQlty_ID !== stoneQuality.stoneQlty_ID
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
      .put(`https://localhost:7241/api/StoneQltyMst`, formData)
      .then((res) => {
        if (res.status === 200) {
          setStoneQuality({
            stoneQlty_ID: "",
            stoneQlty: "",
            stone_Year: 0,
            visible: true,
          });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Stone quality edited successfully!",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/stone-quality");
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Stone quality edit failed!",
          });
          setTimeout(() => {
            Swal.close();
            navigate("/stone-quality");
          }, 1500);
        }
      })
      .catch((error) => {
        console.error("Error editing stone quality:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error editing stone quality!",
        });
        setTimeout(() => {
          navigate("/stone-quality");
          window.location.reload();
        }, 1500);
      });
  }

  return (
    <div className="container">
      <h1>Edit Stone Quality</h1>
      <form
        onSubmit={handleSubmit}
        className="my-4"
        encType="multipart/form-data"
      >
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <label for="Stone Quality" class="form-label">
            Stone Quality ID:
          </label>
          <input
            type="text"
            class="form-control"
            id="stoneQlty_ID"
            placeholder="Enter Gold ID"
            name="stoneQlty_ID"
            value={"stoneQlty_ID"}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Quality Name" className="form-label">
            Stone Quality Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="stoneQlty"
            placeholder="Enter Quality Name"
            name="stoneQlty"
            value={stoneQuality && stoneQuality.stoneQlty}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="Stone Quality Year" className="form-label">
            Stone Quality Year:
          </label>
          <input
            type="number"
            className="form-control"
            id="stone_Year"
            placeholder="Enter Stone Quality Year"
            name="stone_Year"
            value={stoneQuality && stoneQuality.stone_Year}
            onChange={handleInputChange}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Stone Quality Visible" class="form-label">
            Stone Quality Hidden:
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleSelectedOptionChange}
            value={stoneQuality && stoneQuality.visible}
          >
            <option selected>Visible</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          Edit Stone Quality
        </button>
      </form>
    </div>
  );
};

export default AdminEditStoneQuality;
