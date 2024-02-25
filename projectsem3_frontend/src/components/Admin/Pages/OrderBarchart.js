import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useData } from "../../../Context/DataContext";

const OrderBarchart = () => {
  const { allOrderList, items } = useData();
  const chartRef = useRef(null);
  const doughnutRef = useRef(null);
  const doughnutRef1 = useRef(null);

  useEffect(() => {
    const allOrderListCompleted = allOrderList
      .filter((order) => order.orderStatus === 3)
      .sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
    // Calculate revenue by day
    const revenueByDay = allOrderListCompleted.reduce((acc, order) => {
      const date = order.orderDate ? order.orderDate.split("T")[0] : "";
      acc[date] = acc[date] ? acc[date] + order.totalPrice : order.totalPrice;
      return acc;
    }, {});

    // Convert revenueByDay object to arrays for chart data
    const labels = Object.keys(revenueByDay);
    const data = Object.values(revenueByDay);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Revenue",
          data: data,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    // Calculate number of orders by status
    const ordersByStatus = allOrderList.reduce((acc, order) => {
      acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
      return acc;
    }, {});

    const statusLabels = ["Pending", "Shipping", "Completed"];
    const statusData = [
      ordersByStatus[1] || 0,
      ordersByStatus[2] || 0,
      ordersByStatus[3] || 0,
    ];

    const doughnutData = {
      labels: statusLabels,
      datasets: [
        {
          label: "Orders by Status",
          data: statusData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Calculate top 3 products by quantity
    const productsByQuantity = Object.values(items)
      .sort((a, b) => a.quantity - b.quantity)
      .slice(0, 3);

    const topProductLabels = productsByQuantity.map(
      (product) => product.product_Name
    );
    const topProductData = productsByQuantity.map(
      (product) => product.quantity
    );

    const doughnutDataProducts = {
      labels: topProductLabels,
      datasets: [
        {
          label: "Top Products by Quantity",
          data: topProductData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Destroy existing charts if they exist
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }
    if (doughnutRef.current !== null) {
      doughnutRef.current.destroy();
    }
    if (doughnutRef1.current !== null) {
      doughnutRef1.current.destroy();
    }

    // Create new charts
    const ctx = document.getElementById("orderBarchart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            barPercentage: 0.2,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const doughnutCtx = document
      .getElementById("orderDoughnutChart")
      .getContext("2d");
    doughnutRef.current = new Chart(doughnutCtx, {
      type: "doughnut",
      data: doughnutData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    const doughnutCtx1 = document
      .getElementById("orderDoughnutChart1")
      .getContext("2d");
    doughnutRef1.current = new Chart(doughnutCtx1, {
      type: "doughnut",
      data: doughnutDataProducts,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      // Clean up by destroying charts when component unmounts
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
      if (doughnutRef.current !== null) {
        doughnutRef.current.destroy();
      }
      if (doughnutRef1.current !== null) {
        doughnutRef1.current.destroy();
      }
    };
  }, [allOrderList, items]);

  return (
    <div>
      <div style={{ width: "100%" }}>
        <canvas
          id="orderBarchart"
          style={{ width: "100px", height: "500px", padding: "5px" }}
        ></canvas>
      </div>
      <div className="row">
        <div style={{ width: "50%" }}>
          <canvas
            id="orderDoughnutChart"
            style={{ width: "100px", height: "500px", padding: "5px" }}
          ></canvas>
        </div>
        <div style={{ width: "50%" }}>
          <canvas
            id="orderDoughnutChart1"
            style={{ width: "100px", height: "500px", padding: "5px" }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default OrderBarchart;
