import React from "react";
import "../App.css";
import { useState } from "react";
import Axios from "axios"; //HTTP client library where I can perform CRUD operations
import { Table } from "antd";

const Customer = () => {
  //list to store product data
  const [customerList, setCustomerList] = useState([]);

  //method called on button click
  const getCustomer = () => {
    Axios.get("http://localhost:3001/customer").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].startDate = response.data[i].startDate.slice(0, 10);
      }
      setCustomerList(response.data); //sets call from database to products
    });

    const customerBtn = document.getElementById("productButton");
    const customerTable = document.getElementById("product");
    const initialText = "Show Customers";

    if (
      customerBtn.textContent.toLowerCase().includes(initialText.toLowerCase())
    ) {
      customerBtn.textContent = "Hide Customers";
      customerTable.style.display = "block";
    } else {
      customerBtn.textContent = initialText;
      customerTable.style.display = "none";
    }
  };

  const columns = [
    {
      key: "1",
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      key: "2",
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      key: "3",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "4",
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: "5",
      title: "Start Date",
      dataIndex: "startDate",
    },
  ];

  return (
    <div className="App">
      <div className="products">
        <button id="productButton" onClick={getCustomer}>
          Show Customers
        </button>
        <div id="product">
          <Table columns={columns} dataSource={customerList}></Table>
        </div>
      </div>
    </div>
  );
};

export default Customer;
