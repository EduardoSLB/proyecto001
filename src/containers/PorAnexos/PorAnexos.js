import React, {
    Component
} from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./Modelo.css";
import PropTypes from 'prop-types';
import {
    withRouter
} from "react-router-dom";
import * as MyDocs from '../BurgerBuilder/generarDocs';

class PorAnexos extends Component {
    state = {
        Anexo: "HUACRACAN"
    };

    componentDidMount = () => {

        let token = localStorage.getItem("token");
        this.setState({
            token: token
        });
        let expirationDate = new Date(localStorage.getItem("expirationDate"));

        if (!(token && expirationDate > new Date())) {
            this.props.history.push("/");
        } else {

        }
    };

    cambiar = (evt, identi) => {
        this.setState({
            Anexo: evt.target.value
        }, () => {
        })

    };

    submitHandler = event => {
        event.preventDefault();

        //MyDocs.generarAnexo(this.state.Anexo)
    };

    switchAuthModeHandler = () => {
        this.context.router.history.goBack();
    };

    static contextTypes = {
        router: PropTypes.object
    }

    imprimirAnexo = (opcion) =>{
        
        MyDocs.generarAnexo(this.state.Anexo, opcion)
    }

    render() {
            const formElementsArray = [];
            for (let key in this.state.controls) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
  
      return (
        <div className={classes.Modelo}>
          <form
            onSubmit={this.submitHandler}
            className="pure-form pure-form-aligned"
          >
             <div className="pure-control-group">
              <label htmlFor="state">Anexo</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                value={this.state.Anexo}
                id="state"
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Anexo");
                }}>
                <option>HUACRACAN</option>
                <option>OCSHATAMBO</option>
                <option>VALDIVIA</option>
                <option>CAMPALINAYOC</option>
                <option>CHACLAPAMPA</option>
                <option>CHURUPATA</option>
                <option>YANANGO</option>
                <option>COCHAPATA</option>
                <option>JUÑIC</option>
                <option>RAMBRASHPATA</option>
                <option>SANTA ROSA</option>
                <option>TUTAPA</option>
                <option>San José Yanacocha</option>
                <option>BARRIO ARRIBA</option>
                <option>BARRIO ABAJO</option>
                <option>Encanto Toro Paccha</option>
                <option>UNION PALCA</option>
                <option>MANSHAPATA</option>
                <option>CHIQUISTAMBO</option>
                <option>CONTAYPACCHA</option>
                <option>HUAYAUNIOC</option>
                <option>NAHUIN</option>
                <option>INTIPACHANAN</option>
                <option>CULEBRAYOC</option>
                <option>SHICSHAJ</option>
                <option>Santo Domingo Palca</option>
                <option>HUARUYOC</option>
                <option>E. TOROPACCHA</option>
                <option>PATAY</option>
                <option>CARPAPATA</option>
                <option>RANRAPATA</option>
                <option>SANTO DOMINGO</option>
                <option>HUANDUNGA</option>
                <option>LLACSACACA</option>
                <option>MATICHACRA</option>
                <option>SANTA FE</option>
                <option>CHIPOCAYO</option>
                <option>PALCA</option>
                <option>MATICHACRA</option>
              </select>
            </div>
  
            <Button btnType="Success" clicked={()=>{this.imprimirAnexo("todos")}}
            >
            Imprimir todos
            </Button>
            <Button btnType="Success" clicked={()=>{this.imprimirAnexo("activos")}}
            >
            Imprimir activos - 2018
            </Button>
            <Button btnType="Success" clicked={()=>{this.imprimirAnexo("noActivos")}}
            >
            Imprimir no activos - 2018
            </Button>
          </form>
            
          <Button clicked={this.switchAuthModeHandler} btnType="Normal">
            Atrás
          </Button>
          <br/>

        </div>
      );
    }
  }
  
  export default withRouter(PorAnexos);
  