import React, { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useData } from "../Context/DataContext";
import { useLocation, useParams } from "react-router-dom";

const VerifyEmailSuccess = () => {
  const { userlist } = useData();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Lấy token từ đường dẫn với cấu trúc mới
        const token = location.pathname.split("/")[2]; // Lấy phần thứ 3 trong đường dẫn
        //console.log(token);
        if (!token) {
          console.error("Token không tìm thấy trong URL");
          return;
        }

        // Các bước còn lại giữ nguyên
        const decodeToken = jwtDecode(token);
        //console.log(decodeToken.userId);

        const useridstatus = decodeToken.userId;
        console.log(useridstatus);

        if (useridstatus) {
          const response = await axios.put(
            `https://localhost:7241/api/User/updatestatususer/${useridstatus}`
          );
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Chỉ gọi verifyEmail nếu đường dẫn hiện tại là verifyemailsuccess/token
    if (location.pathname.startsWith("/verifyemailsuccess/")) {
      verifyEmail();
    }
  }, [location, userlist]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">Congratulations</h1>
        <p className="fs-3">Verify Email Successfully!</p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default VerifyEmailSuccess;
