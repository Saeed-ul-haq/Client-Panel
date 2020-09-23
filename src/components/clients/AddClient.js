import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import {firestoreConnect} from 'react-redux-firebase';

class AddClient extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone:'',
        balance: ''
    }


    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    SubmitHandler = (e) => {
        e.preventDefault();
        // console.log(this.props);

        const newClient = this.state;

        const {firestore} = this.props;

        if(newClient.balance === '')
        {
            newClient.balance = 0
        }

        firestore.add({collection: 'clients'}, newClient).then(() => {
            this.props.history.push({
                pathname: '/',
                data: 'Client added sussesfully'
            })
        });
        
        
        
    }

    render(){

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                    <Link to="/" className="btn btn-link">
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                    {' '}Back to Dashboard
    
                    </Link>
                    </div>
                </div>
    
                <div className="card">
                    <div className="card-header">
                        Add Client
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.SubmitHandler} >
                                    
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" className="form-control" minLength="2" required onChange={this.changeHandler}/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                            <input type="text"  name="lastName" className="form-control" minLength="2" required onChange={this.changeHandler}/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="email">Email</label>
                            <input type="email"  name="email" className="form-control" onChange={this.changeHandler}/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                            <input type="text"  name="phone" className="form-control" minLength="10" required onChange={this.changeHandler}/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="balance">Balance</label>
                            <input type="text"  name="balance" className="form-control"  onChange={this.changeHandler}/>
                        </div>
                        
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary btn-block">Add Client</button>
                        </div> 
                                    
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    }
    

export default firestoreConnect() (AddClient);
