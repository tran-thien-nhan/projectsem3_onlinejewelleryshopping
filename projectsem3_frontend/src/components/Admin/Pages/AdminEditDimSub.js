import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminEditDimSub = () => {
  const { id } = useParams();
  const [dimQltySub, setDimQltySub] = useState({
    dimSubType_ID: "",
    dimQlty: "",
    visible: true,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDimQltySub = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/DimQltySubMst/${id}`
        );
        setDimQltySub(response.data.data);
      } catch (error) {
        console.error("Error fetching dimQltySub:", error);
      }
    };

    fetchDimQltySub();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDimQltySub((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Xóa thông báo lỗi khi người dùng thay đổi giá trị input
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu dimQlty không phải là chữ cái và số dương
    if (
      !/^[a-zA-Z\d]*$/g.test(dimQltySub.dimQlty) ||
      parseFloat(dimQltySub.dimQlty) <= 0
    ) {
      setError("DimQlty must be a non-negative number");
      return;
    }

    try {
      // Kiểm tra trùng lặp tên DimQlty trước khi gửi yêu cầu PUT
      const response = await axios.get(
        "https://localhost:7241/api/DimQltySubMst"
      );
      const existingDimQltys = response.data.data;
      const isDuplicate = existingDimQltys.some(
        (d) =>
          d.dimQlty === dimQltySub.dimQlty &&
          d.dimSubType_ID !== dimQltySub.dimSubType_ID
      );
      if (isDuplicate) {
        setError("DimQlty already exists.");
        return;
      }

      await axios.put(
        `https://localhost:7241/api/DimQltySubMst/${id}`,
        dimQltySub
      ); // Sửa thành phương thức PUT
      window.location.href = "/dimQltySub";
    } catch (error) {
      console.error("Error updating dimQltySub:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit DimQltySub</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="dimQlty" className="form-label">
            DimQlty
          </label>
          <input
            type="text"
            className={`form-control ${error && "is-invalid"}`} // Thêm class 'is-invalid' khi có lỗi
            id="dimQlty"
            name="dimQlty"
            value={dimQltySub.dimQlty}
            onChange={handleChange}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}{" "}
          {/* Hiển thị thông báo lỗi */}
        </div>
        <button type="submit" className="btn btn-primary">
          Update DimQltySub
        </button>
      </form>
    </div>
  );
};

export default AdminEditDimSub;
