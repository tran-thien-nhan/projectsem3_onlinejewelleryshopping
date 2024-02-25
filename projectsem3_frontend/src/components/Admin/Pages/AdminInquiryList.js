import React, { useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useData } from "../../../Context/DataContext";
import Swal from "sweetalert2";

const AdminInquiry = () => {
  const { inquiry, loading, error } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalEmailID, setModalEmailID] = useState("");
  const [modalComment, setModalComment] = useState("");
  const [modalInquiryID, setModalInquiryID] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  const handleDeleteInquiry = async (id) => {
    try {
      await axios.delete(`https://localhost:7241/api/Inquiry/${id}`);
      // Reload the inquiries after deleting
      window.location.reload();
    } catch (error) {
      console.error("Delete inquiry error:", error);
    }
  };

  const handleModalOpen = (id, emailID, comment) => {
    setModalInquiryID(id);
    setModalEmailID(emailID);
    setModalComment(comment);
  };

  const handleResponseChange = (e) => {
    setResponseText(e.target.value);
  };

  const handleSendResponse = async (e, id) => {
    e.preventDefault();

    const requestData = {
      id: modalInquiryID,
      content: responseText,
    };

    try {
      // Kiểm tra xem responseText có giá trị không
      if (responseText.trim() !== "") {
        setIsLoading(true);
        const response = await axios.post(
          `https://localhost:7241/api/Inquiry/reply`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setIsLoading(false);
          Swal.fire({
            icon: "success",
            title: "Response Sent",
            text: "The response has been sent successfully.",
          });
          // Reload the inquiries after sending response
          setTimeout(() => {
            Swal.close();
            window.location.reload();
          }, 1000);
        } else {
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: "Response Not Sent",
            text: "The response has not been sent successfully.",
          });
        }
        // Reset the response text
        setResponseText("");
      } else {
        setIsLoading(false);
        // Hiển thị cảnh báo nếu responseText trống
        Swal.fire({
          icon: "warning",
          title: "Empty Response",
          text: "Please enter a response before sending.",
        });
      }
    } catch (error) {
      console.error("Send response error:", error);
      Swal.fire({
        icon: "error",
        title: "Response Not Sent",
        text: "Error Sending",
      });
    }
  };

  const filteredInquiries = inquiry.filter((inquiryItem) => {
    const matchesSearchTerm =
      inquiryItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiryItem.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiryItem.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiryItem.emailID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiryItem.comment.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearchTerm;
  });

  return (
    <div className="container-fluid">
      <h2 className="mt-4">Inquiry</h2>
      <div className="mb-3">
        <label htmlFor="searchTerm">
          Search by Name, City, Contact, Email, or Comment
        </label>
        <input
          type="text"
          className="form-control"
          id="searchTerm"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  <TailSpin color="red" radius={8} />
                </td>
              </tr>
            ) : filteredInquiries.length > 0 ? (
              filteredInquiries.map((inquiryItem) => (
                <tr key={inquiryItem.id}>
                  <td>
                    {inquiryItem.id}
                    {new Date(inquiryItem.cdate).toDateString() ===
                      new Date().toDateString() && (
                      <span className="badge bg-success mx-2">New today</span>
                    )}
                  </td>
                  <td>{inquiryItem.name}</td>
                  <td>{inquiryItem.city}</td>
                  <td>{inquiryItem.contact}</td>
                  <td>{inquiryItem.emailID}</td>
                  <td>{inquiryItem.comment}</td>
                  <td>
                    {/* <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDeleteInquiry(inquiryItem.inquiry_ID)
                      }
                    >
                      Delete
                    </button> */}
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      onClick={() =>
                        handleModalOpen(
                          inquiryItem.id,
                          inquiryItem.emailID,
                          inquiryItem.comment
                        )
                      }
                    >
                      Reply
                    </button>
                    <div className="modal" id="myModal">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Reply</h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                            ></button>
                          </div>

                          <div className="modal-body">
                            <form
                              onSubmit={(e) =>
                                handleSendResponse(e, modalInquiryID)
                              }
                            >
                              <div className="mb-3">
                                <label
                                  style={{ fontWeight: "bold", float: "left" }}
                                >
                                  To:
                                </label>
                                <p>{modalEmailID}</p>
                              </div>
                              <div className="mb-3">
                                <label
                                  style={{ fontWeight: "bold", float: "left" }}
                                >
                                  Comment:
                                </label>
                                <p>{modalComment}</p>
                              </div>
                              <input
                                type="hidden"
                                name="id"
                                value={modalInquiryID}
                              />
                              <div className="mb-3">
                                <label
                                  style={{ fontWeight: "bold", float: "left" }}
                                >
                                  Your Response:
                                </label>
                                <textarea
                                  className="form-control"
                                  rows="5"
                                  name="content"
                                  placeholder="Respond..."
                                  value={responseText}
                                  onChange={handleResponseChange}
                                ></textarea>
                              </div>
                              <div className="mb-3">
                                <button
                                  type="submit"
                                  className="btn btn-warning"
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  ) : (
                                    <>Submit</>
                                  )}
                                </button>
                              </div>
                            </form>
                          </div>

                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Inquiry Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-3 d-flex">
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default AdminInquiry;
