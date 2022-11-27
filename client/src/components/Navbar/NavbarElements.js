import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #1c4e80;
  display: flex;
  justify-content: space-between;
  // padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  width 102%;
  margin-left: -1%;
  margin-top: -0.6%;
  height: 100px;
`;

export const NavLink = styled(Link)`
  color: #c9c9c9;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 3rem;
  height: 100%;
  cursor: pointer;
  // margin-right: 10%;
  &.active {
    color: #ffffff;
  }
  font-size: 1.5em;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3%;
  white-space: nowrap;
  */ @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #808080;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;
