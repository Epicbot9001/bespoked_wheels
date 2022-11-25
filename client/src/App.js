import './App.css';
import { useState } from "react";
import Axios from 'axios'

function App() {
  const [productsList, setProductsList] = useState([]);

  const getProducts = () => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductsList(response.data)
    });
  }

  return (
    <div className="App">
      BeSpoked Wheels
      <div className = "products">
        <button onClick={getProducts}>
          Show Products
        </button>
        {productsList.map((val, key) => {
          return (
            <div className = "product">
              <h3>Name: {val.name}</h3>
              <h3>Manufacturer: {val.manufacturer}</h3>
              <h3>Style: {val.style}</h3>
              <h3>Purchase Price: {val.purchasePrice}</h3>
              <h3>Sale Price: {val.salePrice}</h3>
              <h3>Qty on Hand: {val.qtyOnHand}</h3>
              <h3>Commission %: {val.commissionPercentage}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
