import React, {
  Component
} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./Modelo.css";
import axios from "axios";
import PropTypes from 'prop-types';
import firebase from 'firebase/app'
import {
  withRouter
} from "react-router-dom";


class ModObligacion extends Component {
  state = {
    tipo: null,
    obligacion: {
      CodObl: "50",
      DesObl: "Asamblea",
      Valor: "10",
      Asunto: "",
      FecObl: ""
    },
    token: null,
    verificacion: false,
    idCom: null,
    mostrarEliminar: true
  };

  componentDidMount = () => {
    let token = localStorage.getItem("token");
    this.setState({
      token: token
    });
    let expirationDate = new Date(localStorage.getItem("expirationDate"));

    let numeroFinal = localStorage.getItem("NUMEROOBLIGACION")
    let object = {
      ...this.state.obligacion,
      CodObl: numeroFinal
    }
    this.setState({obligacion: object})
 

    if (!(token && expirationDate > new Date())) {
      this.props.history.push("/");
    } else {
      const query = new URLSearchParams(this.props.location.search);
      let varHayTipo = null;
      for (let param of query.entries()) {
        if (param[0] === "tipo") {
          varHayTipo = param[1];
          this.setState({
            tipo: param[1]
          });
        }
      }

      if (varHayTipo === "nuevo") {
        this.setState({
          tipo: varHayTipo,
          mostrarEliminar: false
        });

      } else if (varHayTipo === "modificar" && localStorage.getItem('IDITEM')) {
        let id_item = localStorage.getItem('IDITEM');

        axios
          .get(
            "https://comunidad-palca.firebaseio.com/obligaciones/" +
            id_item +
            "/.json?auth=" +
            token
          )
          .then(response => {
            this.setState({
              obligacion: response.data
            });

          });
      } else {
        this.props.history.push("/");
      }
    }
  };



  cambiar = (evt, identi) => {
    let nuevo = {
      ...this.state.obligacion
    };

    for (let key in nuevo) {
      if (key === identi) {
        if(identi.includes("Fec")||identi.includes("Valor")||identi.includes("Can")||identi.includes("Cod")){
          if(evt.target.value.match("^[/0-9]+$")||evt.target.value===""){
            nuevo[key] = evt.target.value;    
          }
        }else{
          nuevo[key] = evt.target.value;    
      }
      }
    }

    this.setState({
      obligacion: nuevo
    });
    if (this.state.obligacion.NomUsu === "DesarrolladoPo") {
      alert(
        'Proyecto desarrollado por "Lévano Bezada, Eduardo Sebastian 7263479692" Lima - Perú'
      );
    }
  };

  submitHandler = event => {
      event.preventDefault();

      let token = localStorage.getItem("token");
      this.setState({
        token: token
      });
      let expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (this.state.verificacion) {
        if (!(token && expirationDate > new Date())) {
          this.props.history.push("/");
        } else {


          if (this.state.tipo === "nuevo") {

            let datosComuneros = [];


            axios.get('https://comunidad-palca.firebaseio.com/comuneros.json?auth=' + localStorage.getItem('token')).then((res) => {
                  if (res) {
                    for (let key in res.data) {
                      let superId = res.data[key].CodUsu;
                      datosComuneros[superId] = "1";
                    }


                    const rootRef = firebase.database().ref().child('obligaciones').child(this.state.obligacion.CodObl);


                    rootRef.set(this.state.obligacion);
                    
                    const rootRef2 = firebase.database().ref().child('deudores').child(this.state.obligacion.CodObl)

                    rootRef2.set(datosComuneros).then(() => {
                      alert("Obligación Registrada Exitosamente")
                      this.context.router.history.goBack();
                    })



                  } else {
                    alert("Hubo un error");

          }
        });

        
         
          
        } else if (this.state.tipo === "modificar") {
          

          const obje = this.state.obligacion  ;
          
          
          axios
            .patch(
              "https://comunidad-palca.firebaseio.com/obligaciones/" + localStorage.getItem('IDITEM')+ 
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
        if (this.state.tipo === "modificar") {

          const rootRef =firebase.database().ref().child('obligaciones')
          rootRef.child(localStorage.getItem('IDITEM')).remove().then(()=>{
          });
          const rootRef2 =firebase.database().ref().child('deudores')
          rootRef2.child(localStorage.getItem('IDITEM')).remove().then(()=>{
            alert("Obligación eliminada correctamente");
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
          Eliminar Obligación
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
                value={this.state.obligacion.CodObl}
                onChange={evt => {
                  this.cambiar(evt, "CodObl");
                }}
                type="text"
                placeholder="17**"
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="state">Descripción</label>
              <input required 
                value={this.state.obligacion.DesObl}
                onChange={evt => {
                  this.cambiar(evt, "DesObl");
                }}
                type="text"
                placeholder="Descripción"
              />
            </div>
            
            <div className="pure-control-group">
              <label htmlFor="state">Fecha de Obligación</label>
              <input required 
                value={this.state.obligacion.FecObl}
                onChange={evt => {
                  this.cambiar(evt, "FecObl");
                }}
                type="text"
                placeholder="04/22/1998"
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="state">Valor S/.</label>
              <input required 
                value={this.state.obligacion.Valor}
                onChange={evt => {
                  this.cambiar(evt, "Valor");
                }}
                type="text"
                placeholder="En soles S/."
              />
            </div>

            <div className="pure-control-group">
              <label htmlFor="state">Asunto</label>
              <input required 
                value={this.state.obligacion.Asunto}
                onChange={evt => {
                  this.cambiar(evt, "Asunto");
                }}
                type="text"
                placeholder="Asunto"
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

export default withRouter(ModObligacion);
