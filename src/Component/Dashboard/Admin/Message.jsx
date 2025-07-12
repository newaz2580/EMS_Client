import React from 'react';

const Message = ({message}) => {
    return (
        <div>
            <h2>{message.email}</h2>
            <p>{message.message}</p>
            <span>{message.created_at}</span>
        </div>
    );
};

export default Message;