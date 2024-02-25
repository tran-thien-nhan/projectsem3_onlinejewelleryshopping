import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from "react-loader-spinner";

const MovingToAdmin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const delay = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await window.location.reload();
            //await navigate("/admin");
            await navigate("/admin");
        };
        delay();
    }, [])
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <TailSpin color="red" radius={8} />
        </div>
    );
};

export default MovingToAdmin;