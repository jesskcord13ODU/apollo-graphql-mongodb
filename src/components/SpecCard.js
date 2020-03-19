import React, { useState} from 'react';
import { Card, CardBody, Container, Row, Col, Modal, ModalBody} from 'reactstrap';



const SpecCard = ({ iconImage, bodyImage, title, description, color, order}) => {
    
    const [modal, setModal] = useState(false);

    const toggleEditModal = () => setModal(!modal);
    
    //--Child Components--//

    const EditModal = () => {
        return (
            <Modal isOpen={modal} toggle={toggleEditModal}>
                <ModalBody>
                   Card clicked: {title} 
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