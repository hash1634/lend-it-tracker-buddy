
import React, { useState } from 'react';
import { TransactionCard } from '@/components/TransactionCard';
import { AddTransactionDialog } from '@/components/AddTransactionDialog';
import { Card } from '@/components/ui/card';

interface Transaction {
  id: number;
  type: 'lend' | 'borrow';
  amount: number;
  person: string;
  date: Date;
  note?: string;
}

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = (data: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [
      { ...data, id: Date.now() },
      ...prev
    ]);
  };

  const totalLent = transactions
    .filter(t => t.type === 'lend')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBorrowed = transactions
    .filter(t => t.type === 'borrow')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Money Tracker</h1>
        <p className="text-gray-600">Keep track of your lending and borrowing</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-4 text-center bg-green-50">
          <p className="text-sm text-gray-600 mb-1">Total Lent</p>
          <p className="text-2xl font-bold text-green-600">${totalLent.toFixed(2)}</p>
        </Card>
        <Card className="p-4 text-center bg-red-50">
          <p className="text-sm text-gray-600 mb-1">Total Borrowed</p>
          <p className="text-2xl font-bold text-red-600">${totalBorrowed.toFixed(2)}</p>
        </Card>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <AddTransactionDialog onAddTransaction={handleAddTransaction} />
      </div>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No transactions yet. Add your first one!
          </div>
        ) : (
          transactions.map(transaction => (
            <TransactionCard key={transaction.id} {...transaction} />
          ))
        )}
      </div>
    </div>
  );
};

export default Index;
