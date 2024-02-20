import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "../../Context/DataContext";
import { Link } from "react-router-dom";

const UserDiamond = () => {
  const { t, i18n } = useTranslation();
  const { items, dimInfo, dim, dimQltySub, dimQlty, itemListWithDim } =
    useData();

  // Lấy số lượng diminfo
  const count = dimInfo.length;

  //lấy những item trong items mà có style_Code trùng với style_Code của dim
  const dimQltySubFilter = items.filter(
    (item) => item.style_Code === dim.style_Code
  );

  console.log(itemListWithDim);

  return (
    <div className="container">
      <div className="container my-4">
        <img
          src="https://cdn.pnj.io/images/promo/140/Adapt_banner_KC_vien_t10_1200x450.jpg"
          alt="banner"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div id="demo" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {dimInfo.map((dim, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {dimInfo
            .filter((dim) => dim.visible)
            .map((dim, index) => (
              <div
                key={index}
                className={
                  index === 0 ? "carousel-item active" : "carousel-item"
                }
                style={{ textAlign: "center", backgroundColor: "white" }}
              >
                <img
                  src={dim.dimImg}
                  alt={dim.dimSubType}
                  className="d-block w-40 img-fluid"
                  style={{
                    maxWidth: "100%",
                    height: "500px",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                />

                <h5
                  className="my-4"
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "black",
                    width: "fit-content",
                    margin: "auto",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "50px",
                    color: "white",
                  }}
                >
                  {t("Product")} {t(dim.dimType)} {t("with")} {t("shape")}{" "}
                  {t(dim.dimSubType)} {t("and")} {dim.dimCrt} carats{" "}
                  {t("was discovered in")} {dim.dimYear}
                </h5>
              </div>
            ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
      <hr />

      <h5 style={{ textAlign: "center", marginTop: "1rem" }}>
        Các Sản Phẩm Có Chất Lượng Kim Cương Liên Quan
      </h5>

      {/* hiển thị sản phẩm từ itemListWithDim */}
      <div
        className="row my-2"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {itemListWithDim.map((item, index) => (
          <div
            key={index}
            className="card mx-2 my-4"
            style={{
              width: "18rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              to={`/item/${item.style_Code}`}
              className="card-link"
              style={{ textDecoration: "none" }}
            >
              <img
                src={
                  item.imagePath ||
                  "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf277c8d8/productimages/singlepackshot/593008C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"
                }
                className="card-img-top"
                alt={item.product_Name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.product_Name}</h5>
                <a
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(`/item/${item.style_Code}`, "_blank");
                  }}
                  target="_blank"
                >
                  {t("View Details")}
                </a>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDiamond;
