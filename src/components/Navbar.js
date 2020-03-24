import React, { useState, useContext } from 'react'
import logo from '../img/museLogo.png';
import { RouterContext, useCustomContext } from '../lib/mgmt.component.jsx';
import { Collapse, Navbar, NavbarToggler, NavbarBrand,
         Nav, NavItem, NavLink, Dropdown,
         DropdownToggle, DropdownMenu, DropdownItem,
         Media, Button } from 'reactstrap';

//Nav Icons
import designerIcon from '../img/icons/missionBuilder.png';
import threadBuilderIcon from '../img/icons/threadBuilder.png';
import metricIcon from '../img/icons/metricBuilder.png';
import knowledgeIcon from '../img/icons/knowledgeBase.png';
import notificationIcon from '../img/icons/notifications/0.png'
import missionThreadIcon from '../img/icons/thread.png'

//User Image
import userIcon from '../img/faces/MilitaryLady.png'

export const NavbarComp = () => {
    const [open, setOpen] = useState(false);
    const [openThread, setThread] = useState(false);
    const [openMissionNav, setMissionNav] = useState(false);
    const [{currPath}, _] = useCustomContext("Router");

    const toggleOpen = () => setOpen(prevStat => !prevStat);
    const toggleThread = () => setThread(prevState => !prevState);
    const toggleMissionNav = () => setMissionNav(prevState => !prevState);

    console.log(currPath);

    if (currPath !== '/' && currPath !== '/login'){
        return (
            <Navbar expand={"lg"} color={"light shadow"} light={true} >
                <Dropdown toggle={toggleOpen}>
                    <DropdownToggle
                                data-toggle={"dropdown"}
                                className={"mr-2"} 
                                aria-haspopup={true}
                                aria-expanded={open}
                                id={"navbarDropdown"}>
                        <span className={"navbar-toggler-icon"}/>
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby={"navbarDropdown"}>
                        <DropdownItem href={"/action"}
                                      onClick={toggleOpen}>Action</DropdownItem>
                        <DropdownItem href={"/anotherAction"}
                                      onClick={toggleOpen}>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem href={"/something"}
                                      onClick={toggleOpen}>Something Else Here</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarBrand href="/" className={"mr-auto"}>
                    <Media src={logo} className={"App-logo"} alt="MUSE logo" />
                </NavbarBrand>
                <NavbarToggler aria-controls={"navbarSupportedContent"}
                               aria-expanded={false} 
                               aria-label={"Toggle navigation"}
                               onClick={toggleMissionNav}>
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>
                <NavItem className={"Navbar-line"} />
                <Collapse isOpen={openMissionNav} id="navbarSupportedContent" navbar={true}>
                    <Nav navbar className={"mr-auto"}>
                        <NavItem>
                            <NavLink href={"/designer"}>
                                <Media src={designerIcon} 
                                    className={"Navbar-icon"}
                                    alt={"Mission Designer"}/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"/threadBuilder"}>
                                <Media src={threadBuilderIcon}
                                    className={"Navbar-icon"}
                                    alt={"Mission Thread Builder"}/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"/metricBuilder"}>
                                <Media src={metricIcon}
                                    className={"Navbar-icon"}
                                    alt={"Metric Builder"}/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={"/knowledgeBase"}>
                                <Media src={knowledgeIcon}
                                    className={"Navbar-icon"}
                                    alt={"Knowledge Base"}/>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                <Dropdown className={"Navbar-line-padding no-lst"} toggle={toggleThread}>
                    <DropdownToggle
                        data-toggle={"dropdown"}
                        aria-haspopup={true}
                        aria-expanded={openThread}
                        id={"dropdownMenuButton"}
                        className={"thread-button"}>
                        Thread Name 
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="dropdownMenuButton">
                        <DropdownItem href="/action">Action</DropdownItem>
                        <DropdownItem href="/anotherAction">Another Action</DropdownItem>
                        <DropdownItem href="/something">Something</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavItem className={"Navbar-line"} />
                <NavItem className={"Button-padding no-lst"} />
                <NavItem className={"User-circle-small"}>
                    <Media src={userIcon} className={"User-img-round"}
                           alt="User Icon"/>
                </NavItem>
                <NavItem className={"no-lst"}>
                    <Media src={notificationIcon} className={"Navbar-icon"} 
                           alt={"notifications"}/>
                </NavItem>
            </Navbar>
        );
    } else {
        return (
        <></>
        );
    }
}

// Have if statements on hiding depending on state.
// If not logged in, hide entirely
// If not in project, hide 4 Builder Icons on the Right of the logo