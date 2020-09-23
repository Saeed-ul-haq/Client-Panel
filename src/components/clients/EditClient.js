import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {compose} from 'redux';
import PropsType from 'prop-types';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../layouts/Spinner';
    
class EditClient extends Component {

    constructor(props){
        super(props);
        // create refs
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }

    // changeHandler = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    updateHandler = (e) => {
        e.preventDefault();
        const {client, firestore} = this.props;

        // updated client
        const updatedClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value,
        }

        // updated client in firestore

        firestore.update({collection: 'clients', doc: client.id }, updatedClient)
        .then(this.props.history.push({ pathname: "/", data: 'Client has been edited successfully'})
        );

    }
    render()
    {

        const {client} = this.props;
        
       if (client){
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
                        Update Client
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.updateHandler} >
                                    
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" className="form-control"  required ref={this.firstNameInput}  defaultValue={client.firstName}/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                            <input type="text"  name="lastName" className="form-control"  minLength="2" required ref={this.lastNameInput} defaultValue={client.lastName} />
                        </div>

                        <div className="form-group">
                        <label htmlFor="email">Email</label>
                            <input type="email"  name="email" className="form-control" ref={this.emailInput} defaultValue={client.email}/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                            <input type="text"  name="phone" className="form-control" minLength="10" ref={this.phoneInput} required  defaultValue={client.phone}/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="balance">Balance</label>
                            <input type="text"  name="balance" className="form-control"  ref={this.balanceInput}  defaultValue={client.balance}/>
                        </div>
                        
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary btn-block">Update Client</button>
                        </div> 
                                    
                        </form>
                    </div>
                </div>
            </div>
)
            }
            else {
                return <Spinner />
            }
    }
}

EditClient.PropsType = {
    firestore: PropsType.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        {collection: 'clients', storeAs: 'client', doc: props.match.params.id}
    ]),
    connect(({firestore: {ordered}},props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(EditClient);
    