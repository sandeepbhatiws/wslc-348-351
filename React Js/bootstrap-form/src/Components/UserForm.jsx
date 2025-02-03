import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function UserForm({allUserData, setAllUserData}) {

    var name = useRef();
    var email = useRef();
    var mobileNumber = useRef();

    const formHandler = (event) => {
        event.preventDefault();

        const data = {
            name : name.current.value,
            email : email.current.value,
            mobile_number : mobileNumber.current.value,
        }

        setAllUserData([data, ...allUserData]);
        event.target.reset();

    }
    return (
        <>
            <Form autoComplete='off' onSubmit={ formHandler }>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" ref={name}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={email}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicMobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Mobile Number" ref={mobileNumber}/>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}
