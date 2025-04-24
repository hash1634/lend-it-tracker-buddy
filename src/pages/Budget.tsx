
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, WalletIcon } from 'lucide-react';

interface Expense {
  id: number;
  description: string;
  amount: number;
}

const Budget = () => {
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newAmount, setNewAmount] = useState<string>('');

  const addMoney = () => {
    if (newAmount) {
      setTotalMoney(prev => prev + Number(newAmount));
      setNewAmount('');
    }
  };

  const addExpense = (description: string, amount: number) => {
    setExpenses(prev => [...prev, {
      id: Date.now(),
      description,
      amount
    }]);
  };

  const remainingMoney = totalMoney - expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Budget Tracker</h1>
        <p className="text-gray-600">Track your available money and expenses</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-4 text-center bg-green-50">
          <p className="text-sm text-gray-600 mb-1">Total Money</p>
          <p className="text-2xl font-bold text-green-600">${totalMoney.toFixed(2)}</p>
        </Card>
        <Card className="p-4 text-center bg-blue-50">
          <p className="text-sm text-gray-600 mb-1">Remaining</p>
          <p className="text-2xl font-bold text-blue-600">${remainingMoney.toFixed(2)}</p>
        </Card>
      </div>

      <div className="flex gap-4 mb-8">
        <Input
          type="number"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          placeholder="Enter amount"
          className="flex-1"
        />
        <Button onClick={addMoney} className="gap-2">
          <WalletIcon className="w-4 h-4" />
          Add Money
        </Button>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Expenses</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                addExpense(
                  formData.get('description') as string,
                  Number(formData.get('amount'))
                );
                form.reset();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter expense description"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                />
              </div>
              <Button type="submit" className="w-full">Add Expense</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {expenses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No expenses yet. Add your first one!
          </div>
        ) : (
          expenses.map(expense => (
            <Card key={expense.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{expense.description}</h3>
                </div>
                <p className="font-semibold text-red-600">
                  -${expense.amount.toFixed(2)}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Budget;
