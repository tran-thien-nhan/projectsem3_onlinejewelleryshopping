import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminEditDimQlty = () => {
  const { id } = useParams();
  const [dimQlty, setDimQlty] = useState({
    dimQlty_ID: "",
    dimQlty: "",
    visible: true,
  });

  useEffect(() => {
    const fetchDimQlty = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/DimQltyMst/getonedimqlty/${id}`
        );
        const fetchedDimQlty = response.data.data;
        if (fetchedDimQlty) {
          setDimQlty(fetchedDimQlty);
        }
      } catch (error) {
        console.error("Error fetching DimQlty:", error);
      }
    };

    fetchDimQlty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDimQlty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem trường "DimQlty" có rỗng không
    if (!dimQlty.dimQlty.trim()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "DimQlty is required.",
      });
      return;
    }

    // Kiểm tra chỉ nhập chữ cái và số dương
    if (!/^[A-Za-z]+$/.test(dimQlty.dimQlty)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "DimQlty should only contain letters.",
      });
      return;
    }

    try {
      // Kiểm tra trùng lặp tên DimQlty trước khi gửi yêu cầu PUT
      const response = await axios.get("https://localhost:7241/api/DimQltyMst");
      const existingDimQltys = response.data.data;
      const isDuplicate = existingDimQltys.some(
        (d) =>
          d.dimQlty === dimQlty.dimQlty && d.dimQlty_ID !== dimQlty.dimQlty_ID
      );
      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "DimQlty name already exists!",
        });
        return;
      }

      await axios.put(`https://localhost:7241/api/DimQltyMst/${id}`, dimQlty);
      setDimQlty({
        // Reset dimQlty state to clear old data
        dimQlty_ID: "",
        dimQlty: "",
        visible: true,
      });
      window.location.href = "/dimQlty";
    } catch (error) {
      console.error("Error updating DimQlty:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit DimQlty</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dimQlty" className="form-label">
            DimQlty
          </label>
          <input
            type="text"
            className="form-control"
            id="dimQlty"
            name="dimQlty"
            value={dimQlty.dimQlty || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Edit DimQlty
        </button>
      </form>
    </div>
  );
};

export default AdminEditDimQlty;
