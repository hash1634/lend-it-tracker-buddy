
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { BadgeDollarSign, BadgeMinus } from 'lucide-react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface TransactionCardProps {
  type: 'lend' | 'borrow';
  amount: number;
  person: string;
  date: Date;
  note?: string;
}

export const TransactionCard = ({
  type,
  amount,
  person,
  date,
  note,
}: TransactionCardProps) => {
  return (
    <Card className={cn(
      'p-4 transition-all hover:shadow-md',
      type === 'lend' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className={cn(
            'p-2 rounded-full',
            type === 'lend' ? 'bg-green-100' : 'bg-red-100'
          )}>
            {type === 'lend' ? (
              <BadgeDollarSign className="w-5 h-5 text-green-600" />
            ) : (
              <BadgeMinus className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{person}</h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(date, { addSuffix: true })}
            </p>
          </div>
        </div>
        <p className={cn(
          'font-semibold',
          type === 'lend' ? 'text-green-600' : 'text-red-600'
        )}>
          {type === 'lend' ? '+' : '-'}${amount.toFixed(2)}
        </p>
      </div>
      {note && (
        <p className="mt-2 text-sm text-gray-600">{note}</p>
      )}
    </Card>
  );
};
