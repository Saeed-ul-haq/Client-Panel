import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

import LoadingSpinner from '../components/layouts/Spinner'

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
    // The url to redirect user to if they fail
   redirectPath: (state,ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login' ,
   allowRedirectBack: true,
   AuthenticatingComponent: LoadingSpinner,
    // Determine if the user is authenticated or not
    authenticatedSelector: ({firebase: {auth}}) =>
    auth.isLoaded && !auth.isEmpty,
 // Returns true if the user auth state is loading
 authenticatingSelector: ({ firebase: {auth,profile,isInitializing}}) => 
  !auth.isLoaded || isInitializing === true,
   // A nice display name for this check
   wrapperDisplayName: 'UserIsAuthenticated'
 });

 export const userIsNotAuthenticated = connectedRouterRedirect({
    // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
        AuthenticatingComponent: LoadingSpinner,
    // This prevents us from adding the query parameter when we send the user away from the login page
    allowRedirectBack: false,
    // Determine if the user is authenticated or not
    authenticatedSelector: ({firebase: {auth}}) =>
      auth.isLoaded && auth.isEmpty,

      // Returns true if the user auth state is loading
    authenticatingSelector: ({firebase: {auth,isInitializing}}) => 
      !auth.isLoaded || isInitializing === true,
    // A nice display name for this check
    wrapperDisplayName: 'UserIsNotAuthenticated'
  });

// export const userIsAuthenticated = connectedRouterRedirect({
//   // The url to redirect user to if they fail
//  redirectPath: '/login',
//   // If selector is true, wrapper will not redirect
//   // For example let's check that state contains user data
//  authenticatedSelector: state => state.user.data !== null,
//  // A nice display name for this check
//  wrapperDisplayName: 'UserIsAuthenticated'
// })


// export const userIsNotAuthenticated = connectedRouterRedirect({
//   // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
//   redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/landing',
//   // This prevents us from adding the query parameter when we send the user away from the login page
//   allowRedirectBack: false,
//    // If selector is true, wrapper will not redirect
//    // So if there is no user data, then we show the page
//   authenticatedSelector: state => state.user.data === null,
//   // A nice display name for this check
//   wrapperDisplayName: 'UserIsNotAuthenticated'
// })




