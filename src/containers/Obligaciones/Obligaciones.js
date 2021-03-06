import React, { Component } from 'react';
import ReactTable from 'react-table';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as firebase from 'firebase/app';
import Aux from '../../hoc/Auxiliar';
import PropTypes from 'prop-types';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';
//import Ganado from './Json/ganado.json'

class Obligaciones extends Component {

  static contextTypes = {
    router:  PropTypes.object
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
            vacio: false
        };
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(state, instance) {
        // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
        // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
        this.setState({ loading: true });
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
                  return typeof row[sort.id] === "string"
                    ? row[sort.id].toLowerCase()
                    : row[sort.id];
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

 
      modificarUsuario = (id) =>{
        const queryParams = [];
        localStorage.setItem('IDITEM', id);
        this.props.guardarIdItem(id);
        queryParams.push(encodeURIComponent("tipo")+ '=' + encodeURIComponent("modificar"));  
         const queryString = queryParams.join('&');
        this.props.history.push({
          pathname: '/modobligacion', 
          search: '?' + queryString
        });
        
      }

      administrar = (idObliga) =>{
        localStorage.setItem("idObliga", idObliga)

        this.props.history.push('admiobligaciones');

    }

      registrarItem = (id) => {
        const queryParams = [];
       queryParams.push(encodeURIComponent("tipo")+ '=' + encodeURIComponent("nuevo")); 
       const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/modobligacion', 
        search: '?' + queryString
      });
    }

    /*agregarUno = (ganado, id) =>{
      const rootReff = firebase.database().ref();
      console.log(ganado)
      rootReff.child("comuneros").orderByChild("CodUsu").equalTo(id).on('value', snap=>{
 
        for(let key in snap.val()){
          for(let r = 0; r<ganado.length; r++)
          rootReff.child("ganado").child(key).push().set(ganado[r])
        }
       
      })
    }

    subirDB = () => {
      /*const rootReff = firebase.database().ref();
      rootReff.child("terrenos").remove();
      
      let i = 0;
      let ganadoR = [];
      let id = Ganado[0].Carnet
      for(; i<Ganado.length; i++)
      {   
          if(Ganado[i].Carnet===id){
            ganadoR.push(Ganado[i])
            if(i===Ganado.length-1){
              this.agregarUno(ganadoR, Ganado[i].Carnet)
              //console.log("i2: "+i, Ganado.length)
            }

          }else{
            if(i===Ganado.length-1&&Ganado){
              let ganadoRR = []
              ganadoRR.push(Ganado[i])
              this.agregarUno(ganadoRR, Ganado[i].Carnet)
              //console.log("i: "+i, Ganado.length)
            }
            this.agregarUno(ganadoR, id)
            id=Ganado[i].Carnet  
            ganadoR=[]
            ganadoR.push(Ganado[i])
            
          }

        }
     
    }
*/
    componentDidMount() {
        
        /*
        const rootRef = firebase.database().ref().child('obligaciones');
        var objeto = {CodObl: 49, DesObl: "Asamblea", FecObl:"13/23/____" , Valor: "3", Asunto: "NNN"};
        rootRef.child(objeto.CodObl).set(objeto).then(console.log(objeto));
        */
        const rootRef = firebase.database().ref().child('obligaciones');
        rootRef.on('value', snap=>{
            let datosObligaciones = [];
            for (let key in snap.val()) {
              let objeto = {
                ...snap.val()[key],
                id: key
              }
              datosObligaciones.push(objeto);

            }
            if(datosObligaciones.length===0){
              this.setState({vacio: true})
              localStorage.setItem("NUMEROOBLIGACION", 0)
              
            }else{
              let numeroFinal = datosObligaciones[datosObligaciones.length-1]["CodObl"] * 1 +1
              localStorage.setItem("NUMEROOBLIGACION", numeroFinal)
           
              }
            
            this.setState({datodos: datosObligaciones,variable: !this.state.variable})
            
        });
        
    }

    render() {

        const { data, pages, loading, variable} = this.state;

        var nohayregistros = null;
        if(this.state.vacio){
            nohayregistros = <h1 style={{textAlign: "center", fontSize: "25px"}}>(No se encontraron registros)</h1>;
        }
        return(
            <Aux>
              <h1 style={{textAlign:"center", margin:"5px"}}>Obligaciones</h1>
           <ReactTable style={{textAlign: "center"}}
            columns={[
              {
                Header: "Código",
                accessor: "CodObl"
              },

              {
                Header: "Descripción",
                accessor: "DesObl"
              },
              					
              {
                Header: "Fecha",
                accessor: "FecObl"
              },
              {
                Header: "Asunto",
                accessor: "Asunto"
              },
              {
                Header: "Valor (Soles)",
                accessor: d=>d.Valor,
                id: "Valor"
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
                <div>
                  <button style={{marginLeft:"10px", padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.administrar(row.original.id)}}>Administrar Obligación</button>
                  <button style={{marginLeft:"10px", padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.modificarUsuario(row.original.CodObl)}}>Editar Obligación</button>
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
            {nohayregistros}
            <div style={{textAlign: "center"}}>
            <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.registrarItem("nuevo")}}>Crear Nueva Obligación</button>
            
            
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


const mapStateToProps = state =>{
  return {
    idComunero: state.idComunero, 
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    guardarIdItem: (result) => dispatch({type: actionTypes.ID_ITEM, id: result}),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Obligaciones));