import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import Salesperson from "./pages/salesperson";
import Customer from "./pages/customer";
import Sales from "./pages/sales";
import CommissionReport from "./pages/commissionReport";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/salesperson" element={<Salesperson />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/commissionReport" element={<CommissionReport />} />
      </Routes>
    </Router>
  );
}

export default App;
