import React from "react";
import "../App.css";
import { useState } from "react";
import Axios from "axios"; //HTTP client library where I can perform CRUD operations
import { Modal, Table, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Products = () => {
  //list to store product data
  const [productsList, setProductsList] = useState([]);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newName, setNewName] = useState("");
  const [newManufacturer, setNewManufacturer] = useState("");
  const [newStyle, setNewStyle] = useState("");
  const [newPurchasePrice, setNewPurchasePrice] = useState(0);
  const [newSalePrice, setNewSalePrice] = useState(0);
  const [newQtyOnHand, setNewQtyOnHand] = useState(0);
  const [newCommissionPercentage, setNewCommissionPercentage] = useState(0);

  //method called on button click
  const getProducts = () => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductsList(response.data); //sets call from database to products
    });

    const prodBtn = document.getElementById("productButton");
    const prodTable = document.getElementById("product");
    const initialText = "Show Products";

    if (prodBtn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
      prodBtn.textContent = "Hide Products";
      prodTable.style.display = "block";
    } else {
      prodBtn.textContent = initialText;
      prodTable.style.display = "none";
    }
  };

  const columns = [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Manufacturer",
      dataIndex: "manufacturer",
    },
    {
      key: "3",
      title: "Style",
      dataIndex: "style",
    },
    {
      key: "4",
      title: "Purchase Price",
      dataIndex: "purchasePrice",
    },
    {
      key: "5",
      title: "Sale Price",
      dataIndex: "salePrice",
    },
    {
      key: "6",
      title: "Qty on Hand",
      dataIndex: "qtyOnHand",
    },
    {
      key: "7",
      title: "Commission Percentage",
      dataIndex: "commissionPercentage",
    },
    {
      key: "8",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditProduct(record);
                setNewName(record.name);
                setNewManufacturer(record.manufacturer);
                setNewStyle(record.style);
                setNewPurchasePrice(record.purchasePrice);
                setNewSalePrice(record.salePrice);
                setNewQtyOnHand(record.qtyOnHand);
                setNewCommissionPercentage(record.commissionPercentage);
              }}
              style={{ color: "darkblue" }}
            />
          </>
        );
      },
    },
  ];

  const onEditProduct = (record) => {
    setIsEditingProduct(true);
    setEditingProduct({ ...record }); //Make a copy of record and put it into editingProduct
  };
  const resetEditingProduct = () => {
    setIsEditingProduct(false);
    setEditingProduct(null);
  };
  const updateProduct = (id) => {
    Axios.put("http://localhost:3001/updateProduct", {
      name: newName,
      manufacturer: newManufacturer,
      style: newStyle,
      purchasePrice: newPurchasePrice,
      salePrice: newSalePrice,
      qtyOnHand: newQtyOnHand,
      commissionPercentage: newCommissionPercentage,
      productID: id,
    }).then((response) => {
      //alert("updated database");
    });
  };

  return (
    <div className="App">
      {/* <div className="title">
        <img src={Logo} alt="logo" width="8%" />
        <h1>BeSpoked Wheels</h1>
      </div> */}
      <div className="products">
        <button id="productButton" onClick={getProducts}>
          Show Products
        </button>
        <div id="product">
          <Table columns={columns} dataSource={productsList}></Table>
          <Modal
            title="Edit Product"
            visible={isEditingProduct}
            okText="Save"
            onCancel={() => {
              resetEditingProduct();
            }}
            onOk={() => {
              setProductsList((pre) => {
                return pre.map((product) => {
                  if (product.productID === editingProduct.productID) {
                    updateProduct(product.productID);
                    return editingProduct;
                  } else {
                    return product;
                  }
                });
              });
              resetEditingProduct();
            }}
          >
            Name:{" "}
            <Input
              value={editingProduct?.name}
              onChange={(e) => {
                setEditingProduct((pre) => {
                  setNewName(e.target.value);
                  return { ...pre, name: e.target.value };
                });
              }}
            />
            Manufacturer:{" "}
            <Input
              value={editingProduct?.manufacturer}
              onChange={(e) => {
                setEditingProduct((pre) => {
                  setNewManufacturer(e.target.value);
                  return { ...pre, manufacturer: e.target.value };
                });
              }}
            />
            Style:{" "}
            <Input
              value={editingProduct?.style}
              onChange={(e) => {
                setEditingProduct((pre) => {
                  setNewStyle(e.target.value);
                  return { ...pre, style: e.target.value };
                });
              }}
            />
            Purchase Price:{" "}
            <Input
              value={editingProduct?.purchasePrice}
              onChange={(e) => {
                setEditingProduct((pre) => {
                  var temp = e.target.value;
                  temp = temp.trim();
                  temp = temp.replace(/^0+/, "") || "0";
                  var n = Math.floor(Number(temp));
                  if (n !== Infinity && String(n) === temp && n >= 0) {
                    setNewPurchasePrice(e.target.value);
                    return { ...pre, purchasePrice: e.target.value };
                  } else {
                    return { ...pre, purchasePrice: newPurchasePrice };
                  }
                });
              }}
            />
            Sale Price:{" "}
            <Input
              value={editingProduct?.salePrice}
              onChange={(e) => {
                setEditingProduct((pre) => {
                  var temp = e.target.value;
                  temp = temp.trim();
                  temp = temp.replace(/^0+/, "") || "0";
                  var n = Math.floor(Number(temp));
                  if (n !== Infinity && String(n) === temp && n >= 0) {
                    setNewSalePrice(e.target.value);
                    return { ...pre, salePrice: e.target.value };
                  } else {
                    return { ...pre, salePrice: newSalePrice };
                  }
                });
              }}
            />
            Qty on Hand:{" "}
            <Input
              value={editingProduct?.qtyOnHand}
              onChange={(e) => {
                setEditingProduct((pre) => {
                  var temp = e.target.value;
                  temp = temp.trim();
                  temp = temp.replace(/^0+/, "") || "0";
                  var n = Math.floor(Number(temp));
                  if (n !== Infinity && String(n) === temp && n >= 0) {
                    setNewQtyOnHand(e.target.value);
                    return { ...pre, qtyOnHand: e.target.value };
                  } else {
                    return { ...pre, qtyOnHand: newQtyOnHand };
                  }
                });
              }}
            />
            Commission Percentage:
            <Input
              value={editingProduct?.commissionPercentage}
              onChange={(e) => {
                setEditingProduct((pre) => {
                  var temp = e.target.value;
                  temp = temp.trim();
                  temp = temp.replace(/^0+/, "") || "0";
                  var n = Math.floor(Number(temp));
                  if (n !== Infinity && String(n) === temp && n >= 0) {
                    setNewCommissionPercentage(e.target.value);
                    return { ...pre, commissionPercentage: e.target.value };
                  } else {
                    return {
                      ...pre,
                      commissionPercentage: newCommissionPercentage,
                    };
                  }
                });
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Products;
