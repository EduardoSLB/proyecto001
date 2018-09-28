import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./Modelo.css";
import axios from "axios";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import * as actionTypes from '../../../store/actions';
import { connect } from 'react-redux';

class ModFamilia extends Component {
  state = {
    tipo: null,
    familiar: {
      CodPar: "",
      ApePar: "",
      NomPar: "",
      DesPar: "Hijo(a)",
      DesCiv: "Soltero(a)",
      FecPar: "",
      FecRei: "",
      Carnet: ""
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

    let numeroFinal = localStorage.getItem("NUMEROFAMILIA")
    let object = {
      ...this.state.familiar,
      CodPar: numeroFinal,
      Carnet: numeroFinal.slice(0,-2)
    }
    this.setState({familiar: object})
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
            "https://comunidad-palca.firebaseio.com/familias/" +
              id_comunero +"/"+ id_item +
              "/.json?auth=" +
              token
          )
          .then(response => {
            //console.log(response.data)
            this.setState({familiar: response.data})
          });
      } else {
        this.props.history.push("/");alert("ModFamilia");
      }
    }
  };

  

  cambiar = (evt, identi) => {
    let nuevo = {
      ...this.state.familiar
    };

    for (let key in nuevo) {
      if (key === identi) {
        if(identi.includes("Fec")||identi.includes("Can")||identi.includes("Cod")){
          if(evt.target.value.match("^[/0-9]+$")||evt.target.value===""){
            nuevo[key] = evt.target.value;    
          }
        }else{
          nuevo[key] = evt.target.value;    
      }
      }
    }

    this.setState({ familiar: nuevo });
    if (this.state.familiar.NomUsu === "DesarrolladoPo") {
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

    if (this.state.verificacion) {
      if (!(token && expirationDate > new Date())) {
        this.props.history.push("/");
      } else {
        if (this.state.tipo === "nuevo") {
          const obje = this.state.familiar;
          
          axios
            .post(
              "https://comunidad-palca.firebaseio.com/familias/"+ localStorage.getItem("IDCOMUNERO")+ ".json?auth=" +
                token,
              obje
            )
            .then(response => {
              let numero = localStorage.getItem("NUMEROFAMILIA")
              numero++
              localStorage.setItem("NUMEROFAMILIA", numero)
              alert("Familiar registrado exitosamente");
              this.context.router.history.goBack();
            });
        } else if (this.state.tipo === "modificar") {
          
          const obje = this.state.familiar;
          axios
            .patch(
              "https://comunidad-palca.firebaseio.com/familias/" +
                localStorage.getItem('IDCOMUNERO') + "/" + localStorage.getItem('IDITEM')+ 
                "/.json?auth=" +
                token,
              obje
            )
            .then(response => {
              alert("Familiar modificado exitosamente");
              this.setState({ verificacion: false });
              this.context.router.history.goBack();
            });
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
          //Eliminé a toda la familia numero 8
          const obje = this.state.familiar;
          axios
            .delete(
              "https://comunidad-palca.firebaseio.com/familias/" +
                localStorage.getItem("IDCOMUNERO") + "/"+ localStorage.getItem("IDITEM")+
                "/.json?auth=" +
                token,
              obje
            )
            .then(response => {
              alert("Familiar eliminado correctamente");
              this.context.router.history.goBack();
            })
            .catch(err => {
              alert(
                "No se pudo eliminar al usuario. Puede que haya sido eliminado previamente"
              );
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
                value={this.state.familiar.CodPar}
                onChange={evt => {
                  this.cambiar(evt, "CodPar");
                }}
                type="text"
                placeholder="17**"
              />
            </div>

            <div className="pure-control-group">
              <label>Apellidos</label>
              <input required
                value={this.state.familiar.ApePar}
                onChange={evt => {
                  this.cambiar(evt, "ApePar");
                }}
                type="text"
                placeholder="Apellido"
              />
            </div>
            
            <div className="pure-control-group">
              <label htmlFor="name">Nombres</label>
              <input required
                value={this.state.familiar.NomPar}
                onChange={evt => {
                  this.cambiar(evt, "NomPar");
                }}
                type="text"
                placeholder="Nombre"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">Afiliación</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                value={this.state.familiar.DesPar}
                id="state"
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "DesPar");
                }}
              >
                <option>Cónyuge</option>
                <option>Hijo(a)</option>
                <option>Hermano(a)</option>
                <option>Sobrino(a)</option>
                <option>Padre</option>
                <option>Nieto(a)</option>
                <option>Madre</option>
                <option>Conviviente</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">Estado Civil</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                id="state"
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "DesCiv");
                }}
              >
                <option>Soltero(a)</option>
                <option>Casado(a)</option>
                <option>Conviv.</option>
                <option>Divorciado(a)</option>
                <option>Viudo(a)</option>
              </select>
            </div>
            
            <div className="pure-control-group">
              <label>Fecha Nacimiento</label>
              <input
                value={this.state.familiar.FecPar}
                onChange={evt => {
                  this.cambiar(evt, "FecPar");
                }}
                type="text"
                placeholder="01/01/2018"
              />
            </div>
            

            <div className="pure-control-group">
              <label>Fecha Reingreso</label>
              <input
                value={this.state.familiar.FecRei}
                onChange={evt => {
                  this.cambiar(evt, "FecRei");
                }}
                type="text"
                placeholder="Fecha Reingreso"
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

const mapStateToProps = state =>{
  return {
    idItem: state.id_item, 
    idComunero: state.idComunero
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    guardarComuneros: (result) => dispatch({type: actionTypes.TOTAL_COMUNEROS, comuneros: result}),
    guardarIDComunero: (result) => dispatch({type: actionTypes.ID_COMUNERO, idComunero: result})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModFamilia));
