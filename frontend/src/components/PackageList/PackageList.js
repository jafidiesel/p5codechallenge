import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import './PackageList.scss';
import { Container, Col, Row, Table } from 'react-bootstrap';

const PackageList = () => {
    
    const [packages, setPackages] = useState([]);
    
    useEffect( () => {
        async function fetchData() {
            let URL = process.env.REACT_APP_API_V1;
            const response = await axios.get(`${URL}/package`);
            setPackages(response.data.data);
        }
        fetchData();
    },[]);

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
                            <td colSpan="5">No Packages loaded.</td>
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
                    {renderPackagesTable()}
                </Col>
            </Row>
        </Container>
    </Fragment>
}

export default PackageList;