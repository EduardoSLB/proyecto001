import React, {
  Component
} from 'react';
import _ from 'lodash';
import Aux from '../../hoc/Auxiliar'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import ReactTable from 'react-table';
import axios from '../../axios-orders';
import {
  withRouter
} from 'react-router-dom';
import * as firebase from 'firebase/app';
import * as actionTypes from '../../store/actions';
import {
  connect
} from 'react-redux';
import * as MyDocs from './generarDocs';

class BurgerBuilder extends Component {

  constructor() {
    super();
    this.state = {
      data: [],
      datomomentaneo: [],
      datodos: [],
      pages: null,
      loading: true,
      variable: false,
      //loading: false,
      idToken: null,
      ganadoL: false,
      terrenoL: false,
      obligacionesL: false,
      deudasL: false,
      ganado: [],
      terrenos: [],
      obligaciones: [],
      deudas: []
    };

    this.fetchData = this.fetchData.bind(this);
  }

  state = {
    idToken: null
  }



  bajarData = () => {
    localStorage.removeItem("COMUNEROS")
    localStorage.removeItem("PROHIBIDOS")
    localStorage.removeItem("NOMBRESCOMUNEROS")
    const datosComuneros = [];
    const nombresComuneros = []
    axios.get('https://comunidad-palca.firebaseio.com/comuneros.json?auth=' + this.state.idToken).then((res) => {
      if (res) {

        for (let key in res.data) {
          let objeto = {
            ...res.data[key],
            id: key
          }
          datosComuneros.push(objeto);
          nombresComuneros[objeto["CodUsu"]]=objeto;
        }
        
        this.setState({
          datodos: datosComuneros,
          variable: !this.state.variable,
          loading: false
        });
        
        localStorage.setItem("NOMBRESCOMUNEROS", JSON.stringify(nombresComuneros))
        localStorage.setItem("COMUNEROS", JSON.stringify(datosComuneros))

        let numeroFinal = datosComuneros[datosComuneros.length-1]["CodUsu"] * 1 + 1
        localStorage.setItem("NUMEROFINAL", numeroFinal)
        this.props.guardarComuneros(datosComuneros);
      } else {
        this.props.history.push('/auth');
      }

    });
  }
  componentDidMount() {


    let tokenleido = localStorage.getItem('token');

    let expirationDate = new Date(localStorage.getItem('expirationDate'));
    this.setState({
      idToken: tokenleido
    });

    if (tokenleido && (new Date() < expirationDate)) {
      let dataGuardada = JSON.parse(localStorage.getItem("COMUNEROS"))
      

      if(dataGuardada===null)
      dataGuardada = []
      let nombres = JSON.parse(localStorage.getItem("NOMBRESCOMUNEROS"))
      if(nombres!==null){
          if(nombres.length!==0)
        this.bajarData()
      }

      if (this.props.totalComuneros.length === 0 && dataGuardada.length === 0) {
        this.bajarData()
      } else {
        this.setState({
          datodos: dataGuardada,
          variable: !this.state.variable,
          loading: false
        })
      }


    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
      this.props.history.push('/auth');
    }

  }

  requestData = (pageSize, page, sorted, filtered) => {
    return new Promise((resolve, reject) => {

      let filteredData = this.state.datodos;

      if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, filteredData);
      }
      let d = JSON.parse(localStorage.getItem("FILTRO"))
      if(d!=null)
      {if(d.length){
        filteredData = d.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, filteredData);
      }
      }

      const sortedData = _.orderBy(
        filteredData,
        sorted.map(sort => {
          return row => {
            if (row[sort.id] === null || row[sort.id] === undefined) {
              return -Infinity;
            }
            return typeof row[sort.id] === "string" ?
              row[sort.id].toLowerCase() :
              row[sort.id];
          };
        }),
        sorted.map(d => (d.desc ? "desc" : "asc"))
      );


      const res = {
        rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
        pages: Math.ceil(filteredData.length / pageSize)
      };
      setTimeout(() => resolve(res), 750);
    });

  };

  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({
      loading: true
    });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    this.requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }

  alertar = (info) => {
    alert(info);
  }

  componentWillMount = () => {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        idToken: token
      });
    } else {
      this.props.history.push('/auth');
    }
  }

  logout = () => {

   
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    firebase.auth().signOut();
    this.setState({
      idToken: null
    });
    this.props.history.push('/auth');
  }

  abrirPruebas = () => {
    this.props.history.push('/pruebas');
  }

  registrarUsuario = (id) => {

    const queryParams = [];
    /*
            for(let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i) + '='+encodeURIComponent(this.state.ingredients[i]));
            }
            queryParams.push('price='+this.state.totalPrice);
            const queryString = queryParams.join('&');
            this.props.history.push({
                pathname: '/checkout',
                search: '?' + queryString  
            }); */
    queryParams.push(encodeURIComponent("tipo") + '=' + encodeURIComponent("nuevo"));
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/modelo',
      search: '?' + queryString
    });
  }

  modificarUsuario = (id) => {

    localStorage.setItem('IDCOMUNERO', id);
    const queryParams = [];
    queryParams.push(encodeURIComponent("tipo") + '=' + encodeURIComponent("modificar"));
    queryParams.push(encodeURIComponent("id") + '=' + encodeURIComponent(id));
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/modelo',
      search: '?' + queryString
    });
    this.props.guardarIDComunero(id);
  }

  verInfo = (tipo, id, codigo, original) => {

    if(tipo === 'obligaciones'){
      this.props.history.push("obligaciones")  ;
      return;
    }
    if(original){
      localStorage.setItem("ORIGINAL", JSON.stringify(original))
    }

    localStorage.setItem('IDCOMUNERO', id);
    localStorage.setItem('CODIGOCOMUNERO', codigo);
    const queryParams = [];
    queryParams.push(encodeURIComponent("id") + '=' + encodeURIComponent(id));
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/' + tipo,
      search: '?' + queryString
    });
  }

  llamarAResumen(original){
    const rootRef = firebase.database().ref().child('ganado').child(original.id);
          rootRef.on('value', snap=>{
                this.setState({ganado: snap.val(), ganadoL: true}, ()=>{
                  this.mandarCrearDocumento(original)
                })
                
            });
    const rootRef2 = firebase.database().ref().child('terrenos').child(original.id);
          rootRef2.on('value', snap=>{
                this.setState({terrenos: snap.val(), terrenoL: true}, ()=>{
                  this.mandarCrearDocumento(original)
                })
                
            });

    const rootRef3 = firebase.database().ref().child('obligaciones');
          rootRef3.on('value', snap=>{
                this.setState({obligaciones: snap.val(), obligacionesL: true}, ()=>{
                  this.mandarCrearDocumento(original)
                })
                
            });
    const rootRef4 = firebase.database().ref().child('deudores');
          rootRef4.on('value', snap=>{
                this.setState({deudas: snap.val(), deudasL: true}, ()=>{
                  this.mandarCrearDocumento(original)
                })
            });
  }

  imprimirGanado = (original) => {
    const rootRef = firebase.database().ref().child('ganado').child(original.id);
          rootRef.on('value', snap=>{
                this.setState({ganado: snap.val(), ganadoL: true}, ()=>{
                  MyDocs.generarGanado(original, this.state.ganado)
                })
            });
  }

  imprimirTerrenos = (original) => {
    const rootRef2 = firebase.database().ref().child('terrenos').child(original.id);
          rootRef2.on('value', snap=>{
                this.setState({terrenos: snap.val(), terrenoL: true}, ()=>{
                  MyDocs.generarTerrenos(original, this.state.terrenos)
                })
            });
  }

  reportePorAnexo = () => {
  
    this.props.history.push("poranexos")  ;
  }

  mandarCrearDocumento(original){
    let uno, dos, tres, cuatro;
    uno = this.state.ganadoL;
    dos= this.state.terrenoL;
    tres = this.state.obligacionesL;
    cuatro = this.state.deudasL;
    if(uno && dos && tres && cuatro){
      this.setState({ganadoL: false, terrenoL: false, obligacionesL: false, deudasL: false})
      MyDocs.generarResumen(original, this.state.terrenos, this.state.ganado, this.state.obligaciones, this.state.deudas)
    }
  }

  render() {
    
    const { data, pages, loading, variable} = this.state;
        
    const disabledInfo={
        ...this.state.ingredients
    };  
    for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }



    return (
        <Aux>
          <h1 style={{textAlign:"center", margin:"5px"}}>Comuneros</h1>
       <ReactTable style={{textAlign: "center"}}
        onFilteredChange = {(value)=>{
          localStorage.setItem("FILTRO", JSON.stringify(value))
        }}
        
        columns={[
          {
            Header: "Código",
            accessor: "CodUsu"
          },

          {
            Header: "Apellido",
            accessor: "ApeUsu"
          },
                    
          {
            Header: "Nombre",
            accessor: "NomUsu"
          },
          {
            Header: "Anexo-Barrio",
            accessor: "NomAne"
          },
          {
            Header: "Estado Civil",
            accessor: "DesCiv"
          },
          {
            Header: "Sexo",
            accessor: "Sexo"
          },
          {
            Header: "Fecha Nacimiento",
            accessor: d=>d.FecNac,
            id: "FecNac"
          },
          {
            Header: "Ocupación",
            accessor: "DesOcu"
          },
          {
            Header: "Instrucción",
            accessor: "GraIns"
          },
          {
            Header: "Distrito",
            accessor: "NomDis"
          },
          {
            Header: "Provincia",
            accessor: "NomPro"
          },
          {
            Header: "Departamento",
            accessor: "NomDep"
          },
          {
            Header: "Dirección",
            accessor: "DirUsu"
          }

              

          ,
          {
            Header: "Fecha Ingreso",
            accessor: "FecIng"
          },
          {
            Header: "tipo",
            accessor: "tipo"
          },
          {
            Header: "PadUsu",
            accessor: "PadUsu"
          },
          {
            Header: "AsaSes",
            accessor: "AsaSes"
          },
          {							
            Header: "NomHer",
            accessor: "NomHer"
          },
          {
            Header: "FecRei",
            accessor: "FecRei"
          },
          {
            Header: "DesDoc",
            accessor: "DesDoc"
          },
          {
            Header: "NumDoc",
            accessor: "NumDoc"
          },
          {
            Header: "Activo",
            accessor: "Activo"
          },
          {
            Header: "Activo04",
            accessor: "Activo04"
          },
          {
            Header: "FecRei04",
            accessor: "FecRei04"
          },
          {											
            Header: "Activo06",
            accessor: "Activo06"
          },
          {
            Header: "FecRei06",
            accessor: "FecRei06"
          },
          {
            Header: "Activo08",
            accessor: "Activo08"
          },
          {
            Header: "FecRei08",
            accessor: "FecRei08"
          },
          {
            Header: "Activo10",
            accessor: "Activo10"
          },
          {
            Header: "FecRei10",
            accessor: "FecRei10"
          },
          {
            Header: "Activo12",
            accessor: "Activo12"
          },
          {
            Header: "FecRei12",
            accessor: "FecRei12"
          },
          {
            Header: "Activo14",
            accessor: "Activo14"
          },
          {
            Header: "FecRei14",
            accessor: "FecRei14"
          },
          {
            Header: "Activo16",
            accessor: "Activo16"
          },
          {
            Header: "FecRei16",
            accessor: "FecRei16"
          },
          {
            Header: "Activo18",
            accessor: "Activo18"
          },
          {
            Header: "FecRei18",
            accessor: "FecRei18"
          }
        ]}
        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        data={data}
        pages={pages} // Display the total number of pages
        loading={loading} // Display the loading overlay when we need it
        onFetchData={this.fetchData} // Request new data when things change
        filterable
        SubComponent={row => {
          
          return (
            <div style={{textAlign:"left", marginLeft: "40px" }}>
              
              <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.llamarAResumen(row.original)}}>Imprimir Resumen General</button>
              <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{MyDocs.generarDocumento(row.original)}}>Imprimir Certificado</button>
              <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{MyDocs.generarCarne(row.original)}}>Imprimir carnet</button>
              <button style={{marginLeft:"10px", padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.modificarUsuario(row.original.id)}}>Editar</button>
              <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.verInfo('familias',row.original.id, row.original.CodUsu)}}>Ver Familia</button>
              <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.verInfo('ganado',row.original.id, row.original.CodUsu, row.original)}}>Ver Ganado</button>
              
              <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.verInfo('terrenos',row.original.id, row.original.CodUsu, row.original)}}>Ver Terrenos</button>
              
              </div>
          
        )
        }}
        defaultSorted={[
          {
            id: "CodUsu",
            asc: {variable}
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
        />
        <div style={{textAlign: "center"}}>
        <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.verInfo('obligaciones')}}>Obligaciones</button>
        <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.registrarUsuario("nuevo")}}>Registar comunero</button>
        <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.reportePorAnexo()}}>Reporte Por Anexo</button>
        <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={this.bajarData}>Actualizar tabla</button>
        <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={this.logout}>Cerrar Sesión</button>
        </div>
        <p style={{marginLeft: "2em"}}>* Nota: Recuerde actualizar la tabla para que los últimos cambios realizados tengan efecto.</p>
        </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    idComunero: state.idComunero,
    totalComuneros: state.totalComuneros
  };
}

const mapDispatchToProps = dispatch => {
  return {
    guardarComuneros: (result) => dispatch({
      type: actionTypes.TOTAL_COMUNEROS,
      comuneros: result
    }),
    guardarIDComunero: (result) => dispatch({
      type: actionTypes.ID_COMUNERO,
      idComunero: result
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));

/*
Botones sacados, no sé si querrán que los vuelva a poner
              <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.imprimirTerrenos(row.original)}}>Imprimir Terrenos</button>

              <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.imprimirGanado(row.original)}}>Imprimir Ganado</button>

*/