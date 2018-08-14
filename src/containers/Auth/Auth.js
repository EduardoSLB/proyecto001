import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import axios from 'axios';
import * as firebase from 'firebase/app';
import icono from './imagen.jpe'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Usuario'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Contraseña'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount = () =>{
        let token = localStorage.getItem('token');
        let expirationDate = new Date(localStorage.getItem('expirationDate'));

        if(token && expirationDate  > new Date().getTime()){
            this.props.history.push('/');
        }
            }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value, 
            returnSecureToken: true
        };
        
        firebase.auth().signInWithEmailAndPassword(authData.email, authData.password).catch(function(error){
            
        });

        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDemug8MlcGOyYFP1q7hrPI3S1N5z3lpmU', authData).then(response =>{
            
            this.setState({idToken: response.data.idToken})
            localStorage.setItem('token', response.data.idToken);
            let expire = new Date(new Date().getTime() + (response.data.expiresIn*1000));
            
            
            localStorage.setItem('expirationDate', expire);
            
            this.props.history.push('/');
        }, err =>{
            alert("Datos no válidos");
        });
        //this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    componentWillMount = ()=>{
        const token = localStorage.getItem('token');
        if(token){
            this.setState({idToken: token});
        }
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        const form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        return (
            <div className={classes.Auth} >
            <img style = {{width: "84%"}} src={icono} alt=""/>
                <form onSubmit={this.submitHandler} >
                    {form}
                    <Button btnType="Success">INICIAR SESIÓN</Button>
                </form>
            </div>
        );
    }
}

export default Auth ;