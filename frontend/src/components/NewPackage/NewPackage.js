import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './NewPackage.scss';
import { Form, Button, Container, Row, Col, Card, Alert, Dropdown, DropdownButton } from 'react-bootstrap';

const NewPackage = (props) => {
    const [category, setCategory] = useState("");
    const [passengerId, setPassengerId] = useState(0);
    const [passengerUsername, setPassengerUsername] = useState("");
    const [passengers, setPassengers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect( () => {
        async function fetchData() {
            let URL = process.env.REACT_APP_API_V1;
            const response = await axios.get(`${URL}/passenger`);
            setPassengers(response.data.data);
        }
        fetchData();
    },[])

    const handleSelectCategory=(event)=>{
        setCategory(event);
        setErrorMessage("");
    }

    const handleSelectPassenger=(event)=>{
        setPassengerId(event);
        let passengerSelected = passengers.filter(p => parseInt(p.passengerid, 10) === parseInt(event, 10));
        if(passengerSelected.length) setPassengerUsername(passengerSelected[0].username);
        setErrorMessage("");
    }

    const submitForm = async (event) => {
        event.preventDefault();
        if(category !== 0 && passengerId !== 0){
            let URL = process.env.REACT_APP_API_V1;

            await axios.post(`${URL}/package`,{
                passengerId: parseInt(passengerId, 10),
                category: parseInt(category, 10)
            },{
                headers: { 
                    'Content-Type': 'application/json'
                }
            })
                .then( (response) =>{
                    if(response.status===200){
                        setCategory("");
                        setPassengerId(0);
                        props.history.push("/");
                    }
                })
                .catch(err => {
                    setErrorMessage("There was an error submiting the form");
                })
        }else{
            setErrorMessage("There was an error submiting the form");
        }
    }

    return (
        <Container>
            <Row>
                <Col className="m-3">
                    <h1>New Package</h1>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={submitForm}>
                                <Form.Group as={Row} controlId="formCategory">
                                    Category:
                                    <DropdownButton
                                        alignRight
                                        title={!category ? 'Select a category' : category}
                                        onSelect={handleSelectCategory}
                                    >
                                        <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                        <Dropdown.Item eventKey="3">3</Dropdown.Item>
                                    </DropdownButton>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPassenger">
                                    Passenger:
                                    <DropdownButton
                                        alignRight
                                        title={!passengerUsername ? 'Select a Passenger' : passengerUsername}
                                        onSelect={handleSelectPassenger}
                                    >
                                        {
                                            passengers.map((passenger, index) => (
                                            <Dropdown.Item key={`passenger-dropdown-${index}`} eventKey={passenger.passengerid}>{passenger.username}</Dropdown.Item>
                                            ))
                                        }
                                    </DropdownButton>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Save Package
                                </Button>
                            </Form>
                            {
                                errorMessage
                                ? <Alert variant={'danger'} className="my-2">
                                    {errorMessage}
                                </Alert>
                                : null
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default NewPackage;