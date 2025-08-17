import React from 'react';

const Message = ({message}) => {
    return (
        <div className="bg-white dark:bg-gray-950 shadow-md rounded-xl p-4 mb-4 mt-3 border border-gray-200">
  <h2 className="text-lg font-semibold text-black dark:text-white poppins-regular">{message.email}</h2>
  <p className="text-black dark:text-white my-2 inter">{message.message}</p>
  <span className="text-sm text-black dark:text-white inter">
    {new Date(message.created_at).toLocaleString()}
  </span>
</div>

    );
};

export default Message;