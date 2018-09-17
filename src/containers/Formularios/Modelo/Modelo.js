import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./Modelo.css";
import PropTypes from 'prop-types';
import axios from "axios";
import { withRouter } from "react-router-dom";

class Modelo extends Component {
  
  state = {
    placeholder: "01/01/2018",
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
    limpio: {
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
      FecRei18: "",
    },
    mostrarEliminar: true
  };


  componentDidMount = () => {
    let token = localStorage.getItem("token");
    this.setState({ token: token });
    let expirationDate = new Date(localStorage.getItem("expirationDate"));
    
    let numeroFinal = localStorage.getItem("NUMEROFINAL")
    let object = {
      ...this.state.persona,
      CodUsu: numeroFinal
    }
    this.setState({persona: object})
 
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
            "https://comunidad-palca.firebaseio.com/comuneros/" +
              idCom +
              "/.json?auth=" +
              token
          )
          .then(response => {
            let hola = response.data;
            if(hola.FecRei18===""||hola.FecRei18===undefined||hola.FecRei18===null)
            hola.FecRei18 = '';
            if(hola.Activo18===""||hola.Activo18===undefined||hola.Activo18===null)
            hola.Activo18 = 'No'
            this.setState({ persona: hola });
           
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
            if (identi.includes("Fec") || identi.includes("Can") || identi.includes("Cod") || identi.includes("NumDoc")) {
                if (evt.target.value.match("^[/0-9]+$") || evt.target.value === "") {
                    nuevo[key] = evt.target.value;
                }
            } else {
                nuevo[key] = evt.target.value;
            }

            if(identi.includes("")){

            }

        }
    }

    this.setState({
        persona: nuevo
    });

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
              "https://comunidad-palca.firebaseio.com/comuneros.json?auth=" +
                token,
              obje
            )
            .then(response => {
              alert("Usuario registrado exitosamente, recuerde actualizar la tabla para ver los cambios");

              let numero = localStorage.getItem("NUMEROFINAL")
              numero++
              localStorage.setItem("NUMEROFINAL", numero)

              this.setState({ persona: this.state.limpio });
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
              "https://comunidad-palca.firebaseio.com/comuneros/" +
                idCom +
                "/.json?auth=" +
                token,
              obje
            )
            .then(response => {
              alert("Usuario modificado exitosamente");
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
              "https://comunidad-palca.firebaseio.com/comuneros/" +
                idCom +
                "/.json?auth=" +
                token,
              obje
            )
            .then(response => {
              alert("Usuario eliminado correctamente, recuerde actualizar la tabla para evitar errores");
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
      <div className={classes.Modelo} style={{width:"70%"}}>
        <form style={{padding: "10px", gridAutoColumns: "true"}}
          onSubmit={this.submitHandler}
          className="pure-form pure-form-aligned"
        >
          <fieldset>
            
            <div style={{display:"flex", flexWrap:"nowrap", width:"70%", marginLeft: "15%", textAlign: "center"}}>
            
            <div className="pure-control-group" style = {{width: "33%"}}>
              <label htmlFor="NomUsu" style={{textAlign: "center", width: "33%"}}>Código</label>
              <input required disabled style={{width: "94%"}}
                value={this.state.persona.CodUsu}
                type="text"
                placeholder="17**"
              />
            </div>

            <div className="pure-control-group" style = {{width: "33%", textAlign: "center"}}>
              <label style={{textAlign: "center"}}>Apellidos</label>
              <input required style={{width: "94%"}}
                value={this.state.persona.ApeUsu}
                onChange={evt => {
                  this.cambiar(evt, "ApeUsu");
                }}
                type="text"
                placeholder="Apellido"
              />
            </div>
            <div className="pure-control-group" style = {{width: "33%", textAlign: "center"}}>
              <label htmlFor="name" style={{textAlign: "center"}}>Nombres</label>
              <input required style={{width: "94%"}}
                value={this.state.persona.NomUsu}
                onChange={evt => {
                  this.cambiar(evt, "NomUsu");
                }}
                type="text"
                placeholder="Nombre"
              />
            </div>
            </div>

            <div style={{display:"flex", flexWrap:"nowrap", width:"70%", marginLeft: "15%", textAlign: "center", marginBottom: "10px"}}>
            
            <div className="pure-control-group" style = {{width: "33%", textAlign: "center"}}>
              <label htmlFor="state" style={{textAlign: "center"}}>Anexo</label>
              <select
                

                style={{width: "94%"}}

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
            <div className="pure-control-group" style = {{width: "33%", textAlign: "center"}}>
              <label htmlFor="state" style={{textAlign: "center"}}>Estado Civil</label>
              <select
                
                style={{width: "94%"}}


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
            <div className="pure-control-group" style = {{width: "33%", textAlign: "center"}}>
              <label htmlFor="state" style={{textAlign: "center"}}>Sexo</label>
              <select
                
                style={{width: "94%"}}


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
            </div>

            <div style={{display:"flex", flexWrap:"nowrap", width:"80%", marginLeft: "10%", textAlign: "center"}}>
            <div className="pure-control-group" style={{width: "25%", textAlign: "center"}}>
              <label style={{width: "100%", marginRight: "0%", textAlign: "center"}}>Fecha Nacimiento</label>
              <input style={{width: "94%"}}
                value={this.state.persona.FecNac}
                onChange={evt => {
                  this.cambiar(evt, "FecNac");
                }}
                type="text"
                placeholder={this.state.placeholder}
              />
            </div>
            <div className="pure-control-group" style={{width: "25%", textAlign: "center"}}>
              <label style={{width: "100%", textAlign: "center"}} htmlFor="state">Ocupación</label>
              <select style={{width: "94%", height: "40px"}}
                




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
            <div className="pure-control-group" style={{width: "25%", textAlign: "center"}}>
              <label style={{width: "100%", textAlign: "center"}}>Grado Instrucción</label>
              <input style={{width: "94%"}}
                value={this.state.persona.GraIns}
                onChange={evt => {
                  this.cambiar(evt, "GraIns");
                }}
                type="text"
                placeholder="Grado Instrucción"
              />
            </div>
            <div className="pure-control-group" style={{width: "25%", textAlign: "center"}}>
              <label style={{width: "100%", textAlign: "center"}} htmlFor="state">Distrito</label>
              <select style={{width: "94%"}}
                



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
            </div>

            <div style={{display:"flex", flexWrap:"nowrap",width:"80%", marginLeft: "10%",textAlign: "center"}}>
            <div className="pure-control-group" style={{width: "25%", textAlign: "center"}}>
            
              <label htmlFor="state" style={{textAlign: "center"}}>Provincia</label>
              <select
              

              style={{width: "94%", height: "40px"}}
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
            <div className="pure-control-group" style={{width: "25%", textAlign: "center"}}>
              <label htmlFor="state" style={{textAlign: "center"}}>NomDep</label>
              <select
                
                style={{width: "94%", height: "40px"}}

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
            <div className="pure-control-group" style={{width: "25%", textAlign: "center"}}>
              <label style={{textAlign: "center"}}>Dirección</label>
              <input style={{width: "94%"}}
                value={this.state.persona.DirUsu}
                onChange={evt => {
                  this.cambiar(evt, "DirUsu");
                }}
                type="text"
                placeholder="Dirección"
              />
            </div>
            <div className="pure-control-group" style={{width: "25%", textAlign: "center"}}>
              <label style={{textAlign: "center"}}>Fecha Ingreso</label>
              <input style={{width: "94%"}}
                value={this.state.persona.FecIng}
                onChange={evt => {
                  this.cambiar(evt, "FecIng");
                }}
                type="text"
                placeholder="Fecha Ingreso"
              />
            </div>
            </div>

            <div style={{display:"flex", flexWrap:"nowrap",width:"80%", marginLeft: "10%"}}>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label htmlFor="state" style={{textAlign: "center"}}>tipo</label>
              <select
                style={{width: "94%", height: "40px"}}


                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "tipo");
                }}
              >
                <option>Antiguo</option>
                <option>Nuevo</option>
              </select>
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label style={{textAlign: "center"}}>PadUsu</label>
              <input style={{width: "94%"}}
                value={this.state.persona.PadUsu}
                onChange={evt => {
                  this.cambiar(evt, "PadUsu");
                }}
                type="text"
                placeholder="PadUsu"
              />
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label htmlFor="state" style={{textAlign: "center"}}>Escogido</label>
              <select
              

              style={{width: "94%"}}


                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "AsaSes");
                }}
              >
                <option>Asamblea</option>
                <option>Sesión</option>
              </select>
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label style={{textAlign: "center"}}>Herederos</label>
              <input style={{width: "94%"}}
                value={this.state.persona.NomHer}
                onChange={evt => {
                  this.cambiar(evt, "NomHer");
                }}
                type="text"
                placeholder="Herederos"
              />
            </div>
            </div>



            <div style={{display:"flex", flexWrap:"nowrap",width:"80%", marginLeft: "10%", marginBottom: "10px"}}>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label style={{textAlign: "center"}}>Fecha Reingreso</label>
              <input style={{width: "94%"}}
                value={this.state.persona.FecRei}
                onChange={evt => {
                  this.cambiar(evt, "FecRei");
                }}
                type="text"
                placeholder={this.state.placeholder}
              />
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label htmlFor="state" style={{textAlign: "center"}}>Tipo Documento</label>
              <select
                

                style={{width: "94%", height: "40px"}}

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
            <div className="pure-control-group" style={{width: "25%"}}>
              <label style={{textAlign: "center"}}>Número de Doc</label>
              <input required style={{width: "94%"}}
                value={this.state.persona.NumDoc}
                onChange={evt => {
                  this.cambiar(evt, "NumDoc");
                }}
                type="text"
                placeholder="Número de Documento"
              />
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label htmlFor="state" style={{textAlign: "center"}}>¿Activo?</label>
              <select
                
                style={{width: "94%"}}


                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            </div>

            <div style={{display:"flex", flexWrap:"nowrap",width:"80%", marginLeft: "10%"}}>
            <div className="pure-control-group" style={{marginRight: "5%", marginLeft: "5%", width: "15%"}}>
              <label style={{textAlign: "center", width: "100%"}}>¿Activo 04?</label>
              <select
              value={this.state.persona.Activo04}
                  
              style={{ width: "100%", textAlign: "center", height: "40px"}}


                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo04");
                }}
              >
                <option >No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label style={{textAlign: "center", width: "100%"}}>Fecha Reingreso 04</label>
              <input disabled = {!(this.state.persona.Activo04==="Si")} style={{ width: "94%"}}
                value={this.state.persona.FecRei04}
                onChange={evt => {
                  this.cambiar(evt, "FecRei04");
                }}
                type="text"
                placeholder={this.state.placeholder}
              />
            </div>
            <div className="pure-control-group" style={{marginRight: "5%", marginLeft: "5%", width: "15%"}}>
              <label style={{textAlign: "center", width: "100%"}}>¿Activo 06?</label>
              <select 
              value={this.state.persona.Activo06}
                

              style={{ width: "100%", textAlign: "center", height: "40px"}}

                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo06");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label style={{textAlign: "center", width: "100%"}}>Fecha Reingreso 06</label>
              <input disabled = {!(this.state.persona.Activo06==="Si")} style={{ width: "94%"}}
                value={this.state.persona.FecRei06}
                onChange={evt => {
                  this.cambiar(evt, "FecRei06");
                }}
                type="text"
                placeholder={this.state.placeholder}
              />
            </div>
            </div>
            
            <div style={{display:"flex", flexWrap:"nowrap",width:"80%", marginLeft: "10%"}}>
            <div className="pure-control-group" style={{marginRight: "5%", marginLeft: "5%", width: "15%"}}>
              <label style={{textAlign: "center", width: "100%"}}>¿Activo 08?</label>
              <select 
              value={this.state.persona.Activo08}
              style={{ width: "100%", textAlign: "center", height: "40px"}}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo08");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label>Fecha Reingreso 08</label>
              <input disabled = {!(this.state.persona.Activo08==="Si")} style={{ width: "94%"}}
                value={this.state.persona.FecRei08}
                onChange={evt => {
                  this.cambiar(evt, "FecRei08");
                }}
                type="text"
                placeholder={this.state.placeholder}
              />
            </div>
            <div className="pure-control-group"  style={{marginRight: "5%", marginLeft: "5%", width: "15%"}}>
              <label style={{textAlign: "center", width: "100%"}}>¿Activo 10?</label>
              <select
              value={this.state.persona.Activo10}
              style={{ width: "100%", textAlign: "center", height: "40px"}}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo10");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group"  style={{width: "25%"}}>
              <label style={{textAlign: "center", width: "100%"}}>Fecha Reingreso 10</label>
              <input disabled = {!(this.state.persona.Activo10==="Si")} style={{ width: "94%"}}
                value={this.state.persona.FecRei10}
                onChange={evt => {
                  this.cambiar(evt, "FecRei10");
                }}
                type="text"
                placeholder={this.state.placeholder}
              />
            </div>
            </div>

            <div style={{display:"flex", flexWrap:"nowrap",width:"80%", marginLeft: "10%"}}>
            <div className="pure-control-group"  style={{marginRight: "5%", marginLeft: "5%", width: "15%"}}>
              <label style={{textAlign: "center", width: "100%"}}>¿Activo 12?</label>
              <select
              value={this.state.persona.Activo12}
              style={{ width: "100%", textAlign: "center", height: "40px"}}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo12");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label style={{textAlign: "center", width: "100%"}}>Fecha Reingreso 12</label>
              <input disabled = {!(this.state.persona.Activo12==="Si")} style={{ width: "94%"}}
                value={this.state.persona.FecRei12}
                onChange={evt => {
                  this.cambiar(evt, "FecRei12");
                }}
                type="text"
                placeholder={this.state.placeholder}
              />
            </div>
            <div className="pure-control-group"  style={{marginRight: "5%", marginLeft: "5%", width: "15%"}}>
              <label style={{textAlign: "center", width: "100%"}}>¿Activo 14?</label>
              <select
              value={this.state.persona.Activo14}
              style={{ width: "100%", textAlign: "center", height: "40px"}}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo14");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label style={{textAlign: "center", width: "100%"}}>Fecha Reingreso 14</label>
              <input disabled = {!(this.state.persona.Activo14==="Si")} style={{ width: "94%"}}
                value={this.state.persona.FecRei14}
                onChange={evt => {
                  this.cambiar(evt, "FecRei14");
                }}
                type="text"
                placeholder={this.state.placeholder}
              />
            </div>
            </div>

            <div style={{display:"flex", flexWrap:"nowrap",width:"80%", marginLeft: "10%"}}>
            <div className="pure-control-group"  style={{marginRight: "5%", marginLeft: "5%", width: "15%"}}>
              <label style={{textAlign: "center", width: "100%"}}>¿Activo 16?</label>
              <select
              value={this.state.persona.Activo16}
              style={{ width: "100%", textAlign: "center", height: "40px"}}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo16");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>
            <div className="pure-control-group" style={{width: "25%"}}>
              <label style={{textAlign: "center", width: "100%"}}>Fecha Reingreso 16</label>
              <input disabled = {!(this.state.persona.Activo16==="Si")} style={{ width: "94%"}}
                value={this.state.persona.FecRei16}
                onChange={evt => {
                  this.cambiar(evt, "FecRei16");
                }}
                type="text"
                placeholder={this.state.placeholder}
              />
            
            </div>
            <div className="pure-control-group"  style={{marginRight: "5%", marginLeft: "5%", width: "15%"}}>
              <label style={{textAlign: "center", width: "100%"}}>¿Activo 18?</label>
              <select
              value={this.state.persona.Activo18}
              style={{ width: "100%", textAlign: "center", height: "40px"}}
                className="pure-input-1-2"
                onChange={evt => {
                  this.cambiar(evt, "Activo18");
                }}
              >
                <option>No</option>
                <option>Si</option>
              </select>
            </div>

            <div className="pure-control-group" style={{width: "25%"}}>
              <label style={{textAlign: "center", width: "100%"}} >Fecha Reingreso 18</label>
              <input disabled = {!(this.state.persona.Activo18==="Si")} style={{ width: "94%"}}
                value={this.state.persona.FecRei18}
                onChange={evt => {
                  
                  this.cambiar(evt, "FecRei18");
                }}
                type="text"
                placeholder={this.state.placeholder}
              />
            </div>
            
            </div>
            <div  style={{width:"100%", fontSize: "1.2em", marginTop: "20px"}}>
              <label style={{textAlign: "center", width: "100%", marginLeft: "0px"}} htmlFor="cb" className="pure-checkbox">
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

export default withRouter(Modelo);
