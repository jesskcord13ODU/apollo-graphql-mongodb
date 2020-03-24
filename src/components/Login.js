import React from 'react'
import {LoginButton} from './LoginModal';
import {NewUserButton} from './NewUserModal';
import logo from '../img/museLogo.png';
import '../App.css';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

export const Login = () => {
    return (
        <Card className="shadow">
            <CardHeader className={"Login-padding"}>
                <img src={logo} className="App-logo" alt="logo" />
                <h5 className="font-weight-bold">
                    Mission Engineering &amp; Integration
                </h5>
            </CardHeader>
            <CardBody className="text-center">
                <Row className="d-flex justify-content-center">
                    <Col xs={"8"}>
                        <LoginButton />
                        <NewUserButton />
                    </Col>
                </Row>
                <span className="text-center Login-padding Login-body">
                    Or <a href="#">Login using a CAC / PIV card</a>
                </span>
            </CardBody>
        </Card>
    );
}