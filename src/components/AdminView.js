import React, { useState } from 'react';
import TenderForm from './TenderForm';
import TenderList from './TenderList';
import BidsManagement from './BidsManagement';

const AdminView = ({ tenders, addTender }) => {
  const [activeTab, setActiveTab] = useState('manageTenders');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Tabs Navigation */}
      <div className="flex space-x-4 border-b-2 border-indigo-600">
        <button
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === 'manageTenders'
              ? 'text-indigo-600 border-b-4 border-indigo-600'
              : 'text-gray-500 hover:text-indigo-600'
          }`}
          onClick={() => setActiveTab('manageTenders')}
        >
          Manage Tenders
        </button>
        <button
          className={`py-2 px-4 text-lg font-semibold ${
            activeTab === 'bidsManagement'
              ? 'text-indigo-600 border-b-4 border-indigo-600'
              : 'text-gray-500 hover:text-indigo-600'
          }`}
          onClick={() => setActiveTab('bidsManagement')}
        >
          Bids Management
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'manageTenders' && (
        <>
          <TenderForm addTender={addTender} />
          <TenderList tenders={tenders} />
        </>
      )}
      {activeTab === 'bidsManagement' && <BidsManagement tenders={tenders} />}
    </div>
  );
};

export default AdminView;
