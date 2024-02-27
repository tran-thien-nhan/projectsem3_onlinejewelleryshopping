import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminEditProd = () => {
  const { id } = useParams();
  const [prod, setProd] = useState({
    prod_ID: "",
    prod_Type: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProd = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/ProdMst/getonepro/${id}`
        );
        setProd(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProd();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProd((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Xóa thông báo lỗi khi người dùng thay đổi giá trị input
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra trùng lặp tên Prod_Type trước khi gửi yêu cầu PUT
    try {
      const response = await axios.get("https://localhost:7241/api/ProdMst");
      const existingProds = response.data.data;
      const isDuplicate = existingProds.some(
        (p) => p.prod_Type === prod.prod_Type && p.prod_ID !== prod.prod_ID
      );
      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Product Type already exists!",
        });
        return;
      }

      // Kiểm tra nếu prod_Type không phải là chữ cái và số dương
      if (
        !/^[a-zA-Z\d]*$/g.test(prod.prod_Type) ||
        parseFloat(prod.prod_Type) <= 0
      ) {
        setError("Product Type must be a non-negative number or a string.");
        return;
      }

      await axios.put(`https://localhost:7241/api/ProdMst/${id}`, prod);
      window.location.href = "/prod";
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="prod_Type" className="form-label">
            Product Type
          </label>
          <input
            type="text"
            className={`form-control ${error && "is-invalid"}`} // Thêm class 'is-invalid' khi có lỗi
            id="prod_Type"
            name="prod_Type"
            value={prod.prod_Type}
            onChange={handleChange}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}{" "}
          {/* Hiển thị thông báo lỗi */}
        </div>
        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminEditProd;
