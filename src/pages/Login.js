import React from 'react'
import {LoginButton} from '../components/LoginModal';
import {NewUserButton} from '../components/NewUserModal';
import logo from '../img/museLogo.png';
import '../App.css';

const Login = () => {
    return (
        <div className="col-xl-3 col-lg-5 col-md-7 col-sm-8 col-9 text-center">
            <div className="card shadow">
                <div className="card-body text-center">
                    <div className="Login-padding">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <h5 className="font-weight-bold Login-padding">
                        Mission Engineering & Integration
                    </h5>
                    <div className="row d-flex justify-content-center">
                        <div className="col-8">
                            <div>
                                <LoginButton />
                            </div>
                            <div>
                                <NewUserButton />
                            </div>
                        </div>
                    </div>
                    <span className="text-center Login-padding Login-body">
                        Or <a href="#">Login using a CAC / PIV card</a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login