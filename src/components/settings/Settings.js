import React, { Component } from 'react'
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';
import {
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit,
    setAllowRegistration

} from '../../actions/settingAction';

class Settings extends Component {

    allowRegistrationChange = () => {
        const {setAllowRegistration} = this.props;
        setAllowRegistration();
    }

    disableBalanceOnAddChange = () => {
        const {setDisableBalanceOnAdd} = this.props;
        setDisableBalanceOnAdd();
    }

    disableBalanceOnEditChange = () => {
        const {setDisableBalanceOnEdit} = this.props;
        setDisableBalanceOnEdit();
    }
    

    render() {
        const {disableBalanceOnAdd,disableBalanceOnEdit, allowRegistration } = this.props.settings;
        return (
            <div>
                <div className="row">
                <div className="col-md-6">
                    <Link to="/" className="btn btn-link" >
                        <FontAwesomeIcon icon={faArrowCircleLeft} /> Back to Dashboard
                    </Link>
                </div>
                
                </div>
                <div className="card">
                    <div className="card-header">
                        Edit setting
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label >Allow Regisration</label> {' '}
                                <input type="checkbox" onChange={this.allowRegistrationChange} name="allowRegistration" checked={!!allowRegistration}/>
                            </div>
                            <div className="form-group">
                                <label >Disable Balance on Add</label>{' '}
                                <input type="checkbox" onChange={this.disableBalanceOnAddChange} name="disableBalanceOnAdd" checked={disableBalanceOnAdd}/>
                            </div>
                            <div className="form-group">
                                <label >Disable Balance on Edit</label>{' '}
                                <input type="checkbox" onChange={this.disableBalanceOnEditChange} name="disableBalanceOnEdit" checked={disableBalanceOnEdit}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    settings: propTypes.object.isRequired,
    setAllowRegistration: propTypes.func.isRequired,
    setDisableBalanceOnAdd: propTypes.func.isRequired,
    setDisableBalanceOnEdit: propTypes.func.isRequired
}

export default connect( (state,props) => ({
    auth: state.firebase.auth,
    settings: state.settings
}),{setAllowRegistration,setDisableBalanceOnAdd,setDisableBalanceOnEdit})(Settings);
