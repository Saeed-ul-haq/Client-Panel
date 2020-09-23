// import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
// import { createStore, combineReducers,applyMiddleware, compose } from 'redux';

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import notifyReducer from './reducers/notifyReducer';
import settingReducer from './reducers/settingReducer';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
import thunk from 'redux-thunk';
import {getFirestore} from 'redux-firestore'; 

const rootReducers = combineReducers({
      firebase: firebaseReducer,
      firestore: firestoreReducer,
      notify: notifyReducer,
      settings: settingReducer
    });

    if(localStorage.getItem('settings') == null){
      const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
      }

      localStorage.setItem('settings',JSON.stringify(defaultSettings));
    }


    const initialState = {};

      // Create store
    
      const store = createStore(
        rootReducers,
        initialState,
        
      // applyMiddleware( thunk.withExtraArgument({getFirebase,getFirestore})) // to add other middleware
      );

//  

  export default store;
  
  