import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminUserDetail = () => {
  const { userID } = useParams();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7241/api/User/getuserbyid/${userID}`
        );
        console.log(response.data);

        if (response.data && response.data.status === 200) {
          setUserDetails(response.data.data);
        } else {
          console.error("Invalid response or status code:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userID]);

  return (
    <div className="container-fluid">
      <h2>User Details</h2>
      <div className="site-blocks-table">
        <table className="table">   
          <thead>
            <tr>
              <th className="">User ID</th>
              <th className="">Username</th>
              <th className="">Name</th>
              <th className="">Email</th>
              <th className="">Mob No</th>
              <th className="">DOB</th>
              <th className="">CDate</th>
              <th className="">City</th>
              <th className="">Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {userDetails && Object.keys(userDetails).length > 0 ? (
              <tr key={userDetails.userID}>
                <td>{userDetails.userID}</td>
                <td>{userDetails.userName}</td>
                <td>{userDetails.userFname} {userDetails.userLname}</td>
                <td>{userDetails.emailID}</td>
                <td>{userDetails.mobNo}</td>
                <td>{new Date(userDetails.dob).toLocaleString()}</td>
                <td>{new Date(userDetails.cDate).toLocaleString()}</td>
                <td>{userDetails.city}</td>
                <td>{new Date(userDetails.createdAt).toLocaleString()}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5">No user details found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserDetail;
