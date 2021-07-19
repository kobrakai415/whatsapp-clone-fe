import React, { useState, useEffect } from 'react';
import { Container, Form, Button, } from 'react-bootstrap';

const Home = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const login = async () => {
        try {
            const res = await fetch()

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

                    <Button className="me-4" variant='primary' disabled={username.length < 0 && password.length < 0 ? true : false} type='button'>
                        Login
                    </Button>
                    <Button

                        className='ml-3'
                        variant='primary'
                        type='button'>
                        SignUp
                    </Button>
                    <Button className="ms-4" href="http://localhost:3000/authors/googleLogin" variant='primary' type='button'>
                        Login with google
                    </Button>
                </Form>

            </div>
        </Container>
    );
}

export default Home;
