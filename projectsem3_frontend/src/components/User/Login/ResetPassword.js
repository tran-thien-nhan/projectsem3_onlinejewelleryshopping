import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { use } from "i18next";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t, i18n } = useTranslation();
  const [password, setPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetLinkExpired, setResetLinkExpired] = useState(false);
  const [expireTime, setExpireTime] = useState("");
  const [expir, setExpir] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if(resetLinkExpired) {
      Swal.fire(t("Error"), t("Link has expired. Please request a new reset link."), "error");
    }
  }, [resetLinkExpired]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    // Lấy token từ đường dẫn với cấu trúc mới
    const token = location.pathname.split("/")[2]; // Lấy phần thứ 3 trong đường dẫn

    if (!token) {
      console.error("Token không tìm thấy trong URL");
      return;
    }

    if (resetSuccess === true && Date.now() > expirationTime) {
      Swal.fire(
        t("Error"),
        t("Link has expired. Please request a new reset link."),
        "error"
      );
      return;
    }

    const decodeToken = jwtDecode(token);
    const useridreset = decodeToken.userid;

    const expirationTime = parseInt(decodeToken.exp) * 1000;
    setExpir(decodeToken.exp)
    setExpireTime(expirationTime);
    // Kiểm tra nếu thời gian hiện tại vượt quá thời gian hết hạn
    
    if (Date.now() > expirationTime) {
      setResetLinkExpired(true);
      console.log("Đã quá thời gian quy định");
      return;
    } else {
      console.log("Vẫn trong thời gian quy định");
    }

    // Kiểm tra mật khẩu theo yêu cầu: ít nhất một chữ cái viết hoa, một số, và một ký tự đặc biệt
    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // if (!passwordRegex.test(password)) {
    //     Swal.fire("Error", "Password must contain at least one uppercase letter, one number, and one special character.", "error");
    //     return;
    // }

    if (password === confirmPassword) {
      try {
        setIsLoading(true);
        const response = await axios.put(
          `https://localhost:7241/api/User/resetpassword/${useridreset}/${password}`,
          { newPassword: password }
        );

        // Kiểm tra trạng thái của response
        if (response.status === 200) {
          setResetSuccess(true);
          Swal.fire(t("Success"), t("Password reset successful"), "success");
          console.log(resetSuccess);
        } else if (resetSuccess === true) {
          Swal.fire(t("Error"), t("Failed to reset password"), "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire(t("Error"), t("An error occurred"), "error");
      } finally {
        setIsLoading(false);
      }
    } else {
      Swal.fire(t("Error"), t("Passwords do not match"), "error");
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="mt-4">{t("Reset Password")}</h2>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control my-4"
                  placeholder={t("New Password")}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control my-4"
                  placeholder={t("Confirm Password")}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <button className="btn btn-primary" onClick={handleResetPassword}>
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>{t("Reset Password")}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
