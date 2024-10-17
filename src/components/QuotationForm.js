import React, { useState } from 'react';

const QuotationForm = ({ tenderId, addQuotation }) => {
  const [quotation, setQuotation] = useState({
    userName: '',
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuotation(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quotation.amount <= 0) {
      alert('Quotation amount must be greater than zero.');
      return;
    }
    const newQuotation = {
      id: Date.now(),
      userName: quotation.userName,
      amount: parseFloat(quotation.amount),
      submittedAt: new Date().toISOString(),
    };
    addQuotation(tenderId, newQuotation);
    setQuotation({
      userName: '',
      amount: '',
    });
    alert('Quotation submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-gray-700 mb-1">Company Name</label>
        <input
          type="text"
          name="userName"
          value={quotation.userName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter Company name"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Bidding amount ($)</label>
        <input
          type="number"
          name="amount"
          value={quotation.amount}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Bidding Amount"
          required
          min="1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
      >
        Submit Quotation
      </button>
    </form>
  );
};

export default QuotationForm;
