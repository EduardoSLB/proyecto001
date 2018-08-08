import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./Modelo.css";
import axios from "axios";
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import { withRouter } from "react-router-dom";

class ModTerreno extends Component {
  state = {
    tipo: null,
    terreno: {
      CodTerr: "",
      NomAne: "",
      NomBar: "",
      ColNor: "",
      ColSur: "",
      ColEst: "",
      ColOes: "",
      Producto:"",
      ExtTer: "",
      M2: "",
      Sector:"",
      Observa: "",
      FecRei:"",
      CostoT: ""
    },
    token: null,
    verificacion: false,
    idCom: null,
    mostrarEliminar: true
  };

  

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    this.setState({ token: token });
    let expirationDate = new Date(localStorage.getItem("expirationDate"));

    let numeroFinal = localStorage.getItem("NUMEROTERRENO")
    let object = {
      ...this.state.terreno,
      CodTerr: numeroFinal
    }
    this.setState({terreno: object})


    if (!(token && expirationDate > new Date())) {
      this.props.history.push("/");
    } else {
      const query = new URLSearchParams(this.props.location.search);
      let varHayTipo = null;

      for (let param of query.entries()) {
        if (param[0] === "tipo") {
          varHayTipo = param[1];
          this.setState({ tipo: param[1] });
        }
      }

      if (varHayTipo === "nuevo") {
        this.setState({ tipo: varHayTipo, mostrarEliminar: false });
      } else if (varHayTipo === "modificar" && localStorage.getItem('IDITEM')) {

        let id_comunero = localStorage.getItem('IDCOMUNERO');
        let id_item = localStorage.getItem('IDITEM');

        axios
          .get(
            "https://comunidad-palca.firebaseio.com/terrenos/" +
            id_comunero + "/" + id_item +
              "/.json?auth=" +
              token
          )
          .then(response => {
            this.setState({ terreno: response.data });
         
          });
      } else {
        this.props.history.push("/");
      }
    }
  };

  cambiar = (evt, identi) => {
    let nuevo = {
      ...this.state.terreno
    };

    for (let key in nuevo) {
      if (key === identi) {
        if(identi.includes("Fec")||identi.includes("Can")||identi.includes("Cod")||identi.includes("Ext")||identi.includes("M2")||identi.includes("Costo")){
          if(evt.target.value.match("^[/0-9]+$")||evt.target.value===""){
            nuevo[key] = evt.target.value;    
          }
        }else{
          nuevo[key] = evt.target.value;    
      }
      }
    }

    this.setState({ terreno: nuevo });
    if (this.state.terreno.NomUsu === "DesarrolladoPo") {
      alert(
        'Proyecto desarrollado por "Lévano Bezada, Eduardo Sebastian 7263479692" Lima - Perú'
      );
    }
  };

  submitHandler = event => {
    event.preventDefault();

    let token = localStorage.getItem("token");
    this.setState({ token: token });
    let expirationDate = new Date(localStorage.getItem("expirationDate"));
    const rootRef =firebase.database().ref()
    if (this.state.verificacion) {
      if (!(token && expirationDate > new Date())) {
        this.props.history.push("/");
      } else {
        if (this.state.tipo === "nuevo") {
          const obje = this.state.terreno;

          rootRef.child('terrenos').child(localStorage.getItem('IDCOMUNERO')).push().set(obje).then(()=>{
            alert("Terreno registrado exitosamente");
         
            this.context.router.history.goBack();
          });
          

        } else if (this.state.tipo === "modificar") {
          const query = new URLSearchParams(this.props.location.search);


          for (let param of query.entries()) {
            if (param[0] === "tipo") {
            }
           
          }

          const obje = this.state.terreno;
          
          rootRef.child('terrenos').child(localStorage.getItem('IDCOMUNERO')).child(localStorage.getItem('IDITEM')).update(obje).then(()=>{
            alert("Terreno modificado exitosamente");
            this.context.router.history.goBack();
          });
          /*axios
            .patch(
              "https://proyecto-tarma.firebaseio.com/comuneros/" +
                idCom +
                "/.json?auth=" +
                token,
              obje
            )
            .then(response => {
              alert("Usuario modificado exitosamente");
              this.setState({ verificacion: false });
            });*/
        }
      }
    } else {
      alert("Marque la verificación de seguridad primero");
    }
  };

  switchAuthModeHandler = () => {
    this.context.router.history.goBack();
  };

  eliminar = () => {
    let token = localStorage.getItem("token");
    this.setState({ token: token });
    let expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (this.state.verificacion) {
      if (!(token && expirationDate > new Date())) {
        this.props.history.push("/");
      } else {
        if (this.state.tipo === "nuevo") {
          alert("No hay a quien eliminar");
        } else if (this.state.tipo === "modificar") {
          const query = new URLSearchParams(this.props.location.search);


          for (let param of query.entries()) {
            if (param[0] === "tipo") {
            }
        
          }

          
          const rootRef =firebase.database().ref().child('terrenos').child(localStorage.getItem('IDCOMUNERO'));
          rootRef.child(localStorage.getItem('IDITEM')).remove().then(()=>{
            alert("Terreno eliminado exitosamente");
            this.context.router.history.goBack();
          });
        }
      }
    } else {
      alert("Marque la verificación de seguridad primero");
    }
  };

  static contextTypes = {
    router:  PropTypes.object
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let botonEliminar = null;
    if (this.state.mostrarEliminar) {
      botonEliminar = (
        <Button clicked={this.eliminar} btnType="Danger">
          Eliminar Usuario
        </Button>
      );
    }

    return (
      <div className={classes.Modelo}>
        <form
          onSubmit={this.submitHandler}
          className="pure-form pure-form-aligned"
        >
          <fieldset>
            
            <div className="pure-control-group">
              <label htmlFor="NomUsu">Código</label>
              <input required disabled
                value={this.state.terreno.CodTerr}
                onChange={evt => {
                  this.cambiar(evt, "CodTerr");
                }}
                type="text"
                placeholder="17**"
              />
            </div>

              <div className="pure-control-group">
              <label>Anexo</label>
              <input
                value={this.state.terreno.NomAne}
                onChange={evt => {
                  this.cambiar(evt, "NomAne");
                }}
                type="text"
                placeholder="ILLIC"
              />
            </div>

            <div className="pure-control-group">
              <label>Barrio</label>
              <input
                value={this.state.terreno.NomBar}
                onChange={evt => {
                  this.cambiar(evt, "NomBar");
                }}
                type="text"
                placeholder="PAMPA"
              />
            </div>

            <div className="pure-control-group">
              <label>Col Norte</label>
              <input
                value={this.state.terreno.ColNor}
                onChange={evt => {
                  this.cambiar(evt, "ColNor");
                }}
                type="text"
                placeholder="Carretera"
              />
            </div>

            <div className="pure-control-group">
              <label>Col Sur</label>
              <input
                value={this.state.terreno.ColSur}
                onChange={evt => {
                  this.cambiar(evt, "ColSur");
                }}
                type="text"
                placeholder="Carretera"
              />
            </div>

            <div className="pure-control-group">
              <label>Col Este</label>
              <input
                value={this.state.terreno.ColEst}
                onChange={evt => {
                  this.cambiar(evt, "ColEst");
                }}
                type="text"
                placeholder="Carretera"
              />
            </div>

            <div className="pure-control-group">
              <label>Col Oeste</label>
              <input
                value={this.state.terreno.ColOes}
                onChange={evt => {
                  this.cambiar(evt, "ColOes");
                }}
                type="text"
                placeholder="Carretera"
              />
            </div>
            
            <div className="pure-control-group">
              <label>Producto</label>
              <input
                value={this.state.terreno.Producto}
                onChange={evt => {
                  this.cambiar(evt, "Producto");
                }}
                type="text"
                placeholder="Papa/Hortaliza/No"
              />
            </div>

            <div className="pure-control-group">
              <label>Extensión</label>
              <input
                value={this.state.terreno.ExtTer}
                onChange={evt => {
                  this.cambiar(evt, "ExtTer");
                }}
                type="text"
                placeholder="5"
              />
            </div>
            <div className="pure-control-group">
              <label>M2</label>
              <input
                value={this.state.terreno.M2}
                onChange={evt => {
                  this.cambiar(evt, "M2");
                }}
                type="text"
                placeholder="1000"
              />
            </div>
            
            <div className="pure-control-group">
              <label htmlFor="state">Sector</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                value={this.state.terreno.Sector}
                id="state"
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Sector");
                }}>
                <option>Sierra</option>
                <option>Costa</option>
                <option>Selva</option>
                <option>No</option>
              </select>
            </div>
            
             <div className="pure-control-group">
              <label>Observación</label>
              <input
                value={this.state.terreno.Observa}
                onChange={evt => {
                  this.cambiar(evt, "Observa");
                }}
                type="text"
                placeholder="No"
              />
            </div>
            <div className="pure-control-group">
              <label>Fecha Reingreso</label>
              <input
                value={this.state.terreno.FecRei}
                onChange={evt => {
                  this.cambiar(evt, "FecRei");
                }}
                type="text"
                placeholder="22/04/1998"
              />
            </div>

            <div className="pure-control-group">
              <label>Costo Total</label>
              <input
                value={this.state.terreno.CostoT}
                onChange={evt => {
                  this.cambiar(evt, "CostoT");
                }}
                type="text"
                placeholder="0/1/5/10/15"
              />
            </div>
            <div className="pure-controls">
              <label htmlFor="cb" className="pure-checkbox">
                <input
                  checked={this.state.verificacion}
                  id="cb"
                  type="checkbox"
                  onChange={evt => {
                    if (evt.target.checked) {
                      this.setState({ verificacion: true });
                    } else {
                      this.setState({ verificacion: false });
                    }
                  }}
                />{" "}
                Verificación de seguridad
              </label>
            </div>

          </fieldset>

          <Button btnType="Success">Confirmar</Button>
        </form>

        <Button clicked={this.switchAuthModeHandler} btnType="Normal">
          Atrás
        </Button>
        <br/>
        {botonEliminar}
      </div>
    );
  }
}

export default withRouter(ModTerreno);
