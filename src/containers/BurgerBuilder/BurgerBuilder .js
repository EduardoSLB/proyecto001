import React, { Component } from 'react';
import _ from 'lodash';
import Aux from '../../hoc/Auxiliar'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import ReactTable from 'react-table';
import axios from '../../axios-orders';
import { withRouter } from 'react-router-dom';
//import classes from '../../assets/react-table.css';

//import noraxios from 'axios';


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
          ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }, 
        totalPrice: 4, 
        purchasable: false,
        purchasing: false, 
        //loading: false,
        idToken: null
        };
        this.fetchData = this.fetchData.bind(this);
      }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }, 
        totalPrice: 4, 
        purchasable: false,
        purchasing: false, 
        loading: false,
        idToken: null
    }

    componentDidMount() {
        
        let tokenleido = localStorage.getItem('token');
       
        let expirationDate = new Date(localStorage.getItem('expirationDate'));
        this.setState({idToken: tokenleido});
       
        if(tokenleido && (new Date()<expirationDate)){
         
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
                
              }else{
                this.props.history.push('/auth');
              }

            });
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

    

    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey];
        })
        .reduce((sum, el)=>{
            return sum + el;
        }, 0);

        this.setState({purchasable: sum>0});
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
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        this.setState({idToken: null});
        this.props.history.push('/auth');
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
      const queryParams = [];
       queryParams.push(encodeURIComponent("tipo")+ '=' + encodeURIComponent("modificar")); 
       queryParams.push(encodeURIComponent("id")+ '=' + encodeURIComponent(id)); 
       const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/modelo', 
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
           <ReactTable
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
                <div style={{ padding: "20px" }}>
                  
                  <button onClick={()=>{this.modificarUsuario(row.original.id)}}>Modificar</button>
                  <button onClick={()=>{this.alertar("Falta implementar")}}>Imprimir Certificado</button>
                  <button onClick={()=>{this.alertar("Falta implementar")}}>Imprimir carnet</button>
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
            <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={this.logout}>Cerrar Sesión</button>
            <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.registrarUsuario("nuevo")}}>Registar usuario</button>
            </Aux>
        );

    }
}

export default withRouter(withErrorHandler(BurgerBuilder, axios));

