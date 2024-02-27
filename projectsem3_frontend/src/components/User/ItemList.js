import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import "../../asset/css/userstyle.css";
import HeroSection from "./Layout/HeroSection";
import { TailSpin } from "react-loader-spinner";
import HeroSection1 from "./Layout/HeroSection1";

function ItemList() {
  const { items, loading, error } = useData();
  const limititems = items.slice(0, 8);
  return (
    <div className="container my-2">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TailSpin color="red" radius={8} />
        </div>
      ) : (
        <>
          {error ? (
            <p className="alert alert-danger">Có lỗi xảy ra: {error.message}</p>
          ) : (
            <>
              <HeroSection />
              <HeroSection1 />
              <div className="row">
                {Array.isArray(limititems) && limititems.length > 0 ? (
                  limititems
                    .filter((item) => item.visible && item.quantity > 10)
                    .map((item) => (
                      <div key={item.prod_ID} className="col-md-3 mb-3">
                        <Link
                          to={`/item/${item.style_Code}`}
                          className="card-link"
                          style={{ textDecoration: "none" }}
                        >
                          <div className="card custom-card">
                            <img
                              src={
                                item.imagePath ||
                                "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf277c8d8/productimages/singlepackshot/593008C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"
                              }
                              className="card-img-top"
                              alt={item.product_Name}
                              height={350}
                              width={300}
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {item.product_Name}
                              </h5>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                ) : (
                  <p>No Item Found.</p>
                )}
              </div>
            </>
          )}
        </>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="https://cdn.pnj.io/images/promo/201/xuan-thantai-v2-1200X450-CTA.png"
          alt="Hình ảnh 4"
          className="img-fluid"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default ItemList;
