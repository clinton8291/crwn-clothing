import React from "react";

import "./signin.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from '../custom-button/custom-button.component';

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ email: "", password: "" });
  };
  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Signin with your email password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='email'
            label='email'
            name='email'
            className='form-input'
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <FormInput
            type='password'
            label='password'
            name='password'
            className='form-input'
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <CustomButton type='submit'>Signin</CustomButton>
        </form>
      </div>
    );
  }
}

export default Signin;
