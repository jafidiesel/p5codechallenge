import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import './PassengerList.scss';
import { Container, Col, Row, Table, Button } from 'react-bootstrap';

const PassengerList = () => {
    
    const [passengers, setPassengers] = useState([]);
    
    useEffect( () => {
        async function fetchData() {
            let URL = process.env.REACT_APP_API_V1;
            const response = await axios.get(`${URL}/passenger`);
            setPassengers(response.data.data);
        }
        fetchData();
    },[])

    const renderPassengerTable = () => {
        
        if (passengers && passengers.length){
            return (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Flight N°</th>
                        <th>Amount of Packages</th>
                        <th>Withdraw all Packages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passengers.map((passenger, index) => {
                            return ( 
                                <tr key={`table-row-${index}`}>
                                    <td className="text-center" >{index}</td>
                                    <td className="text-center" >{passenger.username}</td>
                                    <td className="text-center" >{passenger.flightid}</td>
                                    <td className="text-center" ><Button size="sm">Check</Button></td>
                                    <td className="text-center" ><Button size="sm">Withdrawal</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )
        }else{
            return(
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Flight N°</th>
                            <th>Amount of Packages</th>
                            <th>Withdraw all Packages</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5">No passengers loaded.</td>
                        </tr>
                    </tbody>
                </Table>
                )
        }
    }

    return <Fragment>
        <Container fluid>
            <Row>
                <Col className="m-2">
                    {renderPassengerTable()}
                </Col>
            </Row>
        </Container>
    </Fragment>
}

export default PassengerList;