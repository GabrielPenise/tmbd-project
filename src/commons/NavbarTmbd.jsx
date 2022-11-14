import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import SearchText from "./SearchText";

export default function NavbarTmbd() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  const handlerLogOut = (e) => {
    axios.post("/api/users/logout");
    setUser(null);
    navigate("/");
  };

  //   return (
  //     <header className="header-top">
  //       <div className="content">
  //         <div className="nav">
  //           {user ? (
  //             <>
  //               <div className="nav-wrapper">
  //                 <button className="form-botton" onClick={handlerLogOut}>
  //                   Logout
  //                 </button>
  //                 <Link to={`/${user.name}${user.lastname}`}>
  //                   <button className="form-botton">User Profile</button>
  //                 </Link>
  //               </div>
  //               <Link to={`/${user.name}${user.lastname}`} className="link-nav">
  //                 <div className="log-tool">Welcome {user.name}</div>
  //               </Link>
  //               <div className="search">
  //                 Search
  //                 <SearchText />
  //               </div>
  //             </>
  //           ) : (
  //             <div>
  //               <Link to="/">
  //                 <button className="form-botton">Sing In</button>
  //               </Link>
  //               <Link to="/register">
  //                 <button className="form-botton">Sing Up</button>
  //               </Link>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </header>
  //   );

  return (
    <>
      <Navbar bg="myBlue" expand="lg">
        <Container>
          <Navbar.Brand>TMBD PROJECT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
