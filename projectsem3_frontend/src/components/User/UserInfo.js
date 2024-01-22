import React from 'react';

const UserInfo = () => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{sessionStorage.getItem("fname")} {sessionStorage.getItem("lname")}</h5>
                    <p className="card-text">Email: {sessionStorage.getItem("email")}</p>
                    <p className="card-text">Address: {sessionStorage.getItem("address")}</p>
                    <p className="card-text">City: {sessionStorage.getItem("city")}</p>
                    <p className="card-text">Mobile Number: {sessionStorage.getItem("mobNo")}</p>
                    <p className="card-text">Date of Birth: {formatDate(sessionStorage.getItem("dob"))}</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
