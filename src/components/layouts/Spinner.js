import React from 'react'
import spinner from './spinner.gif';

const  Spinner = ()  => {
    return (
        <div>
            <img alt="loading...." src={spinner} style={{width: '50px', margin: 'auto', marginTop: '120px', display: 'block'}} />
        </div>
    )
}

export default Spinner;

