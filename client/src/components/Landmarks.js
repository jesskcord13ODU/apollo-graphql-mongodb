import React from 'react'
import { NavbarComp } from './Navbar';

export const Header = () => {
    return (
        <div className="FOUO-header">
            <div className="FOUO-text">
                FOUO - For Official Use Only
            </div>
            <NavbarComp />
        </div>
    )
}

export const Footer = () => {
    return (
        <div className="FOUO-footer">
            <div className="FOUO-text">
                FOUO - For Official Use Only
            </div>
        </div>
    )
}