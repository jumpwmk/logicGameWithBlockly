/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { store } from './redux/store';
import { withBackendUrl } from './utils/withBackendUrl';

import './App.css';

class App extends React.Component {
  fetchData = async () => {
    const path = '/maps/get-map';
    const data = {};

    console.log(withBackendUrl(path));

    await axios
      .post(withBackendUrl(path), data)
      .then(response => {
        const { tiles, player } = response.data;
        store.dispatch({
          type: 'ADD_TILES',
          payload: { tiles }
        });
        store.dispatch({
          type: 'INIT_PLAYER',
          payload: { ...player }
        });
      })
      .catch(function(error) {
        console.log(error);
        return;
      });
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);

        (await userRef).onSnapshot(snapShot => {
          store.dispatch({
            type: 'SET_CURRENT_USER',
            payload: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }

      store.dispatch({
        type: 'SET_CURRENT_USER',
        payload: userAuth
      });
    });
    this.fetchData();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/signin' component={SignInSignUp} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(App);
