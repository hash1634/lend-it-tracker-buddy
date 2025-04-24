
import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionFormData {
  type: 'lend' | 'borrow';
  amount: string;
  person: string;
  purpose: string;
  dueDate: Date;
  note?: string;
}

interface AddTransactionDialogProps {
  onAddTransaction: (data: {
    type: 'lend' | 'borrow';
    amount: number;
    person: string;
    date: Date;
    purpose: string;
    dueDate: Date;
    note?: string;
  }) => void;
}

export const AddTransactionDialog = ({ onAddTransaction }: AddTransactionDialogProps) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<TransactionFormData>({
    defaultValues: {
      dueDate: new Date(),
    }
  });
  const dueDate = watch('dueDate');

  const onSubmit = (data: TransactionFormData) => {
    onAddTransaction({
      ...data,
      amount: parseFloat(data.amount),
      date: new Date(),
    });
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Transaction Type</Label>
            <RadioGroup defaultValue="lend" className="flex gap-4" {...register('type')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lend" id="lend" />
                <Label htmlFor="lend">Lending</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="borrow" id="borrow" />
                <Label htmlFor="borrow">Borrowing</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="person">Person</Label>
            <Input id="person" placeholder="Enter name" {...register('person', { required: true })} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input 
              id="amount" 
              type="number" 
              step="0.01" 
              min="0" 
              placeholder="0.00" 
              {...register('amount', { required: true })} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Input 
              id="purpose" 
              placeholder="What is this for?" 
              {...register('purpose', { required: true })} 
            />
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={(date) => setValue('dueDate', date as Date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea id="note" placeholder="Add a note..." {...register('note')} />
          </div>
          
          <Button type="submit" className="w-full">Add Transaction</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
