import React from 'react';

const PricingPlans = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Basic Plan</h3>
          <p className="text-gray-600 mb-4">Perfect for individuals and small projects.</p>
          <p className="text-2xl font-bold mb-4">$9.99/month</p>
          <button className="bg-purple-500 text-white py-2 px-4 rounded">Select Plan</button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Pro Plan</h3>
          <p className="text-gray-600 mb-4">Ideal for professionals and teams.</p>
          <p className="text-2xl font-bold mb-4">$19.99/month</p>
          <button className="bg-purple-500 text-white py-2 px-4 rounded">Select Plan</button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Business Plan</h3>
          <p className="text-gray-600 mb-4">Best for larger organizations.</p>
          <p className="text-2xl font-bold mb-4">$29.99/month</p>
          <button className="bg-purple-500 text-white py-2 px-4 rounded">Select Plan</button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
