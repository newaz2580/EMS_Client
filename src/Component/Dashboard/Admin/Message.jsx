import React from 'react';

const Message = ({message}) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 mb-4 border border-gray-200">
  <h2 className="text-lg font-semibold text-gray-800">{message.email}</h2>
  <p className="text-gray-600 my-2">{message.message}</p>
  <span className="text-sm text-gray-400">
    {new Date(message.created_at).toLocaleString()}
  </span>
</div>

    );
};

export default Message;