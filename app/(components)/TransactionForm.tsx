import React, { useState } from 'react';

interface TransactionFormData {
  date: string;
  amount: number;
  category: string; // Will become a dropdown later
  description: string;
  vendor: string;  //Will be it's own model
  account: string; //Will be its own model
  tags: string; //will be its own model
}

interface Props {
  onAddTransaction: (transaction: TransactionFormData) => void;
}

const TransactionForm: React.FC<Props> = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    date: new Date().toISOString().split('T')[0], // Default to today's date
    amount: 0,
    category: '',
    description: '',
    vendor: '', // add vendor field,
    account: '',
    tags: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction(formData);
    // Reset the form after submission (optional)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      category: '',
      description: '',
      vendor: '', //Clear vendor on submit
      account: '',
      tags: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount === 0 ? '' : formData.amount}
          onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        {/* This will be replaced with a dropdown later */}
      </div>
      <div className="mb-4">
        <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Vendor</label>
        <input
          type="text"
          id="vendor"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="account" className="block text-sm font-medium text-gray-700">Account</label>
        <input
          type="text"
          id="account"
          name="account"
          value={formData.account}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          rows={3}
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;