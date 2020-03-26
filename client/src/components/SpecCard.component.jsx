import React, { useState} from 'react';
import { Card, CardBody, Container, Row, Col, Modal, ModalBody, ModalHeader, Form, FormGroup, FormText, Label, Input, Button, FormFeedback} from 'reactstrap';
import { useCustomContext } from '../lib/mgmt.component.jsx';

import { CommentList } from './CommentList';



export const SpecCard = ({ iconImage, bodyImage, title, description, color, order}) => {
    const [modal, setModal] = useState(false);
    const [{ Mission }, setMission] = useCustomContext('global');

    const toggleEditModal = () => setModal(!modal);
    
    //--Child Components--//

    const EditModal = () => {
        
        const titleInvalid = () => {
            return false;
        }

        const submitForm = () => {
            let form = document.querySelector("form");
            let formData = new FormData(form);
            let formJson = {};
            for (const [key, value] of formData.entries()) {
                formJson[key] = value;
            }
            
            toggleEditModal();
        }

        const fileUpload = (input) => {
            if (input.files && input.files[0]) {

                let reader = new FileReader();
                reader.onloadend = (e) => {
                    document.getElementById("bodyImage").setAttribute("src", e.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

        return (
            <Modal className={"edit-modal"} isOpen={modal} toggle={toggleEditModal}>
                <ModalHeader>
                    Edit Specification: {title}
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <Row>
                            <Col xs={"8"}>
                                <Form>
                                    <FormGroup>
                                        <Label for={"specTitle"}>Title</Label>
                                        <Input invalid={titleInvalid()} type={"text"} name={"title"} id={"specTitle"} defaultValue={title}/>
                                        <FormFeedback invalid>TODO: invalid text here</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for={"specDesc"}>Description</Label>
                                        <Input type={"textarea"} rows={"3"} name={"description"} id={"specDesc"} defaultValue={description}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for={"bannerColor"}>Banner Color</Label>
                                        <Input type={"color"} name={"color"} id={"bannerColor"}/>
                                        <FormText color="muted">
                                            Click the above to select a color.
                                        </FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleFile">Image</Label>
                                        <img id={"bodyImage"} src={require(`../img/${bodyImage}`)} className={"img-fluid img-thumbnail"} alt={"Body"}/>
                                        <Input type={"file"} name={"file"} id={"exampleFile"} onChange={fileUpload} />
                                        <FormText color={"muted"}>
                                            TODO: This is some placeholder block-level help text for the above input.
                                            Add a message here regarding image size, file size, type, etc.
                                        </FormText>
                                    </FormGroup>
                                    <Button onClick={submitForm}>Submit</Button>
                                </Form>
                            </Col>
                            <Col xs={"4"}>
                                <CommentList />
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>
        );
    }
    
    const SpecContextButton = () => {
        return (
            <img src={require(`../img/icons/ellipsis.png`)} className={"img-fluid"} alt={""} />
        )
    }
    
    const SpecCommentsButton = () => {
        return (
            <img src={require(`../img/icons/comment.png`)} className={"img-fluid"} alt={""} />
        )
    }
    
    const SpecStatus = () => {
        return (
            <img src={require(`../img/icons/checkmark.png`)} className={"img-fluid"} alt={""} />
        )
    }

    //--Event Handlers--//

    const doubleClickHandler = (ev) => {
        console.log("Card clicked: " + title);
        toggleEditModal();
    }

    const dragStartHandler = (ev) => {
        ev.dataTransfer.dropEffect = "move";  
    }

    const dragOverHandler = (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }

    const dropHandler = (ev) => {
        ev.preventDefault();
        // ev.target.parentNode.insertBefore(document.createTextNode("test"), ev.target);
    }

    return (
        <Card 
            draggable={"true"}
            onDoubleClick={doubleClickHandler}
            onDragStart={dragStartHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
            className={"shadow-sm spec-card " + color}
            >
            <EditModal/> {/* isOpen={modal} toggle={toggle}*/}
            <CardBody>
                <Container>
                    <Row>
                        <Col xs={"1"}>
                            <img src={require(`../img/icons/${iconImage}`)} className={"img-fluid"} alt={"Icon"}/>
                        </Col>
                        <Col xs={"7"}>
                            <h3 className={"card-title"}>{title}</h3>
                            <p className={"card-text"}>{description}</p>
                        </Col>
                        <Col xs={"3"}>
                            <img src={require(`../img/${bodyImage}`)} className={"img-fluid img-thumbnail"} alt={"Body"}/>
                        </Col>
                        <Col xs={"1"}>
                            <SpecContextButton />
                            <SpecStatus />
                            <SpecCommentsButton />
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    )
}