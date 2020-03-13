import React from 'react'
import Navbar from './Navbar';

const Header = () => {
    return (
        <div className="FOUO-header">
            <div className="FOUO-text">
                FOUO - For Official Use Only
            </div>
            <Navbar />
        </div>
    )
}

const Footer = () => {
    return (
        <div className="FOUO-footer">
            <div className="FOUO-text">
                FOUO - For Official Use Only
            </div>
        </div>
    )
}

export {Header, Footer}