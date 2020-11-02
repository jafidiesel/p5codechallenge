import React, { useState } from 'react';
import axios from 'axios';

import './NewPassenger.scss';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

const NewPassenger = (props) => {
    const [name, setName] = useState("");
    const [flightId, setFlightId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleName = (event)=>{
        setName(event.target.value);
        setErrorMessage("");
    }
    
    const handleFlightId = (event)=>{
        setFlightId(event.target.value);
        setErrorMessage("");
    }

    const submitForm = async (event) => {
        event.preventDefault();
        if(name !== '' && flightId !== ''){
            let URL = process.env.REACT_APP_API_V1;
            const response = await axios.post(`${URL}/passenger`,{
                username: name,
                flightId: flightId
            },{
                headers: { 
                    'Content-Type': 'application/json'
                }
            });
    
            if(response.status===200){
                setName("");
                setFlightId("");
                props.history.push("/");
            }else{
                setErrorMessage("There was an error submiting the form");
            }
        }else{
            setErrorMessage("There was an error submiting the form");
        }
    }

    return (
        <Container>
            <Row>
                <Col className="m-3">
                    <h1>New Passenger</h1>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={submitForm}>
                                <Form.Group controlId="passengerName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Passenger name" value={name} onChange={handleName}/>
                                </Form.Group>

                                <Form.Group controlId="passengerFlightId">
                                    <Form.Label>Flight Id</Form.Label>
                                    <Form.Control type="text" placeholder="Passenger Id Flight" value={flightId} onChange={handleFlightId}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save Passenger
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

export default NewPassenger;