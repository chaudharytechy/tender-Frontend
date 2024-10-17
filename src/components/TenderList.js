import React from 'react';

const TenderList = ({ tenders }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">All Tenders</h2>
      {tenders.length === 0 ? (
        <p className="text-gray-300">No tenders created yet.</p>
      ) : (
        <div className="space-y-6">
          {tenders.map(tender => (
            <div key={tender.id} className="bg-gray-100 bg-opacity-90 p-5 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-indigo-600 mb-2">{tender.name}</h3>
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
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-semibold">Number of Quotations:</span> {tender.quotations.length}
                </p>
                {tender.quotations.length > 0 && (
                  <p>
                    <span className="font-semibold">Lowest Quote:</span> $
                    {Math.min(...tender.quotations.map(q => q.amount))}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TenderList;
