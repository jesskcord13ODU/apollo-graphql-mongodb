import React from 'react'
import logo from '../img/museLogo.png';

//Nav Icons
import designerIcon from '../img/icons/missionBuilder.png';
import threadBuilderIcon from '../img/icons/threadBuilder.png';
import metricIcon from '../img/icons/metricBuilder.png';
import knowledgeIcon from '../img/icons/knowledgeBase.png';
import notificationIcon from '../img/icons/notifications/0.png'
import missionThreadIcon from '../img/icons/thread.png'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
            <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="navbar-toggler-icon" />
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>
            <a className="navbar-brand" href="#">
                <img src={logo} style={{height: '2.5vmin'}} alt="logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a href="#">
                        <img src={designerIcon} className="Navbar-icon" alt="Mission Designer" />
                    </a>
                </li>
                <li className="nav-item active">
                    <a href="#">
                        <img src={threadBuilderIcon} className="Navbar-icon" alt="Thread Builder" />
                    </a>
                </li>
                <li className="nav-item active">
                    <a href="#">
                        <img src={metricIcon} className="Navbar-icon" alt="Metric Builder" />
                    </a>
                </li>
                <li className="nav-item active">
                    <a href="#">
                        <img src={knowledgeIcon} className="Navbar-icon" alt="Knowledge Base" />
                    </a>
                </li>
                </ul>
                <div className="dropdown">
                    <button className="btn btn-secondary  btn-sm dropdown-toggle Navbar-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Thread Name <img src={missionThreadIcon} style={{height: '2vmin'}} />
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
                <a href="#">
                    <img src={notificationIcon} className="Navbar-icon" alt="Notifications" />
                </a>
            </div>
        </nav>
    )
}

export default Navbar;

// Have if statements on hiding depending on state.
// If not logged in, hide entirely
// If not in project, hide 4 Builder Icons on the Right of the logo