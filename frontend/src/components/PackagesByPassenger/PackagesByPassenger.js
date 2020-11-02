import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Col, Row, Table } from 'react-bootstrap';

const PackagesByPassenger = (props) => {
    
    const [packages, setPackages] = useState([]);
    
    useEffect( () => {
        const fetchData = async ()=> {
            let URL = process.env.REACT_APP_API_V1;
            let passengerId = props.match.params.passengerId;

            const response = await axios.get(`${URL}/package/${passengerId}`);
            setPackages(response.data.data);
        }
        fetchData();
    },[]);

    const renderPackagesTable = () => {
        
        if (packages && packages.length){
            return (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Package Code</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pack, index) => {
                            return ( 
                                <tr key={`table-row-${index}`}>
                                    <td className="text-center" >{index}</td>
                                    <td className="text-center" >{pack.packagecode}</td>
                                    <td className="text-center" >{categoryToTitle(pack.category)}</td>
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
                            <th>Package Code</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3">No Packages asociated to this passenger.</td>
                        </tr>
                    </tbody>
                </Table>
                )
        }
    }

    const categoryToTitle = (id) => {
        switch (parseInt(id,10)) {
            case 1:
                return "Big";
            case 2:
                return "Small";
            case 3:
                return "Clothes";
            default:
                return '';
        }
    }


    return <Fragment>
        <Container fluid>
            <Row>
                <Col className="m-2">
                    {renderPackagesTable()}
                </Col>
            </Row>
        </Container>
    </Fragment>
}

export default PackagesByPassenger;