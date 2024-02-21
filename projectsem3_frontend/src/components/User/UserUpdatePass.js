import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { use } from "i18next";
import { useTranslation } from "react-i18next";

const UserUpdatePass = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [userid, setUserid] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserid(sessionStorage.getItem("userID") || "");
    setCurrentPassword(sessionStorage.getItem("password") || "");
  }, []);

  const handleUpdateUserPass = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!oldPassword) {
      Swal.fire("Error", "Please enter old password", "error");
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    }
    const checkpassresponse = await axios.get(
      `https://localhost:7241/api/User/checkpassword/${userid}/${oldPassword}`
    );
    if (checkpassresponse.data === false) {
      setLoading(false);
      Swal.fire(t("Error"), t("Old password is incorrect"), "error");
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      setLoading(false);
      Swal.fire(
        t("Error"),
        t("Please enter both new password and confirm new password"),
        "error"
      );
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    } else if (newPassword.length < 3 || confirmNewPassword.length < 3) {
      setLoading(false);
      Swal.fire(
        t("Error"),
        t("New password and confirm new password must be at least 3 characters"),
        "error"
      );
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    } else if (newPassword.length > 20 || confirmNewPassword.length > 20) {
      setLoading(false);
      Swal.fire(
        t("Error"),
        t("New password and confirm new password must be at most 20 characters"),
        "error"
      );
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    } else if (newPassword !== confirmNewPassword) {
      setLoading(false);
      Swal.fire(
        t("Error"),
        t("New password and confirm new password must be the same"),
        "error"
      );
      setTimeout(() => {
        Swal.close();
      }, 1000);
      return;
    }

    try {
      const response = await axios.put(
        `https://localhost:7241/api/User/updatepassword/${userid}/${newPassword}`,
        {
          newPassword,
          confirmNewPassword,
        }
      );

      // Handle success response
      Swal.fire(t("Success"), t("Update Password Successfully !"), "success");
      setTimeout(() => {
        Swal.close();
        navigate("/info");
      }, 1000);
    } catch (error) {
      // Handle error response
      setLoading(false);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="container my-4">
      <h2>{t("Update Password")}</h2>
      <form id="updateUserForm" onSubmit={handleUpdateUserPass}>
        <div className="mb-3 mt-3" style={{ display: "none" }}>
          <input
            type="userid"
            className="form-control"
            id="userid"
            placeholder="Enter userid"
            name="userid"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
        </div>
        <div className="mb-3" style={{ display: "none" }}>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            placeholder={t("Enter current password")}
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="currentPassword">{t("Old Password")}:</label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            placeholder={t("Enter current password")}
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword">{t("New Password")}:</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            placeholder={t("Enter new password")}
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmNewPassword">{t("Confirm New Password")}:</label>
          <input
            type="password"
            className="form-control"
            id="confirmNewPassword"
            placeholder={t("Confirm New Password")}
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <>{t("Change Password")}</>
          )}
        </button>
      </form>
    </div>
  );
};

export default UserUpdatePass;
