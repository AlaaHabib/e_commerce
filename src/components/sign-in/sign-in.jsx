import React, { Component } from "react"

import FormInput from '../../components/form-input/form-input'

import "./sign-in.css"
import CustomButton from "../custom-button/custom-button";
import {auth , signInWithGoogle} from '../../firebase/firebase.utils'

class SignIN extends Component {
    constructor(props){
        super(props);
        
        this.state={
            email : '',
            password : ''
        }
    }
   showAlert=(email) =>{
    alert("Welcome Back "+ email)
   }
    handleSubmit = async event => {
        event.preventDefault();
        
        const {email , password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email,password)
            this.showAlert(email);
            this.setState({email:'',password:''})
        
        } catch (error) {
            console.log(error)
        }

    }
    handleChange = event =>{
        const {value , name}=event.target ;
        this.setState({[name]:value});
        this.label=""
    }
   


    render(){
        return(
            <div className="sign-in">
                <h2>
                    I already have an account 
                </h2>
                <span>
                    Sign in with your email and password 
                </span>
                <form onSubmit={this.handleSubmit}>

                    <FormInput 
                    name="email" 
                    type="email" 
                    value={this.state.email} 
                    handleChange={this.handleChange} 
                    label="Email" 
                    required/>
                    <FormInput 
                    name="password" 
                    type="password" 
                    value={this.state.password} 
                    handleChange={this.handleChange} 
                    label="Password" 
                    required/>

                    <div className="buttons">
                        <CustomButton type="submit" > Sign In </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn  > 
                        {' '}
                        Sign in with Google {' '}
                        </CustomButton>
                    </div>

                </form>
            </div>
        )
    }
}

export default SignIN;