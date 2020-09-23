import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {compose} from 'redux';
// import PropsType from 'prop-types';
import {connect} from 'react-redux';
import 'firebase/auth';
import { firebaseConnect } from 'react-redux-firebase';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import notifyAction from '../../actions/notifyAction';
import Alert from '../layouts/Alert'; 


class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    submitHandler = (e) => {
        e.preventDefault();
        const {firebase, notifyAction} = this.props;
        const {email, password} = this.state;

        firebase.login({
            email,
            password
        }).
        then(this.props.history.push({pathname: '/', data: 'Login successfully'}))
        .catch(err => notifyAction('Credentials are wrong','error'));

    }

    changeHandler = e => this.setState({[e.target.name] : e.target.value});
    render() {

        let {message, messageType} = this.props.notify;
        return (
            
    <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card">
                {message ? (
                    Alert(message={message}, messageType={messageType})
                ): null}
                <h3 className="text-center  pt-3 pb-4">
                    <span className ="text-primary"> 
                        <FontAwesomeIcon icon={faLock} />{' '}
                        Login

                    </span>
                </h3>
                <div className="card-body">
               
                
                <form onSubmit={this.submitHandler}>
                   
                <div className="form-group">
                <input type="text" placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.changeHandler} />
                </div>
                <div className="form-group">
                <input type="password" name="password" placeholder="Password" className="form-control" value={this.state.password} onChange={this.changeHandler} />

                </div>
                    <input type="submit" className="btn btn-primary btn-block" value="Login" />
                </form>
                </div>
                


            </div>

        </div>
    </div>
        )
    }
}

export default compose(
    firebaseConnect(),
    connect((state,props) => ({
        notify: state.notify
    }), {notifyAction})
)(Login);
