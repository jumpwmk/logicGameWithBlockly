import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';

import './sign-in-sign-up.styles.scss';

class SignInAndSignUpPage extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(firebase.auth().currentUser);
  //   if (firebase.auth().currentUser) {
  //     return true;
  //   }
  //   return false;
  // }
  render() {
    if (firebase.auth().currentUser) {
      return <Redirect to={'/home'} />;
    }
    return (
      <div className='sign-in-and-sign-up'>
        <SignIn />
        <SignUp />
      </div>
    );
  }
}

export default SignInAndSignUpPage;
