import React, { useState } from 'react';

const TenderForm = ({ addTender }) => {
  const [tender, setTender] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    bufferTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTender(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(tender.startTime) >= new Date(tender.endTime)) {
      alert('Start time must be before end time.');
      return;
    }
    addTender(tender);
    setTender({
      name: '',
      description: '',
      startTime: '',
      endTime: '',
      bufferTime: '',
    });
    alert('Tender created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg transition transform hover:scale-105">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Create New Tender</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Tender Name</label>
        <input
          type="text"
          name="name"
          value={tender.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter tender name"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Tender Description</label>
        <textarea
          name="description"
          value={tender.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter tender description"
          required
        />
      </div>
      
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={tender.startTime}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">End Time</label>
          <input
            type="datetime-local"
            name="endTime"
            value={tender.endTime}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Buffer Time (in minutes)</label>
        <input
          type="number"
          name="bufferTime"
          value={tender.bufferTime}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="e.g., 15"
          required
          min="0"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition duration-300"
      >
        Create Tender
      </button>
    </form>
  );
};

export default TenderForm;
