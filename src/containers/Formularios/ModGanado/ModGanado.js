import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./Modelo.css";
import axios from "axios";
import PropTypes from 'prop-types';
import firebase from 'firebase/app'
import { withRouter } from "react-router-dom";



class ModGanado extends Component {
  state = {
    tipo: null,
    ganado: {
      CodGan: "",
      Carnet: "10",
      DesGan: "Ovino",
      SexoGa: "M",
      EdadGa: "",
      CanGan: "1",
      ColGan: "",
      MarcaGa: "",
      SenalGa: "",
      FecRei: "",
      CostoG: "0"
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

    let numeroFinal = localStorage.getItem("NUMEROGANADO")
    let object = {
      ...this.state.ganado,
      CodGan: numeroFinal
    }
    this.setState({ganado: object})
   
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
            "https://proyecto-tarma.firebaseio.com/ganado/" +
              id_comunero + "/" + id_item +
              "/.json?auth=" +
              token
          )
          .then(response => {
            this.setState({ ganado: response.data });
            
          });
      } else {
        this.props.history.push("/");
      }
    }
  };

  

  cambiar = (evt, identi) => {
    let nuevo = {
      ...this.state.ganado
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

    this.setState({ ganado: nuevo });

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
          const obje = this.state.ganado;

          const rootRef =firebase.database().ref().child('ganado').child(localStorage.getItem('IDCOMUNERO'));

          rootRef.push().set(obje).then(()=>{
            alert("Ganado registrado exitosamente");
            this.context.router.history.goBack();
          });
          
        } else if (this.state.tipo === "modificar") {
          

          const obje = this.state.ganado;
          
          
          axios
            .patch(
              "https://proyecto-tarma.firebaseio.com/ganado/" +
              localStorage.getItem('IDCOMUNERO') + "/" + localStorage.getItem('IDITEM')+ 
                "/.json?auth=" +
                token,
              obje
            )
            .then(response => {
              alert("Ganado modificado exitosamente");
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
          const query = new URLSearchParams(this.props.location.search);

          
          for (let param of query.entries()) {
            if (param[0] === "tipo") {
            }
            
          }

    
          const rootRef =firebase.database().ref().child('ganado').child(localStorage.getItem('IDCOMUNERO'));
          rootRef.child(localStorage.getItem('IDITEM')).remove().then(()=>{
            alert("Ganado eliminado correctamente");
            this.context.router.history.goBack();
          });
          /*axios
            .delete(
              "https://proyecto-tarma.firebaseio.com/comuneros/" +
                idCom +
                "/.json?auth=" +
                token,
              obje
            )
            .then(response => {
              alert("Usuario eliminado correctamente");
              this.context.router.history.goBack();
            })
            .catch(err => {
              alert(
                "No se pudo eliminar al usuario. Puede que haya sido eliminado previamente"
              );
            });*/
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
              <input required
                value={this.state.ganado.CodGan}
                onChange={evt => {
                  this.cambiar(evt, "CodGan");
                }}
                type="text"
                placeholder="17**"
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="state">Descripción</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                value={this.state.ganado.DesGan}
                id="state"
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "DesGan");
                }}>
                <option>Ovino</option>
                <option>Equino</option>
                <option>Vacuno</option>
                <option>Porcino</option>
              </select>
            </div>
            
            <div className="pure-control-group">
              <label htmlFor="state">Sexo</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                value={this.state.ganado.SexoGa}
                id="state"
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "SexoGa");
                }}>
                <option>M</option>
                <option>H</option>
                <option>X</option>
              </select>
            </div>

            <div className="pure-control-group">
              <label htmlFor="NomUsu">Edad Ganado</label>
              <input required
                value={this.state.ganado.EdadGa}
                onChange={evt => {
                  this.cambiar(evt, "EdadGa");
                }}
                type="text"
                placeholder="04 años y 02 meses"
              />
            </div>
            
            <div className="pure-control-group">
              <label htmlFor="NomUsu">Cantidad</label>
              <input required
                value={this.state.ganado.CanGan}
                onChange={evt => {
                  this.cambiar(evt, "CanGan");
                }}
                type="text"
                placeholder="05"
              />
            </div> 

            <div className="pure-control-group">
              <label htmlFor="NomUsu">Color</label>
              <input required
                value={this.state.ganado.ColGan}
                onChange={evt => {
                  this.cambiar(evt, "ColGan");
                }}
                type="text"
                placeholder="Negros/Blancos"
              />
            </div> 
            
            <div className="pure-control-group">
              <label htmlFor="NomUsu">Marca</label>
              <input required
                value={this.state.ganado.MarcaGa}
                onChange={evt => {
                  this.cambiar(evt, "MarcaGa");
                }}
                type="text"
                placeholder="SIN MARCA"
              />
            </div> 

            <div className="pure-control-group">
              <label htmlFor="NomUsu">Señal</label>
              <input required
                value={this.state.ganado.SenalGa}
                onChange={evt => {
                  this.cambiar(evt, "SenalGa");
                }}
                type="text"
                placeholder="S/S"
              />
            </div> 



<div className="pure-control-group">
              <label>Fecha Reingreso</label>
              <input
                value={this.state.ganado.FecRei}
                onChange={evt => {
                  this.cambiar(evt, "FecRei");
                }}
                type="text"
                placeholder="22/04/1998"
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="state">Costo</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                value={this.state.ganado.CostoG}
                id="state"
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "CostoG");
                }}>
                <option>0</option>
                <option>0.5</option>
                <option>1</option>
              </select>
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

export default withRouter(ModGanado);
