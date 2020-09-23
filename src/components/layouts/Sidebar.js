import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    return (
        <div>
            <Link to="/client/add" className="btn btn-success btn-block">
                <FontAwesomeIcon icon={faPlus} /> Add</Link>
        </div>
    )
}

export default Sidebar;
