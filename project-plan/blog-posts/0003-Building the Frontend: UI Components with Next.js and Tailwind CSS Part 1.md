Blog Post #4: Building the Frontend: UI Components with Next.js and Tailwind CSS (Part 1)

Introduction:

In the previous posts, we set up our project, designed our Dgraph schema, and explored the automatically generated GraphQL API. Now, it's time to start building the user interface for our personal finance dashboard. In this post, we'll create the core components for entering and displaying transactions using Next.js, React, and Tailwind CSS. We'll focus on the UI and basic functionality; we'll connect to Dgraph in the next post.

1. Project Structure (Review):

Before we start coding, let's quickly review the project structure we established in the first post:

```
temba-fin-dash-game/
├── app/              # Next.js pages (routes)
│   ├── globals.css      # Global styles
│   └── page.tsx        # Main dashboard page
├── components/       # Reusable React components
│   ├── TransactionForm.tsx
│   └── TransactionList.tsx
├── lib/              # Utility functions and shared code
├── project-plan/     # Project planning documents
├── public/           # Static assets (images, etc.)
├── styles/           # (Optional) Additional CSS files
├── docker-compose.yml  # Docker Compose configuration
├── next.config.js   # Next.js configuration
├── package.json      # Project dependencies
├── schema.graphql    # Dgraph schema
└── tsconfig.json     # TypeScript configuration
```

We'll be primarily working within the app and components directories.

2. Building the TransactionForm Component:

The TransactionForm component will allow users to manually enter transaction details. Create a new file components/TransactionForm.tsx:
```
TypeScript

// components/TransactionForm.tsx
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
```
Key Code Explanation:

TransactionFormData Interface: Defines the shape of the data for a transaction. This provides type safety.
Props Interface: Defines the props that the TransactionForm component accepts. We have a single prop, onAddTransaction, which is a function that will be called when the form is submitted.
useState Hook: Manages the form data using React's useState hook. The form is initialized with default values (today's date, empty strings, and 0 for the amount).
handleChange Function: Updates the form data whenever an input field changes.
handleSubmit Function: Prevents the default form submission behavior, calls the onAddTransaction prop with the form data, and then resets the form.
JSX Structure: The JSX code defines the form elements (labels, inputs, text area, button) and uses Tailwind CSS classes for styling.
Type Input number: The Amount input uses type="number".
Default date: Today's date is the default.
Form Reset: The form resets on submission.
3. Building the TransactionList Component:

The TransactionList component will display the list of transactions. Create components/TransactionList.tsx:

TypeScript
```
// components/TransactionList.tsx
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
```
Key Code Explanation:

Transaction Interface: Defines the shape of a transaction object. This should match the TransactionFormData interface (plus an id).
Props Interface: Defines the transactions prop, which is an array of Transaction objects.
Conditional Rendering: Displays a "No transactions yet" message if the transactions array is empty.
map Function: Iterates over the transactions array and renders a list item (<li>) for each transaction.
key Prop: The key={transaction.id} prop is essential when rendering lists in React. It helps React efficiently update the list when items are added, removed, or reordered.
Basic Display: Shows the date, amount, category, and description of each transaction.
4. Integrating Components into app/page.tsx:

Now, let's integrate these components into our main dashboard page (app/page.tsx):

TypeScript
```
// app/page.tsx
'use client'
import React, { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

interface Transaction {
    id: string;
    date: string;
    amount: number;
    category: string;
    description: string;
    vendor: string;
    account: string;
    tags: string;
  }

export default function Home() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const addTransaction = (newTransaction: Transaction) => {
        //For now, just generate a simple unique ID. Later, we will get the id from dgraph.
        const id = Date.now().toString();
        setTransactions([...transactions, { ...newTransaction, id }]);
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Personal Finance Dashboard</h1>
            <TransactionForm onAddTransaction={addTransaction} />
            <TransactionList transactions={transactions} />
        </div>
    );
}
```
Key Code Explanation:

useState Hook: We use useState to manage the transactions array in the Home component's state. This array will hold all the transactions.
addTransaction Function: This function is passed as a prop to TransactionForm. When the form is submitted, this function will be called with the new transaction data. It adds a unique id to the transaction and updates the transactions state.
Passing Props: We pass the addTransaction function to TransactionForm and the transactions array to TransactionList.
'use client': This makes this a client side component.
Import Statements: Make sure the imports are correct.
5. Running the App:

Make sure your Dgraph instance is running (docker-compose up -d).
Run your Next.js development server: npm run dev
Open your browser to http://localhost:3000. You should see the form and the (initially empty) transaction list. You can now add transactions, and they will be displayed in the list.
6. Blog Post Content

Introduction
Recap
TransactionForm Component
Code example
Explain Key Code
TransactionList Component
Code Example
Explain Key Code
Integration
Code Example
Explain Key Code
Run The app
Next Steps
This detailed breakdown covers creating the TransactionForm and TransactionList components, integrating them into your main page, and using local state for temporary data management. The next blog post will focus on connecting these components to Dgraph using Apollo Client, replacing the local state with persistent data storage.