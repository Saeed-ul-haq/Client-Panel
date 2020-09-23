import React from 'react';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import './App.css';
import{ BrowserRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {userIsAuthenticated,  userIsNotAuthenticated} from './helpers/auth';

import AppNavbar from './components/layouts/AppNavbar';
import Dashboard from './components/layouts/Dashboard';
import store from './store'; 
import { createFirestoreInstance, } from 'redux-firestore'
import AddClient from './components/clients/AddClient';
import ClientDetail from './components/clients/ClientDetail';
import EditClient from './components/clients/EditClient';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Settings from './components/settings/Settings';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const rrfConfig = { userProfile: 'users', useFirestoreForProfile: true } // react-redux-firebase config

const firebaseConfig = {
  apiKey: "AIzaSyBxrDjhHYN4xDxjCYhwI1KDeOMrWsjcFs0",
  authDomain: "reactclientpanel-2c688.firebaseapp.com",
  databaseURL: "https://reactclientpanel-2c688.firebaseio.com",
  projectId: "reactclientpanel-2c688",
  storageBucket: "reactclientpanel-2c688.appspot.com",
  messagingSenderId: "367797053299",
  appId: "1:367797053299:web:cccaf6ddf226e645580706",
  measurementId: "G-6B0PDXC8PR"
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
firebase.firestore()

// const store = store();

const rrfProps = {
    firebase,
    config: firebaseConfig,
    dispatch: store.dispatch,
    createFirestoreInstance 
  }

function App() {
  return (
    <div className="App">
      <Provider store={store} >
      <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
      <AppNavbar />
      
      <div className="container">
        <Switch>
        <Route exact path="/" component={userIsAuthenticated(Dashboard)} />
        <Route exact path="/client/add" component={userIsAuthenticated(AddClient)} />
        <Route exact path="/client/:id" component={userIsAuthenticated(ClientDetail)} />
        <Route exact path="/client/edit/:id" component={userIsAuthenticated(EditClient)} />
        <Route exact path="/login" component={userIsNotAuthenticated(Login)} />
        <Route exact path="/register" component={userIsNotAuthenticated(Register)} />
        <Route exact path="/settings" component={userIsAuthenticated(Settings)} />

        </Switch>
      
      </div>
      </BrowserRouter>
      </ReactReduxFirebaseProvider>
      </Provider>
      
      
    </div>
  );
}

export default App;
