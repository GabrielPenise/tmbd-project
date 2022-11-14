import { Axios } from "../utils";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import SearchText from "./SearchText";
import { Button } from "react-bootstrap";

export default function NavbarTmbd() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  const handlerLogOut = (e) => {
    Axios.post("/users/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Navbar bg="myDarkBlue" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>TMBD PROJECT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/favorites">
                Favorites
              </Nav.Link>
              {user ? (
                <Button className="btn-myBtnLigthBlue" onClick={handlerLogOut}>
                  Log out
                </Button>
              ) : (
                <>
                  <Link to="/">
                    <Button className="btn-myBtnLigthBlue">Sing In</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="btn-myBtnLigthBlue">Register</Button>
                  </Link>
                </>
              )}
            </Nav>

            {user ? (
              <>
                <Form className="d-flex justify-content-center">
                  <SearchText />
                </Form>
              </>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
