import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder ';
import Auth from './containers/Auth/Auth';
import Modelo from './containers/Modelo/Modelo'
class App extends Component {
  
  constructor() {
    super();
    this.state = ({
      token: null,
      path: Auth
    });
  }
/*
  render() {
    return (
     <div>{this.state.user ? : ( <Home/>) : (<Login />)}</div>
*/

  componentDidMount = () =>{
    let tokenleido = localStorage.getItem('token');
    if(tokenleido){
      this.setState({token: tokenleido});
    }
  }
  
  

  render() {
    

    return (
      <div >
        <Layout>
          <Switch>
          <Route path="/modelo" component={Modelo} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}
//<Route path="/" exact component={BurgerBuilder}/> ; esta luego de {variable}

export default App;
