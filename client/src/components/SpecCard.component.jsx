import React, { useState} from 'react';
import { Card, CardBody, Container, Row, Col, Modal, ModalBody, ModalHeader, Form, FormGroup, FormText, Label, Input, Button, FormFeedback} from 'reactstrap';
import { useCustomContext } from '../lib/mgmt.component.jsx';

import { CommentList } from './CommentList';



export const SpecCard = ({ iconImage, bodyImage, title, description, color, order, currTab}) => {
    const [modal, setModal] = useState(false);

    const toggleEditModal = () => setModal(!modal);
    //--Event Handlers--//
    const doubleClickHandler = ev => {
        console.log("Card clicked: " + title);
        toggleEditModal();
    }

    const dragStartHandler = ev => {
        ev.dataTransfer.dropEffect = "move";  
    }

    const dragOverHandler = ev => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }

    const dropHandler = ev => {
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
            className={"shadow-sm spec-card "}
            style={{borderTopColor: color}}
            >
            <EditModal modal={modal} toggleEditModal={toggleEditModal}
                       bodyImage={bodyImage} description={description}
                       title={title} color={color} order={order} 
                       currTab={currTab}/> {/* isOpen={modal} toggle={toggle}*/}
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

const EditModal = ({ modal, toggleEditModal, iconImage, bodyImage, title, description, color, order, currTab }) => {
    const [{ Mission }, setMission] = useCustomContext('global');    

    const submitForm = e => {
        let updatedEntry = Mission.specificationsT[currTab]["specEntries"][order];
        
        for (const ele of e.target.parentElement) {
            if (ele.tagName === "INPUT" &&  ele.value === "") { continue; }
            if (ele.tagName === "BUTTON") { continue; }
            console.log(ele);
            updatedEntry[ele.name] = ele.value;
        }

        const updatedMission = Mission;
        updatedMission.specificationsT[currTab]["specEntries"][order] = updatedEntry;

        setMission({
            type: 'setMission',
            Mission: updatedMission
        });

        console.log(Mission);

        fetch(`http://${process.env.REACT_APP_HOST}/updateMissionSpec`, {
            method: "POST",
            body: JSON.stringify({
                "missionId": Mission.missionId,
                "spec": currTab,
                "entryIdx": order,
                "specEntry": updatedEntry
            }),
            Headers: {
                'Content-Type':'application/json'
            }
        })
        .then(res => res.status)
        .catch(err => alert(err));

        toggleEditModal();
    }

    const fileUpload = (input) => {
        console.log(input);
        const files = input.target.files;
        if (files.length > 0) {
            let reader = new FileReader();
            
            reader.addEventListener('loadend', e => {
                console.log(e.target);
                document.getElementById("bodyImage").setAttribute("src", e.target.result);
            });

            reader.readAsDataURL(files[0]);
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
                                    <Input type={"text"} name={"title"} id={"specTitle"} defaultValue={title}/>
                                    <FormFeedback>TODO: invalid text here</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for={"specDesc"}>Description</Label>
                                    <Input type={"textarea"} rows={"3"} name={"description"} id={"specDesc"} defaultValue={description}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for={"bannerColor"}>Banner Color</Label>
                                    <Input type={"color"} name={"color"} id={"bannerColor"} defaultValue={color}/>
                                    <FormText color="muted">
                                        Click the above to select a color.
                                    </FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleFile">Image</Label>
                                    <img id={"bodyImage"} src={require(`../img/${bodyImage}`)} className={"img-fluid img-thumbnail"} alt={"Body"}/>
                                    <Input type={"file"} name={"bodyImage"} id={"exampleFile"} onChange={fileUpload} />
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

//--Child Components--//   
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