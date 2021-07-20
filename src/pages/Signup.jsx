import React, { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap"

const ApiUrl = process.env.REACT_APP_API_URL

const Signup = () => {



    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [area, setArea] = useState("");
    const [email, setEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [profile, setProfile] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const signup = async () => {
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
            } 
        } catch (error) {
            console.log(error);
        }
    };


    return (

        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >

            <Form className="login-container p-5">
                <h3 className="my-3">SignUp</h3>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type='text'
                        placeholder='Enter name'
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='surname'>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        type='text'
                        placeholder='Enter surname'
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        placeholder='Enter email'
                    />
                    <Form.Text className='text-muted'>
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='signupUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value)}
                        type='text'
                        placeholder='Enter username'
                    />
                </Form.Group>
                <Form.Group className='mb-3' controlId='signupPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        type='password'
                        placeholder='Enter password'
                    />
                </Form.Group>

                <Button onClick={signup} className="me-4" variant='primary' type='button'>
                    SignUp
                </Button>
            </Form>
        </Container>
    );
}

export default Signup;
