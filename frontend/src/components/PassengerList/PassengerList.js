import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import './PassengerList.scss';
import { Container, Col, Row, Table, Button, Modal, Spinner, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PassengerList = () => {
    
    const [passengers, setPassengers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [passengerSelected, setPassengerSelected] = useState([]);
    const [packagesOfPassenger, setPackagesOfPassenger] = useState([]);
    const [showToast, setShowToast] = useState(false);

    const [isDeleting, setIsDeleteing] = useState(false);

    const withdrawPassenger = (event) =>{
        let local_passenger = passengers.filter( pass => pass.passengerid === parseInt(event.target.id,10));
        setPassengerSelected(local_passenger);
        packagesByPassenger(local_passenger[0].passengerid);
        
        toggleModal();
    }

    const toggleModal = () => {
        if(modalOpen) {
            //isOpen
            setTimeout( () => setPassengerSelected([]), 6000);
        }
        setModalOpen(!modalOpen);
        setIsDeleteing(false);
    }

    const witdrawAllPackages = async () => {
        setIsDeleteing(true);
        let URL = process.env.REACT_APP_API_V1;
        const response = await axios.delete(`${URL}/package/${passengerSelected[0].passengerid}`);
        if(response.data.data.length) {
            setPackagesOfPassenger(response);
            setShowToast(true);
        };
        toggleModal();
        setIsDeleteing(false);
    }

    const packagesByPassenger = async (passengerid) => {
        let URL = process.env.REACT_APP_API_V1;
        const response = await axios.get(`${URL}/package/${passengerid}`);
        if(response.data.data.length) setPackagesOfPassenger(response.data.data);
    }

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
                                    <td className="text-center" ><Link to={`/${passenger.passengerid}/packages`} ><Button size="sm">Check</Button></Link></td>
                                    <td className="text-center" ><Button id={passenger.passengerid} onClick={withdrawPassenger} size="sm">Withdrawal</Button></td>
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
        <Modal
            show={modalOpen}
            onHide={toggleModal}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Withdraw All Packages</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {
                    !packagesOfPassenger.length
                        ? <p>This passenger doesn't have any packages registered.</p>
                        : <p>Are you sure you want to Withdraw all packages from <b>{passengerSelected[0]?.username}</b> flight id <b>{passengerSelected[0]?.flightid}</b> ? </p>
                    }
                
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={toggleModal} >Cancel</Button>
                <Button 
                    variant="primary"
                    onClick={witdrawAllPackages}
                    disabled={!packagesOfPassenger.length}>
                    {   
                        isDeleting
                        ? <Spinner animation="border" variant="light" />
                        :"Withdraw"
                    }
                </Button>
            </Modal.Footer>
        </Modal>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide className="toast-notification">
            <Toast.Header>
                <strong className="mr-auto">Atention!</strong>
            </Toast.Header>
            <Toast.Body>Packages withrawal from {passengerSelected[0]?.username}</Toast.Body>
        </Toast>
    </Fragment>
}

export default PassengerList;