import React, { useState } from "react";
import whatsapplogo from "../assets/whatsapplogo.png";
import { Container, Form, Button, Col, Row, Card } from "react-bootstrap";
// import { Container, Form, Button, Col, Row, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const ApiUrl = process.env.REACT_APP_API_URL;

const Signup = ({ routerProps }) => {
  const [name, setName] = useState(""); // eslint-disable-line
  const [surname, setSurname] = useState(""); // eslint-disable-line
  // const [area, setArea] = useState("");
  const [email, setEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  // const [profile, setProfile] = useState("");
  const [validated, setValidated] = useState(false);
  const [isValid, setisValid] = useState(false); // eslint-disable-line

  const [show, setShow] = useState(false); // eslint-disable-line

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const signup = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (signupPassword.length < 8) {
      setisValid(false);
    }

    try {
      const newUser = {
        name: name,
        surname: surname,
        email: email,
        username: signupUsername,
        password: signupPassword,
      };
      const res = await fetch(`${ApiUrl}/users/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        routerProps.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center " style={{ minHeight: "100vh" }}>
        <Col xs={8} md={9}>
          <Form noValidate validated={validated} className="signup-container px-4 py-5">
            <Row>
              <Col xs={12} lg={7}>
                <h3>Create your Account</h3>
                <p className="text-muted mb-4">It's quick and easy</p>

                <Row>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>

                    <Form.Control required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
                    <Form.Control.Feedback type="invalid">Please enter your email address.</Form.Control.Feedback>
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="signupUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control required value={signupUsername} onChange={(e) => setSignupUsername(e.target.value)} type="text" placeholder="Username" />
                  <Form.Control.Feedback type="invalid">Please enter your username.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="signupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required minLength="8" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} type="password" placeholder="Enter password" />
                  <Form.Control.Feedback type="invalid">Please enter your password more than 8 characters.</Form.Control.Feedback>

                  <Form.Text className="text-muted">Use 8 or more characters with a mix of letters, numbers & symbols</Form.Text>
                </Form.Group>
                <div className="d-grid gap-2 mt-4 mb-4">
                  <Button variant="primary" size="lg" onClick={signup} type="button">
                    SignUp
                  </Button>
                </div>
                <Row className="d-grid gap-2 justify-content-md-center mb-2">
                  <p>
                    Already have an account? Login
                    <Link to="/">
                      <span className="m-1">here</span>
                    </Link>
                  </p>
                </Row>
              </Col>
              <Col className="box signuplogo">
                <Card className="logo">
                  <Card.Img variant="top" src={whatsapplogo} alt="whatsappLogo" />
                  <Card.Body>
                    <p className="text-muted mb-3  d-flex justify-content-md-center">Simple. Secure. Reliable messaging</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default Signup;
