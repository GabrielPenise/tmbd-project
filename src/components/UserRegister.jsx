import { Axios } from "../utils";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Col, Row } from "react-bootstrap";

export default function UserRegister() {
  const navigate = useNavigate();
  const initialState = { email: "", password: "", name: "", lastname: "" };
  const [registerPayload, setRegisterPayload] = useState(initialState);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterPayload({ ...registerPayload, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("/users/register", registerPayload);
    navigate("/");
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
                  value={registerPayload.email}
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
                  placeholder="Password"
                  value={registerPayload.password}
                  onChange={handleInput}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={registerPayload.name}
                  onChange={handleInput}
                  placeholder="Enter your name.."
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={registerPayload.lastname}
                  onChange={handleInput}
                  placeholder="Enter your lastname.."
                  required
                />
              </Form.Group>

              <Button className="btn-myBtnLigthBlue" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
