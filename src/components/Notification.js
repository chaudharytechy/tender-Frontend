import React from 'react';

const Notification = ({ messages, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-indigo-600 text-white p-4 rounded shadow-lg z-50">
      <div className="flex justify-between items-center">
        <span className="font-semibold">New Tenders Added:</span>
        <button onClick={onClose} className="text-xl">&times;</button>
      </div>
      <ul className="mt-2 list-disc list-inside">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
