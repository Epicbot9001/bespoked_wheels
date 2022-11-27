import React from "react";
import "../App.css";
import { useState } from "react";
import Axios from "axios"; //HTTP client library where I can perform CRUD operations
import { Modal, Table, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

const Salesperson = () => {
  //list to store product data
  const [spList, setSpList] = useState([]);
  const [isEditingSp, setIsEditingSp] = useState(false);
  const [editingSp, setEditingSp] = useState(null);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState(0);
  const [newStartDate, setNewStartDate] = useState(0);
  const [newTerminationDate, setNewTerminationDate] = useState(0);
  const [newManager, setNewManager] = useState(0);

  //method called on button click
  const getSalesperson = () => {
    Axios.get("http://localhost:3001/salesperson").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].startDate = response.data[i].startDate.slice(0, 10);
      }
      setSpList(response.data); //sets call from database to products
    });

    const spBtn = document.getElementById("productButton");
    const spTable = document.getElementById("product");
    const initialText = "Show Salespersons";

    if (spBtn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
      spBtn.textContent = "Hide Salespersons";
      spTable.style.display = "block";
    } else {
      spBtn.textContent = initialText;
      spTable.style.display = "none";
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
    {
      key: "6",
      title: "Termination Date",
      dataIndex: "terminationDate",
    },
    {
      key: "7",
      title: "Manager",
      dataIndex: "manager",
    },
    {
      key: "8",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditSp(record);
                setNewFirstName(record.firstName);
                setNewLastName(record.lastName);
                setNewAddress(record.address);
                setNewPhone(record.phone);
                setNewStartDate(record.startDate.slice(0, 10));

                if (record.terminationDate.length > 0) {
                  setNewTerminationDate(record.terminationDate.slice(0, 10));
                } else {
                  setNewTerminationDate(null);
                }
                setNewManager(record.manager);
              }}
              style={{ color: "darkblue" }}
            />
          </>
        );
      },
    },
  ];

  const onEditSp = (record) => {
    setIsEditingSp(true);
    setEditingSp({ ...record }); //Make a copy of record and put it into editingProduct
  };
  const resetEditingSp = () => {
    setIsEditingSp(false);
    setEditingSp(null);
  };
  const updateSalesperson = (id) => {
    Axios.put("http://localhost:3001/updateSalesperson", {
      //puts into array taken in by put request
      firstName: newFirstName,
      lastName: newLastName,
      address: newAddress,
      phone: newPhone,
      startDate: newStartDate,
      terminationDate: newTerminationDate,
      manager: newManager,
      salespersonID: id,
    }).then((response) => {
      //alert("updated database");
    });
  };

  return (
    <div className="App">
      <div className="products">
        <button id="productButton" onClick={getSalesperson}>
          Show Salespersons
        </button>
        <div id="product">
          <Table columns={columns} dataSource={spList}></Table>
          <Modal
            title="Edit Salespersons"
            visible={isEditingSp}
            okText="Save"
            onCancel={() => {
              resetEditingSp();
            }}
            onOk={() => {
              setSpList((pre) => {
                return pre.map((sp) => {
                  if (sp.salespersonID === editingSp.salespersonID) {
                    updateSalesperson(sp.salespersonID);
                    return editingSp;
                  } else {
                    return sp;
                  }
                });
              });
              resetEditingSp();
            }}
          >
            First Name:{" "}
            <Input
              value={editingSp?.firstName}
              onChange={(e) => {
                setEditingSp((pre) => {
                  setNewFirstName(e.target.value);
                  return { ...pre, firstName: e.target.value };
                });
              }}
            />
            Last Name:{" "}
            <Input
              value={editingSp?.lastName}
              onChange={(e) => {
                setEditingSp((pre) => {
                  setNewLastName(e.target.value);
                  return { ...pre, lastName: e.target.value };
                });
              }}
            />
            Address:{" "}
            <Input
              value={editingSp?.address}
              onChange={(e) => {
                setEditingSp((pre) => {
                  setNewAddress(e.target.value);
                  return { ...pre, address: e.target.value };
                });
              }}
            />
            Phone:{" "}
            <Input
              value={editingSp?.phone}
              onChange={(e) => {
                setEditingSp((pre) => {
                  setNewPhone(e.target.value);
                  return { ...pre, phone: e.target.value };
                });
              }}
            />
            Start Date:{" "}
            <Input
              value={editingSp?.startDate}
              onChange={(e) => {
                setEditingSp((pre) => {
                  e.target.value = e.target.value.slice(0, 10);
                  setNewStartDate(e.target.value);
                  return { ...pre, startDate: e.target.value };
                });
              }}
            />
            Termination Date:{" "}
            <Input
              value={editingSp?.terminationDate}
              onChange={(e) => {
                setEditingSp((pre) => {
                  if (e.target.value.length > 0) {
                    e.target.value = e.target.value.slice(0, 10);
                    setNewTerminationDate(e.target.value);
                  } else {
                    setNewTerminationDate(null);
                  }
                  return { ...pre, terminationDate: e.target.value };
                });
              }}
            />
            Manager:
            <Input
              value={editingSp?.manager}
              onChange={(e) => {
                setEditingSp((pre) => {
                  setNewManager(e.target.value);
                  return { ...pre, manager: e.target.value };
                });
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Salesperson;
