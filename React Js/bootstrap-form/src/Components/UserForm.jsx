import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

export default function UserForm({allUserData, setAllUserData}) {

    const [formStatus, setFormStatus] = useState(false);

    var name = useRef();
    var email = useRef();
    var mobileNumber = useRef();

    const formHandler = (event) => {
        event.preventDefault();
        setFormStatus(true);
        const data = {
            name : name.current.value,
            email : email.current.value,
            mobile_number : mobileNumber.current.value,
        }

        toast.success('Form sumitted successfully.',{
            position: "bottom-left",
        });

        setAllUserData([data, ...allUserData]);
        event.target.reset();

    }

    const closeButton = () => {
        setFormStatus(false);
    }

    return (
        <>
            {
                formStatus
                ?
                <div class="bg-success text-white d-flex justify-content-between p-3">
                    <div>Form submitted successfully.</div>
                    <button type="button" onClick={ closeButton } class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                :
                ''
            }
            
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
