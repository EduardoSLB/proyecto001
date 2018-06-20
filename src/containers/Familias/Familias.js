import React, { Component } from 'react';
import ReactTable from 'react-table';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import * as firebase from 'firebase/app';
import Aux from '../../hoc/Auxiliar';
import PropTypes from 'prop-types';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class Familias extends Component {

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
          pathname: '/modfamilia', 
          search: '?' + queryString
        });
        
      }

      registrarItem = (id) => {
        const queryParams = [];
       queryParams.push(encodeURIComponent("tipo")+ '=' + encodeURIComponent("nuevo")); 
       const queryString = queryParams.join('&');
      this.props.history.push({
        pathname: '/modFamilia', 
        search: '?' + queryString
      });
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
            if(token){const query = new URLSearchParams(this.props.location.search);
            let id = null;
            for (let param of query.entries()) {
                if (param[0] === "id") {
                    id = param[1];
                    this.setState({
                        idItem: id
                    });
                }
            }
            const DataSacada = []
            const rootRef = firebase.database().ref().child('familias').child(id);
            rootRef.on('value', snap=>{
                var items = snap.val();
                for(let key in items){
                    let item={
                    ...items[key],
                    id: key
                    }
                    DataSacada.push(item)
                }
                if(DataSacada.length===0){
                    this.setState({vacio: true})
                }
                this.setState({datodos: DataSacada, variable: !this.state.variable, loading: false})
            });}
            else{
            
                this.props.history.push('/');
            }
    }

    render() {

        const { data, pages, loading, variable} = this.state;

        var nohayregistros = null;
        if(this.state.vacio){
            nohayregistros = <h1 style={{textAlign: "center", fontSize: "25px"}}>(No se encontraron registros)</h1>;
        }
        return(
            <Aux>
              <h1 style={{textAlign:"center", margin:"5px"}}>Familias</h1>
           <ReactTable style={{textAlign: "center"}}
            columns={[
              {
                Header: "Código",
                accessor: "CodPar"
              },

              {
                Header: "Apellido",
                accessor: "ApePar"
              },
              					
              {
                Header: "Nombre",
                accessor: "NomPar"
              },
              {
                Header: "Afiliación",
                accessor: "DesPar"
              },
              {
                Header: "Estado Civil",
                accessor: "DesCiv"
              },
              {
                Header: "Fecha Nacimiento",
                accessor: "FecPar"
              },
              {
                Header: "Fecha Reingreso",
                accessor: d=>d.FecRei,
                id: "FecRei"
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
                  <button style={{marginLeft:"10px", padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.modificarUsuario(row.original.id)}}>Editar</button>
                </div>       
            )
            }}
            defaultSorted={[
              {
                id: "CodUsu",
                asc: {variable}
              }
            ]}
            defaultPageSize={5}
            className="-striped -highlight"
            />
            {nohayregistros}
            <div style={{textAlign: "center"}}>
            <button style={{padding: "16px", fontSize: "16px", margin: " 10px"}} onClick={()=>{this.registrarItem("nuevo")}}>Registar familiar</button>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Familias));