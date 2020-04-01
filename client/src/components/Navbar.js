import React, { useState, useContext } from 'react'
import logo from '../img/museLogo.png';
import { useCustomContext } from '../lib/mgmt.component.jsx';
import { Collapse, Navbar, NavbarToggler, NavbarBrand,
         Nav, NavItem, Dropdown,
         DropdownToggle, DropdownMenu, DropdownItem,
         Media, Button } from 'reactstrap';
import { isEmpty } from '../lib/utility';
import { Link } from '../lib/router.component';

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
    const [{Mission}, __] = useCustomContext("global");

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
                <Link url={!isEmpty(Mission) ? "/mission" : "/"} className={"mr-auto navbar-brand"}>
                    <Media src={logo} className={"App-logo"} alt="MUSE logo" />
                </Link>
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
                            <Link url={"/designer"} className={"nav-link"}>
                                <Media src={designerIcon} 
                                    className={"Navbar-icon"}
                                    alt={"Mission Designer"}/>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link url={"/threadBuilder"} className={"nav-link"}>
                                <Media src={threadBuilderIcon}
                                    className={"Navbar-icon"}
                                    alt={"Mission Thread Builder"}/>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link url={"/metricBuilder"} className={"nav-link"}>
                                <Media src={metricIcon}
                                    className={"Navbar-icon"}
                                    alt={"Metric Builder"}/>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link url={"/knowledgeBase"} className={"nav-link"}>
                                <Media src={knowledgeIcon}
                                    className={"Navbar-icon"}
                                    alt={"Knowledge Base"}/>
                            </Link>
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