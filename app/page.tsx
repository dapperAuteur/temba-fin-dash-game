'use client'
import React from 'react';
import TransactionForm from './(components)/TransactionForm';
import TransactionList from './(components)/TransactionList';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Dashboard</h1>
      <TransactionForm />
      <TransactionList />
    </div>
  );
}