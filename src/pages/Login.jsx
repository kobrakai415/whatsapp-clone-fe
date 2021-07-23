import React, { useState } from "react";
import whatsapplogo from "../assets/whatsapplogo.png";
import { Container, Form, Button, Col, Row, Card } from "react-bootstrap";
// import { Container, Form, Button, Col, Row, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ApiUrl = process.env.REACT_APP_API_URL;

const Login = ({ routerProps }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const login = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
   
    try {
      const details = {
        email: username,
        password: password,
      };
      const res = await fetch(`${ApiUrl}/users/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(details),
      });

      if (res.ok) {
        setValidated(true);
        const json = await res.json();
        localStorage.setItem("accessToken", json.accessToken);
        localStorage.setItem("refreshToken", json.refreshToken);
        localStorage.setItem("username", json.username);
        routerProps.history.push("/user");
      } else {
        alert("Credentials are incorrect");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      {/* <div className=" mb-5 d-flex justify-content-md-center">
        <Image src={whatsapplogo} height="100" rounded />
      </div> */}
      <Col xs={8} md={5}>
        <Form noValidate validated={validated} className="py-4 px-4 login-container">
          <Col className="box">
            <Card className="logo" style={{ width: "15rem" }}>
              <Card.Img variant="top" src={whatsapplogo} alt="whatsappLogo" />
            </Card>
          </Col>
          <Col className="box">
            <Card className="logo" style={{ width: "18rem" }}>
              <Card.Body>
                <p className="text-muted   d-flex justify-content-md-center ">Simple. Secure. Reliable messaging</p>
                <h4 className="   d-flex justify-content-md-center ">Log in to Whatsapp</h4>
              </Card.Body>
            </Card>
          </Col>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Email address</Form.Label>
            <Form.Control required value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Email Address" />
            <Form.Control.Feedback type="invalid">Please enter your email address</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>

            <Form.Control required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
          </Form.Group>
          <div className="d-grid gap-2 mb-4">
            <Button className="d-grid gap-2 " variant="primary" size="lg" onClick={login} disabled={username.length < 0 && password.length < 0 ? true : false} type="button">
              Login{" "}
            </Button>
          </div>
          <Row className="d-grid gap-2 justify-content-md-center mb-2">
            <Link to="/">
              <p>Forgot your password?</p>
            </Link>{" "}
          </Row>
          <div className="d-grid gap-2 justify-content-md-center mb-3">
            <Link to="/signup">
              <Button className="ml-3" variant="success" size="lg" type="button">
                Create New Account
              </Button>
            </Link>
          </div>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
