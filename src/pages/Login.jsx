import React, { useState, useEffect } from 'react';
import { Container, Form, Button, } from 'react-bootstrap';
import { Link } from "react-router-dom"

const ApiUrl = process.env.REACT_APP_API_URL

const Login = ({routerProps}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const login = async () => {
        try {
            const details = {
                email: username,
                password: password
            }
            const res = await fetch(`${ApiUrl}/users/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(details)
            })

            if(res.ok) {
                const json = await res.json()
                localStorage.setItem("accessToken", json.accessToken)
                localStorage.setItem("refreshToken", json.refreshToken)
                localStorage.setItem("username", json.username)
                routerProps.history.push("/user")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <div>

                <Form className='p-5 login-container'>
                    <h3 className="my-3">Login</h3>
                    <Form.Group className='mb-3' controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type='text'
                            placeholder='Enter username'
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            placeholder='Password'
                        />
                    </Form.Group>

                    <Button onClick={login} className="me-4" variant='primary' disabled={username.length < 0 && password.length < 0 ? true : false} type='button'>
                        Login
                    </Button>
                    <Link to="/signup">

                        <Button

                            className='ml-3'
                            variant='primary'
                            type='button'>
                            SignUp
                        </Button>
                    </Link>
                    <Button className="ms-4" href="http://localhost:3000/authors/googleLogin" variant='primary' type='button'>
                        Login with google
                    </Button>
                </Form>

            </div>
        </Container>
    );
}

export default Login;
