import React, {
  Component
} from 'react';
import {
  withRouter
} from 'react-router-dom';
import _ from 'lodash';
import * as firebase from 'firebase/app';
import Aux from '../../hoc/Auxiliar';
import PropTypes from 'prop-types';
import TblDeudores from './TblDeudores';
import TblPagados from './TblPagados';

class AdmiObliga extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

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
      idItem: null,
      vacio: false,
      datosDeudores: [],
      datosPagados: [],
      verificacionUno: false,
      verificacionDos: false
    };
    this.fetchData = this.fetchData.bind(this);
  }

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


  componentDidMount() {
    let nombres = JSON.parse(localStorage.getItem("COMUNEROS"))
    
    const rootRef2 = firebase.database().ref().child('deudores').child(localStorage.getItem("idObliga"));
    rootRef2.on('value', snap => {
      let deudoresListos = []
      let pagadosListos = []
      
      for (let key in snap.val()) {
        if (nombres[key] !== undefined) {
          let object = {
            codigo: key,
            nombre: nombres[key].NomUsu + nombres[key].ApeUsu
          }
          if(snap.val()[key]==="1")
          deudoresListos.push(object)

          if (snap.val()[key] === "0") { //1, no han pagado; 0, han pagado
            pagadosListos.push(object)
          }
        }
      }

      this.setState({
        datosDeudores: deudoresListos
      })
      
      this.setState({
        datosPagados: pagadosListos
      }, ()=>{
        this.setState({
          datosPagados: pagadosListos
        })
      })

      
      
      })
      

  }
     
    render() {

        var nohayregistros = null;
        if(this.state.vacio){
            nohayregistros = <h1 style={{textAlign: "center", fontSize: "25px"}}>(No se encontraron registros)</h1>;
        }

        return(
            <Aux>
              <div style={{textAlign: "center", width: "100%", height: "auto", margin: "0px"}}>
              <h1 style={{margin: "0px"}}>Obligación N°: {localStorage.getItem("idObliga")}</h1></div>

              <div style={{display: "flex"}}>
              <h1 style={{textAlign:"center", width: "47%", marginLeft: "2%"}}>Deudores</h1>
              <div style={{width: "2%"}}></div>
              <h1 style={{textAlign:"center", width: "47%", marginRight: "2%"}}>Pagados</h1>
              </div>
              <div style={{display: "flex"}}>
              <div style={{width: "2%"}}></div>  
           <TblDeudores dataDeudas = {this.state.datosDeudores} verificacion={this.state.verificacionUno}/>

            <div style={{width: "2%"}}></div>

            <TblPagados dataPagas = {this.state.datosPagados} mencionar = {this.decirHola} verificacion={this.state.verificacionDos}
            />
              <div style={{width: "2%"}}></div>
            </div>
            {nohayregistros}
            
            
          
            <div style={{textAlign: "center"}}>
            
            <button
             style={{padding: "16px", fontSize: "16px", margin: " 10px"}} 
            onClick={this.context.router.history.goBack}>
            Atrás
            </button>
            </div>
            </Aux>
        )
    }


    
}


export default withRouter(AdmiObliga);