const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

//CORS allows servers specify origins to permit requests from.
app.use(cors());

//Parse json
app.use(express.json());

//database connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "bespoked_data",
});

//Makes a route for create (localhost:3001/create)
//Take from frontend is req (request), and send something to frontend is res (respond) through insertion
app.post("/create", (req, res) => {});

//Makes route for products (localhost:3001/products)
//Will get (read) data from database
app.get("/products", (req, res) => {
  //Select everything from product table
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const productID = req.body.productID;
  const name = req.body.name;
  const manufacturer = req.body.manufacturer;
  const style = req.body.style;
  const purchasePrice = req.body.purchasePrice;
  const salePrice = req.body.salePrice;
  const qtyOnHand = req.body.qtyOnHand;
  const commissionPercentage = req.body.commissionPercentage;

  db.query(
    "UPDATE products SET name = ?, manufacturer = ?, style = ?, purchasePrice = ?, salePrice = ?, qtyOnHand = ?, commissionPercentage = ? WHERE productID = ?",
    [
      name,
      manufacturer,
      style,
      purchasePrice,
      salePrice,
      qtyOnHand,
      commissionPercentage,
      productID,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//confirmation of running server
app.listen(3001, () => {
  console.log("ya server running on port 3001");
});
