import './App.css';
import { useState } from "react";
import Axios from 'axios' //HTTP client library where I can perform CRUD operations
import Logo from './bespoked.png'
import Table from './components/Table';

function App() {
  //list to store product data
  const [productsList, setProductsList] = useState([]);

  //method called on button click
  const getProducts = () => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductsList(response.data) //sets call from database to products
    });

    const prodBtn = document.getElementById('productButton');
    const prodTable = document.getElementById('product');
    const initialText = 'Show Products';

    if (prodBtn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
      prodBtn.textContent = 'Hide Products';
      prodTable.style.display = "block";
    } else {
      prodBtn.textContent = initialText;
      prodTable.style.display = "none";
    }
  }

  const column = [
    { heading: 'Name', value: 'name' }, 
    { heading: 'Manufacturer', value: 'manufacturer' }, 
    { heading: 'Style', value: 'style' }, 
    { heading: 'Purchase Price', value: 'purchasePrice' }, 
    { heading: 'Sale Price', value: 'salePrice' }, 
    { heading: 'Qty on Hand', value: 'qtyOnHand' }, 
    { heading: 'Commission Percentage', value: 'commissionPercentage' }
  ]

  return (
    <div className="App">
      <div className="title">
        <img src={Logo} alt="logo" width="8%"/>
        <h1>BeSpoked Wheels</h1>  
      </div>
      <div className = "products">
        <button id="productButton" onClick={getProducts}>
          Show Products
        </button>
          <div id = "product">
              {/* <h3>Name: {val.name}</h3>
              <h3>Manufacturer: {val.manufacturer}</h3>
              <h3>Style: {val.style}</h3>
              <h3>Purchase Price: {val.purchasePrice}</h3>
              <h3>Sale Price: {val.salePrice}</h3>
              <h3>Qty on Hand: {val.qtyOnHand}</h3>
              <h3>Commission %: {val.commissionPercentage}</h3> */}
            <Table id="productTable" data={productsList} column={column} />
          </div>
      </div>
    </div>
  );
}

export default App;
