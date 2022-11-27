import React from "react";
import "../App.css";
import { useState } from "react";
import Axios from "axios"; //HTTP client library where I can perform CRUD operations
import { Table } from "antd";

const Sales = () => {
  //list to store product data
  const [salesList, setSalesList] = useState([]);

  const [product, setProduct] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [customer, setCustomer] = useState("");
  const [salesDate, setSalesDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [commission, setCommission] = useState(0);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      product: product,
      salesperson: salesperson,
      customer: customer,
      salesDate: salesDate,
      purchasePrice: purchasePrice,
      commission: commission,
    }).then(() => {
      setSalesList([
        ...salesList,
        {
          product: product,
          salesperson: salesperson,
          customer: customer,
          salesDate: salesDate,
          purchasePrice: purchasePrice,
          salesCommission: commission,
        },
      ]);
    });
  };
  //method called on button click
  const getSales = () => {
    Axios.get("http://localhost:3001/sales").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].salesDate = response.data[i].salesDate.slice(0, 10);
      }
      setSalesList(response.data); //sets call from database to products
    });

    const salesBtn = document.getElementById("productButton");
    const salesTable = document.getElementById("product");
    const initialText = "Show Sales";

    if (
      salesBtn.textContent.toLowerCase().includes(initialText.toLowerCase())
    ) {
      salesBtn.textContent = "Hide Sales";
      salesTable.style.display = "block";
    } else {
      salesBtn.textContent = initialText;
      salesTable.style.display = "none";
    }
  };

  const columns = [
    {
      key: "1",
      title: "Product",
      dataIndex: "product",
    },
    {
      key: "2",
      title: "Salesperson",
      dataIndex: "salesperson",
    },
    {
      key: "3",
      title: "Customer",
      dataIndex: "customer",
    },
    {
      key: "4",
      title: "Sales Date",
      dataIndex: "salesDate",
    },
    {
      key: "5",
      title: "Purchase Price",
      dataIndex: "purchasePrice",
    },
    {
      key: "6",
      title: "Sales Commission",
      dataIndex: "salesCommission",
    },
  ];

  return (
    <div className="App">
      <div className="products">
        <button id="productButton" onClick={getSales}>
          Show Sales
        </button>
        <div id="product">
          <Table columns={columns} dataSource={salesList}></Table>
        </div>
        <div className="inputs">
          <div className="cols">
            Product:{" "}
            <input
              type="text"
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            />
          </div>
          <div className="cols">
            Salesperson:{" "}
            <input
              type="text"
              onChange={(e) => {
                setSalesperson(e.target.value);
              }}
            />
          </div>
          <div className="cols">
            Customer:{" "}
            <input
              type="text"
              onChange={(e) => {
                setCustomer(e.target.value);
              }}
            />
          </div>
          <div className="cols">
            Sales Date:{" "}
            <input
              type="text"
              onChange={(e) => {
                setSalesDate(e.target.value);
              }}
            />
          </div>
          <div className="cols">
            Purchase Price:{" "}
            <input
              type="number"
              onChange={(e) => {
                setPurchasePrice(e.target.value);
              }}
            />
          </div>
          <div className="cols">
            Sales Commission:{" "}
            <input
              type="number"
              onChange={(e) => {
                setCommission(e.target.value);
              }}
            />
          </div>
        </div>
        <button onClick={addEmployee} className="addSale">
          Add Sale
        </button>
      </div>
    </div>
  );
};

export default Sales;
