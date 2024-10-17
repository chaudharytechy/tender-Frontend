import React, { useEffect, useState } from 'react';

const BidsManagement = ({ tenders }) => {
  const [allBids, setAllBids] = useState([]);

  useEffect(() => {
    // Aggregate all bids from all tenders
    const bids = tenders.flatMap(tender =>
      tender.quotations.map(quote => ({
        tenderName: tender.name,
        companyName: quote.userName,
        bidTime: new Date(quote.submittedAt),
        bidCost: quote.amount,
        tenderEndTime: new Date(tender.endTime),
      }))
    );

    // Sort bids in ascending order of bid cost
    bids.sort((a, b) => a.bidCost - b.bidCost);

    setAllBids(bids);
  }, [tenders]);

  // Function to check if bid was placed in last 5 minutes before tender end time
  const isLastFiveMinutes = (bidTime, tenderEndTime) => {
    const difference = tenderEndTime - bidTime; // in milliseconds
    return difference <= 5 * 60 * 1000 && difference >= 0;
  };

  return (
    <div className="max-w-6xl mx-auto bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-indigo-600 mb-6">Bids Management</h2>
      {allBids.length === 0 ? (
        <p className="text-gray-700">No bids placed yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-700 uppercase tracking-wider">
                  Tender Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-700 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-700 uppercase tracking-wider">
                  Bid Time
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-700 uppercase tracking-wider">
                  Bid Cost ($)
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm leading-4 text-gray-700 uppercase tracking-wider">
                  Last 5 Minutes?
                </th>
              </tr>
            </thead>
            <tbody>
              {allBids.map((bid, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    {bid.tenderName}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    {bid.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    {bid.bidTime.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                    {bid.bidCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-center">
                    {isLastFiveMinutes(bid.bidTime, bid.tenderEndTime) ? (
                      <span className="text-red-600 font-semibold">⚠️ Yes</span>
                    ) : (
                      <span className="text-green-600">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BidsManagement;
