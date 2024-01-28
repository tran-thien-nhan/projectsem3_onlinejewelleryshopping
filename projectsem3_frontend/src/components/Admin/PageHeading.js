import axios from 'axios';
import React from 'react';
import { saveAs } from "file-saver";

const PageHeading = () => {
    
    const handleGenerateReport = async () => {
      try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, "");
        const response = await axios.get(`https://localhost:7241/api/Report/exportonefileexcel`,{ responseType: "blob" });
        const blob = new Blob([response.data], { type: "application/xlsx" });
        saveAs(blob, `Report_${formattedDate}.xlsx`);
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <button
            onClick={handleGenerateReport}
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i class="fa fa-file-excel mx-2" aria-hidden="true"></i> Generate Excel Report
          </button>
        </div>
      );
};

export default PageHeading;