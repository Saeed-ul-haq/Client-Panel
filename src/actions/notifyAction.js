import {NOTIFY_USER} from './types'

import React from 'react';

const  notifyAction = (message,messageType) => {
    return {
        type: NOTIFY_USER,
        message,
        messageType
    };

};

export default notifyAction;
