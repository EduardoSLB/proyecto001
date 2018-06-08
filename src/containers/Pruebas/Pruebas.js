import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import * as firebase from 'firebase';

//import familias from '../../assets/familias7.json';
//import ganado from '../../assets/ganado.json';
import terrenos from '../../assets/terrenos.json';

class Pruebas extends Component {
    state = {
        datos: ""
    }

    funcionJS = (evt) => {

        this.setState({datos: evt.target.value})

    }

    funcionSubmit = (index) => {
        console.log("Tamaño: " + terrenos.length+ "; index: " + index);
        const rootRef = firebase.database().ref().child('comuneros');
        /*
        const query = rootRef.orderByChild('CodUsu').equalTo(10).limitToFirst(1);
        query.on('value', snap=>{
            console.log(snap.val())
        })*/

        
        var i = index;
        if(terrenos[i]===undefined){
            return
        }
        var filtro = terrenos[i].Carnet;
        var seleccionados = [];
        for(; i<terrenos.length; i++){
            if(terrenos[i].Carnet===filtro){
                seleccionados.push(terrenos[i])
            }
            else{
                break
            }
        }
        const query = rootRef.orderByChild('CodUsu').equalTo(filtro).limitToFirst(1);

        
        if(seleccionados.length!==0){
            query.on('value', snap => {
                //console.log(snap.val())    
                console.log(snap.val());
                var val = snap.val()
                var id ;
                for(let key in val){
                    id = key
                }
                if(id===undefined){
                    setTimeout(function(){
                        //do what you need here
                    }, 10);
                }
                const rootRef2 = firebase.database().ref().child('terrenos/'+id);
                seleccionados.forEach(element => {
                    rootRef2.push().set(element)    
                });
                this.funcionSubmit(i)
            })
        }
        

        
        /*const rootRef = firebase.database().ref().child('hola');
        rootRef.push().set({familia: 'mucha', comida: 4, esperanza: 'Un montón'})*/
    }

    render (){
        return(
            <div style={{margin:"10px"}}>
                <input value={this.state.datos} onChange={evt => {
                    this.funcionJS(evt);
                }}/>
                <br/>
                <button style={{marginTop:"10px"}}onClick={()=>{this.funcionSubmit(0)}}>Submit</button>
            </div>
        )
    }
}

export default withRouter(Pruebas)