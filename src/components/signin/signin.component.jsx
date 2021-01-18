import React from 'react'
import './signin.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import FormInput from '../form-input/form-input.component'
import {auth,signInWithGoogle}  from '../../firebase/firebase.utils'
class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }
    handleSubmit =async event => {
        event.preventDefault();
            const{email,password} = this.state;
        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'',password:''})
        }catch(error){
            console.log(error);
        }

        
    }
    handleChange= event =>{
        const {value,name} = event.target;
        this.setState({ [name]: value })
    }
    render(){
        return(
            <div className='sign-in'>
                <h2 className='title' >I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form action="" onSubmit={this.handleSubmit}>
                    <FormInput 
                    name='email'
                    type="email"
                    value={this.state.email}
                    label="email"
                    required
                    handleChange={this.handleChange}/>
                    
                    <FormInput 
                    name='password'
                    type="password"
                    value={this.state.password}
                    handleChange={this.handleChange}
                    label="password"/>
                    <div className='buttons'>
                        <CustomButton type="submit">sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIN >sign in with Google</CustomButton>
                    </div>
                    
                </form>

            </div>
        )
    }
}

export default SignIn;