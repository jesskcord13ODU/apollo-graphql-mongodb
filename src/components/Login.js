import React from 'react'
import {LoginButton} from './LoginModal';
import {NewUserButton} from './NewUserModal';
import logo from '../img/museLogo.png';
import '../App.css';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

export const Login = () => {
    return (
        <Card className="login modal-center shadow">
            <CardHeader className={"Login-padding text-center"}>
                <Row className="d-flex justify-content-center">
                    <Col>
                        <img src={logo} className="Login-logo Top-padding" alt="logo" />
                        <h5 className="font-weight-bold Top-padding">
                            Mission Engineering &amp; Integration
                        </h5>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody className="text-center">
                <Row className="d-flex justify-content-center">
                    <Col>
                        <LoginButton />
                        <div className={"Button-padding"}/>
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