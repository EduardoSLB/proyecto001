import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <h1 style={{color: "white", fontSize:"2em"}}>Comunidad Campesina de Palca</h1>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/> 
        </nav>
    </header>
);

export default toolbar;