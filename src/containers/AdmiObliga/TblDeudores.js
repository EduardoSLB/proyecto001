import React, { Component } from 'react';
import ReactTable from 'react-table';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Aux from '../../hoc/Auxiliar';
import PropTypes from 'prop-types';

class TblDeudores extends Component {

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

    
      componentWillReceiveProps() {
        this.setState({datodos: this.props.dataDeudas, variable: !this.state.variable})
    }

    render() {

        const { data, pages, loading, variable} = this.state;

        var nohayregistros = null;
        if(this.state.vacio){
            nohayregistros = <h1 style={{textAlign: "center", fontSize: "25px"}}>(No se encontraron registros)</h1>;
        }

        return(
            <Aux>
            
           <ReactTable style ={{width:"47%",textAlign: "center"}}

            columns={[
              {
                Header: "Código",
                accessor: "codigo"
              },
              {
                Header: "Nombre",
                accessor: d=>d.nombre,
                id: "Valor"
              }
            ]}

            manual // Forces table not to paginate or sort automatically, so we can handle it server-side
            data={data}
            pages={pages} // Display the total number of pages
            loading={loading} // Display the loading overlay when we need it
            onFetchData={this.fetchData} // Request new data when things change
            filterable
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
            
            
            </Aux>
        )
    }
    
}


export default withRouter(TblDeudores);