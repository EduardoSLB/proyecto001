import React, { Component } from 'react';
import _ from 'lodash';
import Aux from '../../hoc/Auxiliar'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import ReactTable from 'react-table';
import axios from '../../axios-orders';
import { withRouter } from 'react-router-dom';
//import classes from '../../assets/react-table.css';
import * as firebase from 'firebase';
//import noraxios from 'axios';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {

    constructor(){
        super();
        this.state = {
          data: [],
          datomomentaneo:[],
          datodos: [],
          pages: null,
          loading: true, 
          variable: false, 
        //loading: false,
          idToken: null
        };

        this.fetchData = this.fetchData.bind(this);
      }

    state = {
        idToken: null
    }

    componentDidMount() {


        let tokenleido = localStorage.getItem('token');
       
        let expirationDate = new Date(localStorage.getItem('expirationDate'));
        this.setState({idToken: tokenleido});
       
        if(tokenleido && (new Date()<expirationDate)){
         
            if(this.props.totalComuneros.length===0){
              const datosComuneros=[];
            axios.get('https://proyecto-tarma.firebaseio.com/comuneros.json?auth='+this.state.idToken).then((res)=>{
              if(res){   
                
            for(let key in res.data){
                    let objeto = {
                        ...res.data[key],
                        id: key
                    }
                    datosComuneros.push(objeto);
                    
                }
                this.setState({datodos: datosComuneros, variable: !this.state.variable, loading: false});
                this.props.guardarComuneros(datosComuneros);
              }else{
                this.props.history.push('/auth');
              }

            });
            }else{
              this.setState({datodos: this.props.totalComuneros, variable: !this.state.variable})
            }

          
    } else{
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
    
    alertar = (info) =>{
        alert(info);
      }

    
    
      componentWillMount = ()=>{
        const token = localStorage.getItem('token');
        if(token){
            this.setState({idToken: token});
        }else{
            this.props.history.push('/auth');
        }
    }

    logout = ()=>{

      alert(this.props.totalComuneros.length)
      /*
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        firebase.auth().signOut();
        this.setState({idToken: null});
        this.props.history.push('/auth');*/
    }

    abrirPruebas = () =>{
      this.props.history.push('/pruebas');
    }

    registrarUsuario = (id) => {
      
        const queryParams = [];/*
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString  
        }); */
       queryParams.push(encodeURIComponent("tipo")+ '=' + encodeURIComponent("nuevo")); 
       const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/modelo', 
        search: '?' + queryString
      });
    }

    modificarUsuario = (id) =>{
      
      localStorage.setItem('IDCOMUNERO', id);
      const queryParams = [];
       queryParams.push(encodeURIComponent("tipo")+ '=' + encodeURIComponent("modificar")); 
       queryParams.push(encodeURIComponent("id")+ '=' + encodeURIComponent(id)); 
       const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/modelo', 
        search: '?' + queryString
      });
      this.props.guardarIDComunero(id);
    }
    
    verInfo = (tipo, id) => {
      alert(id + "IDCOMUNERO")
      localStorage.setItem('IDCOMUNERO', id);
      const queryParams = [];
       queryParams.push(encodeURIComponent("id")+ '=' + encodeURIComponent(id)); 
       const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/' + tipo, 
        search: '?' + queryString
      });
    }

    render(){

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
                <div style={{textAlign:"left", marginLeft: "500px" }}>
                  
                  <button style={{marginLeft:"10px", padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.modificarUsuario(row.original.id)}}>Modificar</button>
                  <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.alertar("En proceso...")}}>Imprimir Certificado</button>
                  <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.alertar("En proceso...")}}>Imprimir carnet</button>
                  
                  <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.verInfo('familias',row.original.id)}}>Familia</button>
                  <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.verInfo('ganado',row.original.id)}}>Ganado</button>
                  <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.verInfo('terrenos',row.original.id)}}>Terrenos</button>
                  
                  </div>
              
            )
            }}
            defaultSorted={[
              {
                id: "CodUsu",
                asc: {variable}
              }
            ]}
            defaultPageSize={20}
            className="-striped -highlight"
            />
            <div style={{textAlign: "center"}}>
            <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.registrarUsuario("nuevo")}}>Registar usuario</button>
            <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={this.logout}>Cerrar Sesión</button>
            </div>
            </Aux>
        );
    }
    /*<button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.abrirPruebas()}}>Pruebas</button>*/
}

const mapStateToProps = state =>{
  return {
    idComunero: state.idComunero, 
    totalComuneros: state.totalComuneros
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    guardarComuneros: (result) => dispatch({type: actionTypes.TOTAL_COMUNEROS, comuneros: result}),
    guardarIDComunero: (result) => dispatch({type: actionTypes.ID_COMUNERO, idComunero: result})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));

