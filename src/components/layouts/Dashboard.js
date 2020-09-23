import React from 'react';
import Sidebar from './Sidebar';
import Clients from '../clients/Clients';
import classnames from 'classnames';

function Dashboard(props) {
    return (
        <div>
            <div className="row">
                


            <div className="col-md-10"> 
            
                {props.location.data? (
                    <div className={classnames('alert',{
                        'alert-danger': props.location.data === 'Deleted succesfully',
                        'alert-info': props.location.data !== 'Deleted succesfully'
                    })} >
                    {props.location.data}
                 </div>
                ): null}
            
            <Clients />
            </div>
            <div className="col-md-2">
            <Sidebar />
            </div>
                
            </div>
        </div>
    )
}


export default Dashboard;
