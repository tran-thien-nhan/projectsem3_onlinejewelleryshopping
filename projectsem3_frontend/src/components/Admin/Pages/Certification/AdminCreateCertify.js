import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../../Context/DataContext";
import axios from "axios";
import Swal from "sweetalert2";

const AdminCreateCertify = () => {
  const navigate = useNavigate();
  const { certifies, loading, error } = useData();

  const [certify, setCertify] = useState([
    {
      certify_ID: "",
      certify_Type: "",
      visible: true,
    },
  ]);
  const [selectedOption, setSelectedOption] = useState(true);
  const [certifyType, setCertifyType] = useState("");
  const [certifyVisibility, setCertifyVisibility] = useState(true);
  const [certifyId, setCertifyId] = useState(null);

  function handleCertifyChange(e) {
    let { name, value } = e.target;
    setCertifyId(value);
    setCertifyType(value);
    setCertifyVisibility(value);
    setCertify({ ...certify, [name]: value });
  }

  const handleSelectedOptionChange = (e) => {
    setSelectedOption(e.target.value === "true");
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Kiểm tra xem certify_Type chỉ chứa chữ cái và số dương hay không
    if (!/^[a-zA-Z0-9]+$/.test(certify.certify_Type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter only letters and positive numbers for Certification Name",
      });
      return;
    }

    // Kiểm tra certify_Type không phải là số dương
    if (parseInt(certify.certify_Type) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a positive number for Certification Name",
      });
      return;
    }
    const formData = new FormData();
    formData.append("certify_ID", "certify_ID");
    formData.append("certify_Type", certify.certify_Type);
    formData.append("visible", selectedOption.toString());

    if (
      certifies.some(
        (c) =>
          c.certify_Type === certify.certify_Type &&
          c.certify_ID !== certify.certify_ID
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
      .post("https://localhost:7241/api/CertifyMst", formData)
      .then((res) => {
        if (res.status === 200) {
          setCertify([]);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Certification Created Successfully",
          });
          setTimeout(() => {
            navigate("/certify");
            window.location.reload();
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Certification Created Failed",
        });
        setTimeout(() => {
          Swal.close();
          navigate("/certify");
        }, 1500);
      });
  }
  return (
    <div className="container">
      <h1>Create New Certification</h1>
      <form
        onSubmit={handleSubmit}
        className="my-4"
        encType="multipart/form-data"
      >
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <label for="certify_ID" className="form-label">
            Certification ID
          </label>
          <input
            type="text"
            id="certify_ID"
            name="certify_ID"
            value={"certify_ID"}
            placeholder="Enter Certification ID"
            onChange={handleCertifyChange}
            className="form-control"
            readOnly
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Certification Name" class="form-label">
            Certification Name:
          </label>
          <input
            type="text"
            class="form-control"
            id="certify_Type"
            placeholder="Enter Certification Name"
            name="certify_Type"
            value={certify.certify_Type}
            onChange={handleCertifyChange}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="Certification Visibility" class="form-label">
            Certification Hidden:
          </label>
          <select
            value={selectedOption.toString()}
            placeholder="Select Certification Visibility"
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
          Create New Certification
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCertify;
