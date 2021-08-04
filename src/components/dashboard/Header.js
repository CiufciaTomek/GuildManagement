import React, { useEffect, useState } from 'react'

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import LogoutContainer from '../../redux/user/containers/LogoutContainer';
import ProfilHeader from '../../redux/user/containers/ProfilHeader';

import { FiMoreHorizontal } from "react-icons/fi";

const Header = () => {

    const [collapse, toggleCollapse] = useState(false)
    const [collapseMobile, toggleCollapseMobile] = useState(true)
   // console.log(document.getElementsByClassName['mobile-header-btn'])

    useEffect(() => {
        if(window.getComputedStyle(document.getElementsByClassName('mobile-header-btn')[0]).display === 'block') {
            toggleCollapseMobile(false)
        } else toggleCollapseMobile(true)
    },[])

    return (
        <div className='header'>
            <div className='header-nav'>
                <div className='nav-title'>
                    Guild Management
                </div>
                <FiMoreHorizontal className='mobile-header-btn' onClick={() => {
                    toggleCollapseMobile(!collapseMobile)
                }}/>
                <div className='nav' style={collapseMobile ? {display: 'flex'} : {display: 'none'}}>
                    <p className='nav-element'><Link to="/">Home</Link></p>
                    <p className='nav-element'><Link to="/blacklist">Blacklist</Link></p>
                    <p className='nav-element'><Link to='/zvz'>ZVZ</Link></p>
                    <p className='nav-element'>
                        <span onClick={() => toggleCollapse(!collapse)}>Rday</span>
                        <div className={collapse ? 'nav-collapse show' : 'nav-collapse'}>
                            <p className='collapse-nav-element' onClick={() => toggleCollapse(!collapse)}><Link to='/rday'>Deklaracje</Link></p>
                            <p className='collapse-nav-element' onClick={() => toggleCollapse(!collapse)}><Link to='/rday-sets'>Sety</Link></p>
                        </div>
                    </p>
                    <p className='nav-element'><Link to='/regear'>Regear</Link></p>
                    <p className='nav-element'><Link to='/armory'>Armory</Link></p>
                </div>
                <ProfilHeader />
                <LogoutContainer />
            </div>
        </div>
    )
}

export default Header