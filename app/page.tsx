'use client'
import React, { useState } from 'react';
import TransactionForm from './(components)/TransactionForm';
import TransactionList from './(components)/TransactionList';

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