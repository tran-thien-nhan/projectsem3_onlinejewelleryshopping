import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "../../Context/DataContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ItemFavorite = () => {
  const { t, i18n } = useTranslation();
  const { wistlist } = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const [updatewistlist, setUpdateWistlist] = useState([]);
  const WishListsPerPage = 5;

  // Calculate the index of the first and last order on the current page
  const indexOfLastWishList = currentPage * WishListsPerPage;
  const indexOfFirstWishList = indexOfLastWishList - WishListsPerPage;
  const currentWishLists = wistlist.slice(
    indexOfFirstWishList,
    indexOfLastWishList
  );

  //console.log(wistlist);
  const wistlistByUserId = wistlist.filter(
    (wistlist) => wistlist.userID === sessionStorage.getItem("userID")
  );

  const handleDeleteFromWishList = async (id, e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `https://localhost:7241/api/WishList/unaddfromwishlist/${id}`
      );
      if (response.status === 200) {
        const updatedWishList = wistlistByUserId.filter(
          (item) => item.id !== id
        );
        setUpdateWistlist(updatedWishList);
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong!",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div class="untree_co-section before-footer-section">
      <div class="container">
        <div class="row mb-5">
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">{t("Image")}</th>
                    <th className="product-name">{t("Product")}</th>
                    <th className="product-price">{t("Price")}</th>
                    <th className="product-remove">{t("Remove")}</th>
                  </tr>
                </thead>
                <tbody>
                  {wistlistByUserId.map((w) => (
                    <tr key={w.whistList_ID}>
                      <td className="product-thumbnail">
                        <img
                          src={
                            w.itemMst.imagePath ||
                            "https://us.pandora.net/dw/image/v2/AAVX_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dwf277c8d8/productimages/singlepackshot/593008C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"
                          }
                          alt="Image"
                          className="img-fluid"
                        />
                      </td>
                      <td>{w.itemMst.product_Name}</td>
                      <td>${w.itemMst.mrp}</td>
                      <td>
                        <button
                          className="btn btn-black btn-sm"
                          onClick={(e) =>
                            handleDeleteFromWishList(w.whistList_ID, e)
                          }
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-md-12">
            <nav>
              <ul class="pagination justify-content-center">
                {Array.from({
                  length: Math.ceil(wistlist.length / WishListsPerPage),
                }).map((_, index) => (
                  <li
                    key={index}
                    class={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      class="page-link"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFavorite;
