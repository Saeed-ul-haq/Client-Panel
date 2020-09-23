import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
// import 'firebase/auth';
import { firebaseConnect } from 'react-redux-firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faUser, faKey, faUserPlus } from '@fortawesome/free-solid-svg-icons';

class AppNavbar extends Component {

    state = {
        isAuthenticated: false
    }

    static getDerivedStateFromProps(props, state) {
        const {auth} = props;

        if(auth.uid){
            return {isAuthenticated: true};
        }
        else {
            return {isAuthenticated: false};
        }

        
    }

    logoutHandler = (e) => {
        e.preventDefault();
        console.log(this.props);
        this.props.firebase.logout();
        
    }
    render() {
        
        return (
            <nav 
                className="navbar navbar-expand-md bg-primary  navbar-dark mb-4">
                <div className="container">
                <Link className=" navbar-brand" to="/">
                    Client Panel
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                        aria-controls="navbarMain" aria-expanded="false" 
                        aria-label="Toggle navigation"
                        data-target="#navbarMain">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarMain">
                {this.state.isAuthenticated? (<ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    
                <Link className="nav-link" to="/">{this.props.auth.email} {' '} 
                    <FontAwesomeIcon icon={faUser} />
                </Link>
                    
                </li>
                <li className="nav-item">
                    
                    <Link to="/settings" className="nav-link" >Setting </Link>
                        
                </li>
            
                </ul>): null}
                {this.state.isAuthenticated? (<ul className="navbar-nav">
                <li className="nav-item">
                    
                <a href="#" className="nav-link" onClick={this.logoutHandler}>Log out <FontAwesomeIcon icon={faPowerOff} /></a>
                    
                </li>
               
            
                </ul>): (<ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    
                <Link to="/login" className="nav-link" >login <FontAwesomeIcon icon={faKey} /></Link>
                    
                </li>
                <li className="nav-item">
                    
                <Link to="/register" className="nav-link" >Register <FontAwesomeIcon icon={faUserPlus} /></Link>
                    
                </li>
            
                </ul>)}
                
                </div>
                </div>

        </nav>
        )
    }
}

export default compose(
    firebaseConnect(),
    connect((state,props) => ({
        auth: state.firebase.auth,
        settings: state.settings
    }))
)(AppNavbar);
