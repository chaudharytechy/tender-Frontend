import React from 'react';
import QuotationForm from './QuotationForm';

const AvailableTenders = ({ tenders, addQuotation }) => {
  const now = new Date();

  // Filter active tenders (endTime not passed)
  const activeTenders = tenders.filter(tender => new Date(tender.endTime) > now);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white text-center mb-6">Available Tenders</h2>
      {activeTenders.length === 0 ? (
        <p className="text-center text-indigo-200">No active tenders available at the moment.</p>
      ) : (
        <div className="space-y-6">
          {activeTenders.map(tender => (
            <div key={tender.id} className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-indigo-600 mb-2">{tender.name}</h3>
              <p className="text-gray-700 mb-4">{tender.description}</p>
              <div className="text-sm text-gray-600 mb-4">
                <p>
                  <span className="font-semibold">Start:</span>{' '}
                  {new Date(tender.startTime).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">End:</span>{' '}
                  {new Date(tender.endTime).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Buffer Time:</span> {tender.bufferTime} minutes
                </p>
              </div>
              {/* <div className="mb-4">
                <p className="font-semibold text-gray-800">Lowest Quote:</p>
                {tender.quotations.length === 0 ? (
                  <p className="text-gray-600">No quotations submitted yet.</p>
                ) : (
                  <p className="text-green-600 font-semibold">
                    ${Math.min(...tender.quotations.map(q => q.amount))}
                  </p>
                )}
              </div> */}
              <QuotationForm tenderId={tender.id} addQuotation={addQuotation} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTenders;
