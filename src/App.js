import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder ';
import Auth from './containers/Auth/Auth';
import Modelo from './containers/Formularios/Modelo/Modelo';
import Pruebas from './containers/Pruebas/Pruebas';
import Familias from './containers/Familias/Familias';
import Ganado from './containers/Ganado/Ganado';
import Terrenos from './containers/Terrenos/Terrenos';
import PorAnexos from './containers/PorAnexos/PorAnexos';
import Obligaciones from './containers/Obligaciones/Obligaciones';
import ModFamilia from './containers/Formularios/ModFamilia/ModFamilia';
import ModGanado from './containers/Formularios/ModGanado/ModGanado';
import ModTerreno from './containers/Formularios/ModTerreno/ModTerreno';
import ModObligacion from './containers/Formularios/ModObligacion/ModObligacion';
import AdmiObliga from './containers/AdmiObliga/AdmiObliga';

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
            <Route path="/modfamilia" component={ModFamilia}/>
            <Route path="/modganado" component={ModGanado}/>
            <Route path="/modterrenos" component={ModTerreno}/>
            <Route path="/modobligacion" component={ModObligacion}/>
            <Route path="/auth" component={Auth} />
            <Route path="/pruebas" component={Pruebas} />
            <Route path="/familias" component={Familias}/>
            <Route path="/ganado" component={Ganado}/>
            <Route path="/obligaciones" component={Obligaciones}/>
            <Route path="/admiobligaciones" component={AdmiObliga}/>
            <Route path="/terrenos" component={Terrenos}/>
            <Route path="/poranexos" component={PorAnexos}/>            
            <Route path="/" component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}
//<Route path="/" exact component={BurgerBuilder}/> ; esta luego de {variable}

export default App;
