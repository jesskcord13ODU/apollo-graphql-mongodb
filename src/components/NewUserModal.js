import React, { useState } from 'react'
import logo from '../img/museLogo.png';

import { Button, Modal, ModalHeader, ModalBody, Media, 
         FormGroup, Label, Input } from 'reactstrap';
import { Link } from '../lib/router.component.jsx';

export const NewUserButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <main>
            <Button className={"w-75"} color={"primary"} onClick={toggleOpen}>
                New User
            </Button>
            <Modal isOpen={isOpen} 
                   toggle={toggleOpen}
                   centered={true}>
                <ModalHeader toggle={toggleOpen} 
                             className={"center-modal-header"}>
                    <img src={logo} className={"Modal-logo"} alt={"logo"} />
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for={"emailInput"}>Email Address</Label>
                        <Input type={"email"} 
                            id={"emailInput"}
                            placeholder={"Enter Username..."} />
                    </FormGroup>
                    <FormGroup>
                        <Label for={"passwdInput"}>Password</Label>
                        <Input type={"password"}
                            id={"passwdInput"}
                            placeholder={"Enter password..."} />
                    </FormGroup>
                    <FormGroup>
                        <Label for={"passwdInput"}>Re-enter Pasword</Label>
                        <Input type={"password"}
                            id={"passwdInput"}
                            placeholder={"Enter password..."} />
                    </FormGroup>
                    <Link className={"center-modal-footer"} name={"Submit"} url={"/mission"} />
                </ModalBody>
            </Modal>
        </main>
    )
}