import React from "react";

import "./signup.styles.scss";

import FormInput from "../form-input/form-input.component";

import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      //Check if password and confirm password are same
      alert("Passwords don't match!!");
      return;
    }
    try {
      //Method to create user object with Email and Password
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      ); 
      
      await createUserProfileDocument(user, { displayName });
      //Clears the form fields
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  handleChange = async (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Signup with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            label='Display Name'
            onChange={this.handleChange}
            value={displayName}
            required
          />
          <FormInput
            type='email'
            name='email'
            label='Email'
            onChange={this.handleChange}
            value={email}
            required
          />
          <FormInput
            type='password'
            name='password'
            label='Password'
            onChange={this.handleChange}
            value={password}
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            label='Confirm Password'
            onChange={this.handleChange}
            value={confirmPassword}
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default Signup;
