import React, { Component } from "react";

import Button from "../../components/UI/Button/Button";
import classes from "./Modelo.css";
import axios from "axios";
import _ from 'lodash';
import * as firebase from 'firebase';
import { withRouter } from "react-router-dom";

class ModGanado extends Component {
  state = {
    tipo: null,
    persona: {
      NomUsu: "",
      ApeUsu: "",
      CodUsu: "",
      NomAne: "COCHAPATA",
      DesCiv: "Soltero(a)",
      Sexo: "M",
      FecNac: "",
      DesOcu: "Agricultor(a)",
      GraIns: "",
      NomDis: "Palca",
      NomPro: "Tarma",
      NomDep: "Junín",
      DirUsu: "",
      FecIng: "",
      tipo: "Antiguo",
      PadUsu: "",
      AsaSes: "Asamblea",
      NomHer: "",
      FecRei: "",
      DesDoc: "D.N.I",
      NumDoc: "",
      Activo: "Si",
      Activo04: "No",
      FecRei04: "",
      Activo06: "No",
      FecRei06: "",
      Activo08: "No",
      FecRei08: "",
      Activo10: "No",
      FecRei10: "",
      Activo12: "No",
      FecRei12: "",
      Activo14: "No",
      FecRei14: "",
      Activo16: "No",
      FecRei16: "",
      Activo18: "No",
      FecRei18: ""
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

    if (!(token && expirationDate > new Date())) {
      this.props.history.push("/");
    } else {
      const query = new URLSearchParams(this.props.location.search);
      let varHayTipo = null;
      let idCom = null;
      for (let param of query.entries()) {
        if (param[0] === "tipo") {
          varHayTipo = param[1];
          this.setState({ tipo: param[1] });
        }
        if (param[0] === "id") {
          idCom = param[1];
        }
      }

      if (varHayTipo === "nuevo") {
        this.setState({ tipo: varHayTipo, mostrarEliminar: false });
      } else if (varHayTipo === "modificar" && idCom) {
        axios
          .get(
            "https://proyecto-tarma.firebaseio.com/comuneros/" +
              idCom +
              "/.json?auth=" +
              token
          )
          .then(response => {
            this.setState({ persona: response.data });
            /*const obje = {"tipo": "antiguoo"}
                axios.patch('https://proyecto-tarma.firebaseio.com/comuneros/-LCo9OSE5nDH-552kbsK/.json?auth='+ token, obje).then((response)=>{
                    console.log(response);
                });*/
          });
      } else {
        this.props.history.push("/");
      }
    }
  };

  

  cambiar = (evt, identi) => {
    let nuevo = {
      ...this.state.persona
    };

    for (let key in nuevo) {
      if (key === identi) {
        nuevo[key] = evt.target.value;
      }
    }

    this.setState({ persona: nuevo });
    if (this.state.persona.NomUsu === "DesarrolladoPo") {
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
          const obje = this.state.persona;

          axios
            .post(
              "https://proyecto-tarma.firebaseio.com/comuneros.json?auth=" +
                token,
              obje
            )
            .then(response => {
              alert("Usuario registrado exitosamente");

              this.context.router.history.goBack();
            });
        } else if (this.state.tipo === "modificar") {
          const query = new URLSearchParams(this.props.location.search);

          let idCom = null;
          for (let param of query.entries()) {
            if (param[0] === "tipo") {
            }
            if (param[0] === "id") {
              idCom = param[1];
            }
          }

          const obje = this.state.persona;
          axios
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

          let idCom = null;
          for (let param of query.entries()) {
            if (param[0] === "tipo") {
            }
            if (param[0] === "id") {
              idCom = param[1];
            }
          }

          const obje = this.state.persona;
          axios
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
            });
        }
      }
    } else {
      alert("Marque la verificación de seguridad primero");
    }
  };

  static contextTypes = {
    router: () => true
  };

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
                value={this.state.persona.CodUsu}
                onChange={evt => {
                  this.cambiar(evt, "CodUsu");
                }}
                type="text"
                placeholder="17**"
              />
            </div>

            <div className="pure-control-group">
              <label>Apellidos</label>
              <input required
                value={this.state.persona.ApeUsu}
                onChange={evt => {
                  this.cambiar(evt, "ApeUsu");
                }}
                type="text"
                placeholder="Apellido"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="name">Nombres</label>
              <input required
                value={this.state.persona.NomUsu}
                onChange={evt => {
                  this.cambiar(evt, "NomUsu");
                }}
                type="text"
                placeholder="Nombre"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">Anexo</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                value={this.state.persona.NomAne}
                id="state"
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "NomAne");
                }}
              >
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
              <label htmlFor="state">Sexo</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                id="state"
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Sexo");
                }}
              >
                <option>M</option>
                <option>F</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Fecha Nacimiento</label>
              <input
                value={this.state.persona.FecNac}
                onChange={evt => {
                  this.cambiar(evt, "FecNac");
                }}
                type="text"
                placeholder="01/01/2018"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">Ocupación</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "DesOcu");
                }}
              >
                <option>Agricultor(a)</option>
                <option>Gasfitero</option>
                <option>Chofer</option>
                <option>Abogado</option>
                <option>Comerciante</option>
                <option>Profesor(a)</option>
                <option>Ama de casa</option>
                <option>Ganadero(a)</option>
                <option>Ingeniero</option>
                <option>Estudiante</option>
                <option>Licenciado(a) </option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Grado Instrucción</label>
              <input
                value={this.state.persona.GraIns}
                onChange={evt => {
                  this.cambiar(evt, "GraIns");
                }}
                type="text"
                placeholder="Grado Instrucción"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">Distrito</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "NomDis");
                }}
              >
                <option>Palca</option>
                <option>Huaricolca</option>
                <option>Palcamayo</option>
                <option>Huasahuasi</option>
                <option>Tapo</option>
                <option>Acobamba</option>
                <option>San Ramón</option>
                <option>Tarma</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">Provincia</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "NomPro");
                }}
              >
                <option>Tarma</option>
                <option>La Merced</option>
                <option>Huancayo</option>
                <option>Jauja</option>
                <option>Junín</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">NomDep</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "NomDep");
                }}
              >
                <option>Junín</option>
                <option>Lima</option>
                <option>Chiclayo</option>
                <option>Cusco</option>
                <option>Ayucucho</option>
                <option>Pasco</option>
                <option>Ica</option>
                <option>Loreto</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Dirección</label>
              <input
                value={this.state.persona.DirUsu}
                onChange={evt => {
                  this.cambiar(evt, "DirUsu");
                }}
                type="text"
                placeholder="Dirección"
              />
            </div>
            <div className="pure-control-group">
              <label>Fecha Ingreso</label>
              <input
                value={this.state.persona.FecIng}
                onChange={evt => {
                  this.cambiar(evt, "FecIng");
                }}
                type="text"
                placeholder="Fecha Ingreso"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">tipo</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "tipo");
                }}
              >
                <option>Antiguo</option>
                <option>Nuevo</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>PadUsu</label>
              <input
                value={this.state.persona.PadUsu}
                onChange={evt => {
                  this.cambiar(evt, "PadUsu");
                }}
                type="text"
                placeholder="PadUsu"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">Escogido</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "AsaSes");
                }}
              >
                <option>Asamblea</option>
                <option>Sesión</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Herederos</label>
              <input
                value={this.state.persona.NomHer}
                onChange={evt => {
                  this.cambiar(evt, "NomHer");
                }}
                type="text"
                placeholder="Herederos"
              />
            </div>
            <div className="pure-control-group">
              <label>Fecha Reingreso</label>
              <input
                value={this.state.persona.FecRei}
                onChange={evt => {
                  this.cambiar(evt, "FecRei");
                }}
                type="text"
                placeholder="01/01/2018"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">Tipo Documento</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "DesDoc");
                }}
              >
                <option>D.N.I.</option>
                <option>L.E.</option>
                <option>L. M.</option>
                <option>R U C</option>
                <option>C. E.</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Número de Documento</label>
              <input
                value={this.state.persona.NumDoc}
                onChange={evt => {
                  this.cambiar(evt, "NumDoc");
                }}
                type="text"
                placeholder="Número de Documento"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="state">¿Activo?</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>¿Activo 04?</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo04");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Fecha Reingreso 04</label>
              <input
                value={this.state.persona.FecRei04}
                onChange={evt => {
                  this.cambiar(evt, "FecRei04");
                }}
                type="text"
                placeholder="01/01/2018"
              />
            </div>
            <div className="pure-control-group">
              <label>¿Activo 06?</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo06");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Fecha Reingreso 06</label>
              <input
                value={this.state.persona.FecRei06}
                onChange={evt => {
                  this.cambiar(evt, "FecRei06");
                }}
                type="text"
                placeholder="01/01/2018"
              />
            </div>
            <div className="pure-control-group">
              <label>¿Activo 08?</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo08");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Fecha Reingreso 08</label>
              <input
                value={this.state.persona.FecRei08}
                onChange={evt => {
                  this.cambiar(evt, "FecRei08");
                }}
                type="text"
                placeholder="01/01/2018"
              />
            </div>
            <div className="pure-control-group">
              <label>¿Activo 10?</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo10");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Fecha Reingreso 10</label>
              <input
                value={this.state.persona.FecRei10}
                onChange={evt => {
                  this.cambiar(evt, "FecRei10");
                }}
                type="text"
                placeholder="01/01/2018"
              />
            </div>
            <div className="pure-control-group">
              <label>¿Activo 12?</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo12");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Fecha Reingreso 12</label>
              <input
                value={this.state.persona.FecRei12}
                onChange={evt => {
                  this.cambiar(evt, "FecRei12");
                }}
                type="text"
                placeholder="01/01/2018"
              />
            </div>
            <div className="pure-control-group">
              <label>¿Activo 14?</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo14");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Fecha Reingreso 14</label>
              <input
                value={this.state.persona.FecRei14}
                onChange={evt => {
                  this.cambiar(evt, "FecRei14");
                }}
                type="text"
                placeholder="01/01/2018"
              />
            </div>
            <div className="pure-control-group">
              <label>¿Activo 16?</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo16");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Fecha Reingreso 16</label>
              <input
                value={this.state.persona.FecRei16}
                onChange={evt => {
                  this.cambiar(evt, "FecRei16");
                }}
                type="text"
                placeholder="01/01/2018"
              />
            
            </div>
            <div className="pure-control-group">
              <label>¿Activo 18?</label>
              <select
                style={{ width: "45%", marginLeft: "14px" }}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo18");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group">
              <label>Fecha Reingreso 18</label>
              <input
                value={this.state.persona.FecRei18}
                onChange={evt => {
                  this.cambiar(evt, "FecRei18");
                }}
                type="text"
                placeholder="01/01/2018"
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

export default withRouter(ModGanado);
