import React from 'react';

import tarmaLogo from '../../assets/images/catedral.jpg';
import classes from './Logo.css';

const logo = (props) =>(
    <div className={classes.Logo} style={{height: props.height }}>
        <img src={tarmaLogo} alt="Comunidad de Tarma"/>
    </div>
);

export default logo;