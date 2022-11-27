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
app.post("/create", (req, res) => {
  const product = req.body.product;
  const salesperson = req.body.salesperson;
  const customer = req.body.customer;
  const salesDate = req.body.salesDate;
  const purchasePrice = req.body.purchasePrice;
  const salesCommission = req.body.commission;

  db.query(
    "INSERT INTO sales (product, salesperson, customer, salesDate, purchasePrice, salesCommission) VALUES (?,?,?,?,?,?)",
    [product, salesperson, customer, salesDate, purchasePrice, salesCommission],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send();
      }
    }
  );
});

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

//Makes route for salesperson (localhost:3001/salesperson)
//Will get (read) data from database
app.get("/salesperson", (req, res) => {
  //Select everything from salesperson table
  db.query("SELECT * FROM salesperson", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Makes route for customer (localhost:3001/customer)
//Will get (read) data from database
app.get("/customer", (req, res) => {
  //Select everything from customer table
  db.query("SELECT * FROM customer", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Makes route for sales (localhost:3001/sales)
//Will get (read) data from database
app.get("/sales", (req, res) => {
  //Select everything from sales table
  db.query("SELECT * FROM sales", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Makes route for commission report (localhost:3001/commission)
//Will get (read) data from database
app.get("/commission", (req, res) => {
  //Select everything from sales table
  db.query(
    "SELECT bespoked_data.sales.salesperson, ROUND(SUM(bespoked_data.sales.purchasePrice * bespoked_data.sales.salesCommission/100), 2) AS 'commission', COUNT(bespoked_data.sales.salesID) AS 'Number of Sales', YEAR(bespoked_data.sales.salesDate) AS 'Year', QUARTER(bespoked_data.sales.salesDate) AS 'Quarter' FROM bespoked_data.sales GROUP BY bespoked_data.sales.salesperson, QUARTER(bespoked_data.sales.salesDate), YEAR(bespoked_data.sales.salesDate) ORDER BY 'Year', 'Quarter'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateProduct", (req, res) => {
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

app.put("/updateSalesperson", (req, res) => {
  const salespersonID = req.body.salespersonID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;
  const phone = req.body.phone;
  const startDate = req.body.startDate;
  const terminationDate = req.body.terminationDate;
  const manager = req.body.manager;

  db.query(
    "UPDATE salesperson SET firstName = ?, lastName = ?, address = ?, phone = ?, startDate = ?, terminationDate = ?, manager = ? WHERE salespersonID = ?",
    [
      firstName,
      lastName,
      address,
      phone,
      startDate,
      terminationDate,
      manager,
      salespersonID,
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
