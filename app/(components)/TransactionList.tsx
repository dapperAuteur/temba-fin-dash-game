import React from 'react';

interface Transaction {
  id: string; // Add an ID for key prop
  date: string;
  amount: number;
  category: string;
  description: string;
  vendor: string;
  account: string;
  tags: string
}

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="border-b py-2">
              <div className="flex justify-between">
                <div>
                    <div>
                        <strong>Date:</strong> {transaction.date}
                    </div>
                    <div>
                        <strong>Vendor:</strong> {transaction.vendor}
                    </div>
                    <div>
                        <strong>Account:</strong> {transaction.account}
                    </div>
                    <div>
                        <strong>Category:</strong> {transaction.category}
                    </div>
                  <span className="font-bold">${transaction.amount.toFixed(2)}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{transaction.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;