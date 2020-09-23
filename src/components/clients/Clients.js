import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {compose} from 'redux';
import PropsType from 'prop-types';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import { faUsers, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../layouts/Spinner';

class Clients extends Component {

    state = {
        totalOwed: null
    }

    static getDerivedStateFromProps ( props, state) {

        const {clients} = props;

        if (clients) {
            const total = clients.reduce((total,client) => {
                return total + parseFloat(client.balance.toString());
            },0);

            return {totalOwed: total};
        }

        return null;

    }
    
    render() {
        const clients = this.props.clients;
        // const {clients} = this.props.clients;
        if(clients){
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>
                            <FontAwesomeIcon icon={faUsers} /> Clients {' '}
                            </h2>
                        </div>
                        <div className="col-md-6">
                            <h5 className="text-center text-secondary">
                                Total owed {' '}
            <span className="text-primary">${this.state.totalOwed.toFixed(2)}</span>
                            </h5>
                        </div>
                    </div>
                    <table className="table table-striped">
                    <thead className="">
                        <tr>
                        <th >Name</th>
                        <th >Email</th>
                        <th >Balance</th>
                        <th />
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.firstName} {client.lastName} </td>
                                <td>{client.email}</td>
                                <td>${parseFloat(client.balance).toFixed(2)}</td>
                                <td>
                                    <Link to={'/client/'+client.id} className="btn btn-sm btn-secondary">
                                        <FontAwesomeIcon icon={faArrowCircleRight} />
                                      {' '}  Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            )
        }else{
            return <Spinner />

        }
        
    }
}

Clients.PropsType = {
    clients: PropsType.array.isRequired,
    firestore: PropsType.object.isRequired  
}

export default compose(
    firestoreConnect([{ collection: 'clients'}]),
    connect((state,props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);


