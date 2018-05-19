import React, {Component} from 'react';

import Aux from '../Auxiliar';
import classes from './Layout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
        return { showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return(
            <Aux>
                <Toolbar drawerToogleClicked={this.sideDrawerToggleHandler}/>
                <main className= {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 

export default Layout;