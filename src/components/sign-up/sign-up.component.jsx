import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import FormInput from '../form-input/form-input.component'
import {auth,createProfileDocument} from '../../firebase/firebase.utils'
import './sign-up.styles.scss'

class SignUp extends React.Component {
    constructor(){
        super();
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        };

    }
    handleSubmit = async event=>{
        event.preventDefault();
        const {displayName,email,password,confirmPassword} = this.state;
        if(password !== confirmPassword){
            alert("Passwords don't match.");
            return;
        }
        try{
            const {user} =await auth.createUserWithEmailAndPassword(
                email
                ,password
                );
           await createProfileDocument(user,{displayName});
           
           this.setState({
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
           })

        }catch(error){
            console.log("Failed Sign Up", error.message);
        }

    }
    handleChange = event =>{
        const {name, value} = event.target;
        this.setState({[name]:value});
    }
    render(){
        const {displayName,email,password,confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form action="" onSubmit={this.handleSubmit}>
                    <FormInput 
                    type='text'
                    name='displayName'
                    value={displayName}
                    label = 'Display Name'
                    handleChange={this.handleChange}
                    required>

                    </FormInput>
                    <FormInput 
                    type='email'
                    name='email'
                    value={email}
                    label = 'Email'
                    handleChange={this.handleChange}
                    required>

                    </FormInput>
                    <FormInput 
                    type='password'
                    name='password'
                    value={password}
                    label = 'Password'
                    handleChange={this.handleChange}
                    required>

                    </FormInput>
                    <FormInput 
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    label = 'Confirm Password'
                    handleChange={this.handleChange}
                    required>

                    </FormInput>
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}
export default SignUp;