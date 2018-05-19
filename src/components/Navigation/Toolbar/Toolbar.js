import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToogleClicked}></DrawerToggle>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <h1 style={{color: "white", fontSize:"24px"}}>Comunidad Campesina de Palca</h1>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/> 
        </nav>
    </header>
);

export default toolbar;