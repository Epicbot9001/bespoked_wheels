import React from "react";
import "./index.css";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
// import Logo from "/bespoked.png";

const Navbar = () => {
  return (
    <>
      <Nav>
        <div className="title">
          {/* <img src={Logo} alt="logo" width="8%" /> */}
          {/* <img src="./bespoked.png" alt="logo" width="8%" /> */}
          <h1>BeSpoked Wheels</h1>
        </div>
        <NavMenu>
          <NavLink to="/salesperson" activeStyle>
            Salesperson
          </NavLink>
          <NavLink to="/products" activeStyle>
            Products
          </NavLink>
          <NavLink to="/customer" activeStyle>
            Customer
          </NavLink>
          <NavLink to="/sales" activeStyle>
            Sales
          </NavLink>
          <NavLink to="/commissionReport" activeStyle>
            Commission Report
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
