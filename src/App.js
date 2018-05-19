import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder ';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

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
    this.setState({token: tokenleido});
  }
  
  

  render() {
    

    return (
      <div >
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
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
