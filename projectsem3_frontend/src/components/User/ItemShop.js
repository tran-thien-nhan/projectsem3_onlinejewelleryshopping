import React, { useState, useEffect } from "react";
import { useData } from "../../Context/DataContext";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import HeroSection from "./Layout/HeroSection";
import { useTranslation } from "react-i18next";

const ItemShop = () => {
  const { t, i18n } = useTranslation();
  const {
    items,
    brands,
    categories,
    certifies,
    loading,
    error,
    prod,
    golds,
    jewelry,
    stones,
    stoneQualities,
  } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortByPrice, setSortByPrice] = useState(null);
  const [filterCertificate, setFilterCertificate] = useState("All");
  const [filterProd, setFilterProd] = useState("All");
  const [filterGold, setFilterGold] = useState("All");
  const [filterJewellery, setFilterJewellery] = useState("All");
  const [filterStoneQlty, setFilterStoneQlty] = useState("All");
  const [stoneClicked, setStoneClicked] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    console.log(stoneQualities);
    const filteredAndSortedItems = items
      .filter((item) => {
        const isProductNameMatch = item.product_Name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const isBrandMatch =
          filterBrand === "All" || item.brandMst.brand_Type === filterBrand;
        const isCategoryMatch =
          filterCategory === "All" || item.catMst.cat_Name === filterCategory;
        const isCertificateMatch =
          filterCertificate === "All" ||
          item.certifyMst.certify_Type === filterCertificate;
        const isProdMatch =
          filterProd === "All" || item.prodMst.prod_Type === filterProd;
        const isGoldMatch =
          filterGold === "All" || item.goldKrtMst.gold_Crt === filterGold;
        const isJewelleryMatch =
          filterJewellery === "All" ||
          item.jewelTypeMst.jewellery_Type === filterJewellery;
        const isStoneQltyMatch =
          filterStoneQlty === "All" ||
          item.stoneQltyMst.stoneQlty === filterStoneQlty;

        const isPriceInRange =
          (!minPrice || item.mrp >= minPrice) &&
          (!maxPrice || item.mrp <= maxPrice);

        return (
          isProductNameMatch &&
          isBrandMatch &&
          isCategoryMatch &&
          isCertificateMatch &&
          isProdMatch &&
          isGoldMatch &&
          isJewelleryMatch &&
          isStoneQltyMatch &&
          isPriceInRange
        );
      })
      .slice();

    if (sortByPrice === "asc") {
      filteredAndSortedItems.sort((a, b) => a.mrp - b.mrp);
    } else if (sortByPrice === "desc") {
      filteredAndSortedItems.sort((a, b) => b.mrp - a.mrp);
    }

    setSearchResults(filteredAndSortedItems);

    // Generate search suggestions based on the search term
    const suggestions = items
      .filter((item) =>
        item.product_Name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .map((item) => item.product_Name);
    setSearchSuggestions(suggestions);
  }, [
    searchTerm,
    items,
    filterBrand,
    filterCategory,
    sortByPrice,
    filterCertificate,
    filterProd,
    filterGold,
    filterJewellery,
    filterStoneQlty,
    minPrice,
    maxPrice,
  ]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByPrice = (e) => {
    setSortByPrice(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchResults(items);
    setFilterBrand("All");
    setCurrentPage(1);
    setFilterCategory("All");
    setFilterCertificate("All");
    setFilterProd("All");
    setFilterGold("All");
    setFilterJewellery("All");
    setFilterStoneQlty("All");
    setMinPrice("");
    setMaxPrice("");
  };

  const handleFilterBrand = (e) => {
    setFilterBrand(e.target.value);
  };

  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleFilterCertificate = (e) => {
    setFilterCertificate(e.target.value);
  };

  const handleFilterProd = (e) => {
    setFilterProd(e.target.value);
  };

  const handleFilterGold = (e) => {
    setFilterGold(e.target.value);
  };

  const hangleFilterJewellery = (e) => {
    setFilterJewellery(e.target.value);
  };

  const handleFilterStoneQlty = (e) => {
    setFilterStoneQlty(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(parseInt(value));
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(parseInt(value));
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchResults.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-2">
      <HeroSection />
      <div className="mb-3">
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
        <button className="btn btn-success my-2 mx-2" onClick={handleReset}>
          {t("Reset")}
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="collapse"
          data-bs-target="#demo3"
        >
          {t("Advance Search")} ▼
        </button>
        <div id="demo3" className="collapse">
          <div className="d-flex">
            <div className="col-auto" style={{ marginRight: "5px" }}>
              <select
                className="form-control"
                value={filterBrand}
                onChange={handleFilterBrand}
              >
                <option value="All">{t("All Brands")} ▼</option>
                {brands.map((brand) => (
                  <option key={brand.brand_ID} value={brand.brand_Type}>
                    {t(brand.brand_Type)}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto" style={{ marginRight: "5px" }}>
              <select
                className="form-control"
                value={filterCategory}
                onChange={handleFilterCategory}
              >
                <option value="All">{t("All Categories")} ▼</option>
                {categories.map((cate) => (
                  <option key={cate.cat_ID} value={cate.cat_Name}>
                    {t(cate.cat_Name)}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto" style={{ marginRight: "5px" }}>
              <select
                className="form-control"
                value={sortByPrice}
                onChange={handleSortByPrice}
              >
                <option value="">{t("Sort by Price")} ▼</option>
                <option value="asc">{t("Price: Low to High")}</option>
                <option value="desc">{t("Price: High to Low")}</option>
              </select>
            </div>
            <div className="col-auto" style={{ marginRight: "5px" }}>
              <select
                className="form-control"
                value={filterCertificate}
                onChange={handleFilterCertificate}
              >
                <option value="All">{t("All Certificates")} ▼</option>
                {certifies.map((cer) => (
                  <option key={cer.certify_ID} value={cer.certify_Type}>
                    {cer.certify_Type}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto" style={{ marginRight: "5px" }}>
              <select
                className="form-control"
                value={filterProd}
                onChange={handleFilterProd}
              >
                <option value="All">{t("All Kind Products")} ▼</option>
                {prod.map((p) => (
                  <option key={p.prod_ID} value={p.prod_Type}>
                    {t(p.prod_Type)}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto" style={{ marginRight: "5px" }}>
              <select
                className="form-control"
                value={filterGold}
                onChange={handleFilterGold}
              >
                <option value="All">{t("All Gold Kinds")} ▼</option>
                {golds.map((g) => (
                  <option key={g.goldType_ID} value={g.gold_Crt}>
                    {g.gold_Crt}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto" style={{ marginRight: "5px" }}>
              <select
                className="form-control"
                value={filterJewellery}
                onChange={hangleFilterJewellery}
              >
                <option value="All">{t("All Jewellery Types")} ▼</option>
                {jewelry.map((j) => (
                  <option key={j.jewellery_ID} value={j.jewellery_Type}>
                    {t(j.jewellery_Type)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="col-auto" style={{ marginRight: "5px" }}>
              <select
                className="form-control"
                value={filterStoneQlty}
                onChange={handleFilterStoneQlty}
              >
                <option value="All">{t("All Stone Qualities")} ▼</option>
                {stoneQualities.map((s) => {
                  if (s.stoneQlty !== "None") {
                    return (
                      <option key={s.stoneQlty_ID} value={s.stoneQlty}>
                        {s.stoneQlty}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="col-auto" style={{ marginRight: "5px" }}>
              <input
                type="number"
                placeholder={t("Min Price")}
                className="form-control"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </div>
            <div className="col-auto" style={{ marginRight: "5px" }}>
              <input
                type="number"
                placeholder={t("Max Price")}
                className="form-control"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
          <hr />
        </div>
      </div>
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
              <div className="row">
                {Array.isArray(currentProducts) &&
                currentProducts.length > 0 ? (
                  currentProducts.map((item) => (
                    <div key={item.style_Code} className="col-md-3 mb-3">
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
                            <h5 className="card-title">{item.product_Name}</h5>
                          </div>
                          <a
                            className="btn btn-secondary mb-2 mx-4"
                            href={`/item/${item.style_Code}`}
                          >
                            {t("View Details")}
                          </a>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No Item Found.</p>
                )}
              </div>
              <div className="pagination justify-content-center">
                {Array.from(
                  { length: Math.ceil(searchResults.length / productsPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      className={`pagination-button page-link ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ItemShop;
