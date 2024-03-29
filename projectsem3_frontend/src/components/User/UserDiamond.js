import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "../../Context/DataContext";
import { Link } from "react-router-dom";

const UserDiamond = () => {
  const { t, i18n } = useTranslation();
  const { items, dimInfo, dim, dimQltySub, dimQlty, itemListWithDim } =
    useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [filterItemDimQltySubMst, setFilterItemDimQltySubMst] = useState("All");
  const [filterItemDimQltyMst, setFilterItemDimQltyMst] = useState("All");
  const [filterItemDimTypeDimInfoMst, setFilterItemDimTypeDimInfoMst] =
    useState("All");
  const [filterItemDimSubTypeDimInfoMst, setFilterItemDimSubTypeDimInfoMst] =
    useState("All");
  const [minDimCrt, setMinDimCrt] = useState("");
  const [maxDimCrt, setMaxDimCrt] = useState("");

  // Lấy số lượng diminfo
  const count = dimInfo.length;

  //lấy những item trong items mà có style_Code trùng với style_Code của dim
  const dimQltySubFilter = items.filter(
    (item) => item.style_Code === dim.style_Code
  );

  console.log(itemListWithDim);
  //console.log(items);

  const itemsDiamond = itemListWithDim.filter(
    (item) =>
      item.style_Code !== null &&
      item.visible &&
      item.dimMsts.dimMst_ID !== null &&
      item.dimMsts.visible
  );
  //console.log(itemsDiamond);

  useEffect(() => {
    const results = itemsDiamond.map((item) => item.product_Name);
    setSearchSuggestions(results);
  }, [itemsDiamond]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterItemDimQltySubMst(e.target.value);
  };

  const handleFilterChangeDimQltyMst = (e) => {
    setFilterItemDimQltyMst(e.target.value);
  };

  const handleFilterChangeDimTypeDimInfoMst = (e) => {
    setFilterItemDimTypeDimInfoMst(e.target.value);
  };

  const handleFilterChangeDimSubTypeDimInfoMst = (e) => {
    setFilterItemDimSubTypeDimInfoMst(e.target.value);
  };

  const filteredItems = itemsDiamond.filter((item) =>
    item.product_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredItemsByDimQltySubMst = filteredItems.filter((item) =>
    filterItemDimQltySubMst === "All"
      ? true
      : item.dimMsts.dimQltySubMst.dimQlty === filterItemDimQltySubMst
  );

  const filteredItemsByDimQltyMst = filteredItemsByDimQltySubMst.filter(
    (item) =>
      filterItemDimQltyMst === "All"
        ? true
        : item.dimMsts.dimQltyMst.dimQlty === filterItemDimQltyMst
  );

  const filteredItemsByDimTypeDimInfoMst = filteredItemsByDimQltyMst.filter(
    (item) =>
      filterItemDimTypeDimInfoMst === "All"
        ? true
        : item.dimMsts.dimInfoMst.dimType === filterItemDimTypeDimInfoMst
  );

  const filteredItemsByDimSubTypeDimInfoMst =
    filteredItemsByDimTypeDimInfoMst.filter((item) =>
      filterItemDimSubTypeDimInfoMst === "All"
        ? true
        : item.dimMsts.dimInfoMst.dimSubType === filterItemDimSubTypeDimInfoMst
    );

  const filteredItemsByDimCrt = filteredItemsByDimSubTypeDimInfoMst.filter(
    (item) => {
      if (minDimCrt && maxDimCrt) {
        return (
          item.dimMsts.dimInfoMst.dimCrt >= parseFloat(minDimCrt) &&
          item.dimMsts.dimInfoMst.dimCrt <= parseFloat(maxDimCrt)
        );
      } else if (minDimCrt) {
        return item.dimMsts.dimInfoMst.dimCrt >= parseFloat(minDimCrt);
      } else if (maxDimCrt) {
        return item.dimMsts.dimInfoMst.dimCrt <= parseFloat(maxDimCrt);
      }
      return true;
    }
  );

  const handleMinDimCrtChange = (e) => {
    setMinDimCrt(e.target.value);
  };

  const handleMaxDimCrtChange = (e) => {
    setMaxDimCrt(e.target.value);
  };

  const resetSelectOptions = () => {
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.selectedIndex = 0;
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterItemDimQltySubMst("All");
    setFilterItemDimQltyMst("All");
    setFilterItemDimTypeDimInfoMst("All");
    setFilterItemDimSubTypeDimInfoMst("All");
    setMinDimCrt("");
    setMaxDimCrt("");
    resetSelectOptions();
  };

  return (
    <div className="container">
      <div className="container my-4 text-center">
        <img
          src="https://cdn.pnj.io/images/promo/140/Adapt_banner_KC_vien_t10_1200x450.jpg"
          alt="banner"
          style={{ width: "90%", height: "auto" }}
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
                  {t("Product")} {t("Diamond")} {t(dim.dimType)} {t("with")}{" "}
                  {t("shape")} {t(dim.dimSubType)} {t("and")} {dim.dimCrt} carat{" "}
                  {""}
                  {/* {t("was discovered in")} {dim.dimYear} */}
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
        {t("Related Diamond Quality Products")}
      </h5>

      <div className="row my-2" style={{ justifyContent: "center" }}>
        <div className="d-flex justify-content-between">
          <div className="container">
            <input
              type="text"
              placeholder={t("Search...")}
              className="form-control"
              value={searchTerm}
              onChange={handleSearchTermChange}
              list="search-results"
            />
            <datalist id="search-results">
              {searchSuggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>
          </div>
        </div>
      </div>

      <button className="btn btn-success mb-2 mx-2" onClick={handleReset}>
        {t("Reset")}
      </button>

      <div className="d-flex">
        <div className="col-2">
          <button
            type="button"
            class="btn btn-primary mb-2"
            data-bs-toggle="collapse"
            data-bs-target="#demo3"
          >
            {t("Advance Search")} ▼
          </button>

          <div id="demo3" className="collapse">
            <div className="container">
              <div className="col-12 mb-2" style={{ marginRight: "5px" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleFilterChange}
                >
                  <option value="All">
                    {t("Select Diamond Sub Quality")} ▼
                  </option>
                  {dimQltySub.map((sub) => (
                    <option key={sub.dimSubtype_ID} value={sub.dimQlty}>
                      {t(sub.dimQlty)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 mb-2" style={{ marginRight: "5px" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleFilterChangeDimQltyMst}
                >
                  <option value="All">{t("Select Diamond Quality")} ▼</option>
                  {dimQlty.map((sub) => (
                    <option key={sub.dimQlty_ID} value={sub.dimQlty}>
                      {t(sub.dimQlty)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 mb-2" style={{ marginRight: "5px" }}>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={handleFilterChangeDimTypeDimInfoMst}
                >
                  <option value="All">
                    {t("Select")} {t("Type Of Diamond")} ▼
                  </option>
                  {dimInfo.map((sub) => (
                    <option key={sub.dimID} value={sub.dimType}>
                      {sub.dimType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-2" style={{ marginRight: "12px" }}>
              <input
                type="number"
                className="form-control"
                placeholder={t("Min Carat")}
                value={minDimCrt}
                onChange={handleMinDimCrtChange}
              />
            </div>

            <div className="mb-2" style={{ marginRight: "5px" }}>
              <input
                type="number"
                className="form-control"
                placeholder={t("Max Carat")}
                value={maxDimCrt}
                onChange={handleMaxDimCrtChange}
              />
            </div>
          </div>
        </div>
        <div className="col-10">
          <div
            className="row my-2"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            {filteredItemsByDimCrt.map((item, index) => (
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
                      href={`/item/${item.style_Code}`}
                    >
                      {t("View Details")}
                    </a>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDiamond;
