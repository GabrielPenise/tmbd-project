import React, { useState } from "react";
import { Axios } from "../utils";

import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Col, Row } from "react-bootstrap";

export default function UserLoguin() {
  //UseFullVars
  const initialState = { email: "", password: "" };

  //HOOKS
  const [login, setLoguin] = useState(initialState);

  const navigate = useNavigate();

  const { user, setUser } = useAuthContext();

  //Handles and Functions

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoguin({ ...login, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("/users/login", login)
      .then((usuario) => {
        setUser(usuario.data);
        navigate(`/${usuario.data.name}${usuario.data.lastname}`);
      })
      .catch(() => {
        alert("Usuario o contraseña incorrecta");
        setLoguin(initialState);
      });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} className="bg-darkOpacity rounded-5 p-4 mt-4 ">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={login.email}
                  onChange={handleInput}
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={handleInput}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Button className="btn-myBtnLigthBlue" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
