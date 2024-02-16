import axios from 'axios';
import React, { useState } from 'react';
import { saveAs } from "file-saver";

const PageHeading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateReport = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, "");
        const response = await axios.get(`https://localhost:7241/api/Report/exportonefileexcel`,{ responseType: "blob" });
        const blob = new Blob([response.data], { type: "application/xlsx" });
        saveAs(blob, `Report_${formattedDate}.xlsx`);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };
    
    return (
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">All Orders</h1>
          <button
            onClick={handleGenerateReport}
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            disabled={isLoading} // Disable the button when loading
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <>
                <i className="fa fa-file-excel mx-2" aria-hidden="true"></i> Generate Excel Report
              </>
            )}
          </button>
        </div>
      );
};

export default PageHeading;