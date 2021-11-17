import React from 'react';

import './signin-signup-page.styles.scss';

import Signin from '../../components/signin/signin.component';
import Signup from '../../components/signup/signup.component';

const SigninSignupPage = () => {
    return (<div className="sign-in-sign-up">
        <Signin />
        <Signup />
    </div>)
}

export default SigninSignupPage;