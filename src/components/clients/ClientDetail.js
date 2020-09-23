import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {compose} from 'redux';
import PropsType from 'prop-types';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import { faPencilAlt, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../layouts/Spinner';
import classnames from 'classnames'
    
class ClientDetail extends Component {

    state = {
        showBalanceUpate: false,
        BalanceUpateAmount: ''
    }


    //       Balance form submit
    balanceSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);

        
        const clientUpate = {
            balance: parseFloat(this.state.BalanceUpateAmount)
        }

        // update in firestore

        this.props.firestore.update({collection: 'clients', doc: this.props.client.id}, clientUpate);
    }

    changedHander = (e) => this.setState({[e.target.name] : [e.target.value]});

    // delete client 
    deleteHandler = () => {
        // console.log('hiiiiii');

        const {client, firestore, history} = this.props;

        firestore.delete({collection: 'clients', doc: client.id})
        .then(
            history.push({pathname: '/', data: 'Deleted succesfully'})
        );
        
    }

    render() {

        const {client} = this.props;
        const {showBalanceUpate, BalanceUpateAmount} = this.state;
        let balanceForm = '';

        if (showBalanceUpate) {
            balanceForm = 
            <form onSubmit={this.balanceSubmit}>
            <div className="input-group">
                <input type="text" 
                className="form-control" 
                name="BalanceUpateAmount"
                placeholder="Add new Balance" 
                value={BalanceUpateAmount} 
                onChange={this.changedHander} />
                <div className="input-group-append">
                    <input type="submit" className="btn btn-outline-dark" value="Update   "/>
                    
                </div>
            </div>
            </form>
        }
       if (client){
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                        <Link to="/" className="btn btn-secondary">
                            <FontAwesomeIcon icon={faArrowCircleLeft} /> {' '} Back to Dashoard
                        </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="btn-group float-right">
                                <Link to={'/client/edit/' + client.id} className="btn btn-dark">
                                    Edit
                                </Link>
                                <button onClick={this.deleteHandler} className="btn btn-danger">
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                    <hr />
                    <div className="card">
                        <h3 className="card-header">
                            {client.firstName} {client.lastName}
                        </h3>
                        <div className="card-body">
                             <div className="row">
                                 <div className="col-md-8 col-sm-6">
            <h4>Client ID:{' '} <span className="text-secondary">{client.id}</span></h4>
                                 </div>
                                 <div className="col-md-4 col-sm-6">
                                    <h3 className="pull-right">
                                    Balance:
                                 <span className={classnames({
                                     'text-danger': client.balance > 0,
                                     'text-success': client.balance === 0
                                 })}> ${parseFloat(client.balance).toFixed(2)}</span> {' '}
                                    <small>
                                        <a href="#" classnames="btn-link" onClick={() =>  this.setState(state => ({
                                            showBalanceUpate: !state.showBalanceUpate
                                        })) }>
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </a>
                                     </small></h3> 
                                 {balanceForm}
                                 </div>
                             </div>
                             <hr />
                             <ul className="list-group">
                             <li className="list-group-item">Contact Email: {client.email}</li>
                             <li className="list-group-item">Contact Phone: {client.phone}</li>  
                             </ul>
                        </div>
                    </div>
                </div>
            );}
            else {
                return (
                    <Spinner />
                )
            }

       
       
    }
}

ClientDetail.PropsType = {
    firestore: PropsType.object.isRequired,
    client: PropsType.array.isRequired
};

export default compose(
    firestoreConnect(props => [
        {collection: 'clients', storeAs: 'client', doc: props.match.params.id}
    ]),
    connect(({firestore: {ordered}},props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetail);
    