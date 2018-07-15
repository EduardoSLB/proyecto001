import React from 'react';
import ReactTooltip from 'react-tooltip'
//import tarmaLogo from '../../assets/images/catedral.jpg';
//import classes from './Logo.css';

const logo = (props) =>(
    <div >
        
        <img style={{height: "45px" }} data-tip="© 2018 Eduardo Lévano"   src="http://www.catedralastorga.com/wp-content/uploads/DSC0814-1-630x420.jpg" alt="Comunidad de Tarma"/>
        <ReactTooltip/>
    </div>
);

export default logo;