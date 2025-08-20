import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { invoicesApi } from '../../services/paymentApi';
import { invoiceValidation, formatCurrency } from '../../utils/validation';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { Invoice, InvoiceItem } from '../../types/payment';

interface CreateInvoiceProps {
  onSuccess: () => void;
}

export const CreateInvoice: React.FC<CreateInvoiceProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<Invoice>({
    defaultValues: {
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const watchedItems = watch('items');
  const subtotal = watchedItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const gstAmount = subtotal * 0.18; // 18% GST
  const totalAmount = subtotal + gstAmount;

  const onSubmit = async (data: Invoice) => {
    setLoading(true);
    try {
      const invoiceData = {
        ...data,
        amount: subtotal,
        gst_amount: gstAmount,
        tax_amount: gstAmount,
        total_amount: totalAmount,
        currency: 'INR',
        invoice_number: `INV-${Date.now()}`,
        status: 'draft' as const
      };
      
      await invoicesApi.create(invoiceData);
      toast.success('Invoice created successfully!');
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    append({ description: '', quantity: 1, rate: 0, amount: 0 });
  };

  const calculateItemAmount = (index: number) => {
    const item = watchedItems[index];
    return item ? item.quantity * item.rate : 0;
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-[#222] mb-6">Create Invoice</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Client Information */}
        <div>
          <h3 className="text-lg font-medium text-[#222] mb-4">Client Information</h3>
          <Input
            label="Client Name"
            {...register('client_name', invoiceValidation.client_name)}
            error={errors.client_name?.message}
            required
          />
        </div>

        {/* Invoice Details */}
        <div>
          <h3 className="text-lg font-medium text-[#222] mb-4">Invoice Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="date"
              {...register('due_date', invoiceValidation.due_date)}
              error={errors.due_date?.message}
              required
            />
          </div>
        </div>

        {/* Invoice Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-[#222]">Invoice Items</h3>
            <Button type="button" onClick={addItem} size="sm" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                  <div className="md:col-span-2">
                    <Input
                      label="Description"
                      {...register(`items.${index}.description`, {
                        required: 'Description is required'
                      })}
                      error={errors.items?.[index]?.description?.message}
                      placeholder="Project work, consultation, etc."
                      required
                    />
                  </div>

                  <Input
                    label="Quantity"
                    type="number"
                    {...register(`items.${index}.quantity`, {
                      required: 'Quantity is required',
                      min: { value: 1, message: 'Minimum quantity is 1' }
                    })}
                    error={errors.items?.[index]?.quantity?.message}
                    min="1"
                    required
                  />

                  <Input
                    label="Rate (₹)"
                    type="number"
                    {...register(`items.${index}.rate`, {
                      required: 'Rate is required',
                      min: { value: 0.01, message: 'Rate must be greater than 0' }
                    })}
                    error={errors.items?.[index]?.rate?.message}
                    min="0.01"
                    step="0.01"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-[#222] mb-2">Amount</label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm">
                      {formatCurrency(calculateItemAmount(index))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-[#F5F5F5] rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-[#222]">Subtotal:</span>
              <span className="font-medium text-[#222]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#222]">GST (18%):</span>
              <span className="font-medium text-[#222]">{formatCurrency(gstAmount)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
              <span className="text-[#222]">Total:</span>
              <span className="text-[#222]">{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            Create Invoice
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess()}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};