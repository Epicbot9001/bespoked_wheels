import React from "react";
import "../App.css";
import { useState } from "react";
import Axios from "axios"; //HTTP client library where I can perform CRUD operations
import { Table } from "antd";

const CommissionReport = () => {
  //list to store product data
  const [commissionList, setCommissionList] = useState([]);

  //method called on button click
  const getCommission = () => {
    Axios.get("http://localhost:3001/commission").then((response) => {
      setCommissionList(response.data); //sets call from database to products
    });

    const commissionBtn = document.getElementById("productButton");
    const commissionTable = document.getElementById("product");
    const initialText = "Show Commission Report";

    if (
      commissionBtn.textContent
        .toLowerCase()
        .includes(initialText.toLowerCase())
    ) {
      commissionBtn.textContent = "Hide Commission Report";
      commissionTable.style.display = "block";
    } else {
      commissionBtn.textContent = initialText;
      commissionTable.style.display = "none";
    }
    console.log(commissionList);
  };

  const columns = [
    {
      key: "1",
      title: "Salesperson",
      dataIndex: "salesperson",
    },
    {
      key: "2",
      title: "Commission",
      dataIndex: "commission",
    },
    {
      key: "3",
      title: "Number of Sales",
      dataIndex: "Number of Sales",
    },
    {
      key: "4",
      title: "Year",
      dataIndex: "Year",
    },
    {
      key: "5",
      title: "Quarter",
      dataIndex: "Quarter",
    },
  ];

  return (
    <div className="App">
      <div className="products">
        <button id="productButton" onClick={getCommission}>
          Show Commission Report
        </button>
        <div id="product">
          <Table columns={columns} dataSource={commissionList}></Table>
        </div>
      </div>
    </div>
  );
};

export default CommissionReport;
