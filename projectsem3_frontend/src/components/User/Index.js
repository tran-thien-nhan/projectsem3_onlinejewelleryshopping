import React, { useEffect, useState } from "react";

function Index() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("https://localhost:7241/api/ItemMst")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.data);
                setItems(data.data); // Chú ý: Thay đổi đây để lấy mảng dữ liệu từ data.data
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy danh sách:", error);
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container-fluid my-2">
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <>
                    {error ? (
                        <p className="alert alert-danger">Có lỗi xảy ra: {error.message}</p>
                    ) : (
                        <div className="row">
                            {Array.isArray(items) && items.length > 0 ? (
                                items.map((item) => (
                                    <div key={item.prod_ID} className="col-md-4 mb-3">
                                        <div className="card">
                                            <img src={item.imagePath || "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf277c8d8/productimages/singlepackshot/593008C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"} className="card-img-top" alt={item.product_Name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.product_Name}</h5>
                                                <p className="card-text">Pairs: {item.pairs}</p>
                                                <p className="card-text">Quality: {item.prod_Quality}</p>
                                                <p className="card-text">MRP: {item.mrp}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No Item Found.</p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Index;
