import React from 'react';
import ReactTooltip from 'react-tooltip'
import icono from './imagen2.jpe'
//import tarmaLogo from '../../assets/images/catedral.jpg';
//import classes from './Logo.css';

const logo = (props) =>(
    <div >
        
        <img style={{height: "45px" }} data-tip="© 2018 Eduardo Lévano"   src={icono} alt="Comunidad de Tarma"/>
        <ReactTooltip/>
    </div>
);

export default logo;