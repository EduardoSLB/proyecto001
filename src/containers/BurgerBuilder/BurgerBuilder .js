import React, { Component } from 'react';
import _ from 'lodash';
import Aux from '../../hoc/Auxiliar'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import ReactTable from 'react-table';
import axios from '../../axios-orders';

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
        this.setState({idToken: tokenleido});
        if(tokenleido){
        
    const datosComuneros=[];
        axios.get('https://proyecto-tarma.firebaseio.com/comuneros.json?auth='+this.state.idToken).then((res)=>{
            for(let key in res.data){
                let objeto = {
                    ...res.data[key],
                    id: key
                }
                datosComuneros.push(objeto);
                
            }
            this.setState({datodos: datosComuneros, variable: !this.state.variable});
        });
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
        this.setState({idToken: null});
        this.props.history.push('/auth');
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
                  
                  <button onClick={()=>{this.alertar("Falta implementar")}}>Modificar</button>
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
            
            </Aux>
        );

    }
}

export default withErrorHandler(BurgerBuilder, axios);