import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { paymentMethodsApi } from '../../services/paymentApi';
import { cardValidation } from '../../utils/validation';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { CardDetails } from '../../types/payment';

interface AddCardFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddCardForm: React.FC<AddCardFormProps> = ({
  onSuccess,
  onCancel
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CardDetails>();

  const onSubmit = async (data: CardDetails) => {
    setLoading(true);
    try {
      await paymentMethodsApi.addCard(data);
      toast.success('Card added successfully!');
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-[#222] mb-6">Add Card</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Cardholder Name"
          {...register('cardholder_name', { required: 'Cardholder name is required' })}
          error={errors.cardholder_name?.message}
          placeholder="As shown on card"
          required
        />

        <Input
          label="Card Number"
          {...register('card_number', cardValidation.card_number)}
          error={errors.card_number?.message}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />

        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Month"
            {...register('expiry_month', cardValidation.expiry_month)}
            error={errors.expiry_month?.message}
            placeholder="MM"
            maxLength={2}
            required
          />

          <Input
            label="Year"
            {...register('expiry_year', cardValidation.expiry_year)}
            error={errors.expiry_year?.message}
            placeholder="YYYY"
            maxLength={4}
            required
          />

          <Input
            label="CVV"
            {...register('cvv', cardValidation.cvv)}
            error={errors.cvv?.message}
            placeholder="123"
            maxLength={4}
            type="password"
            required
          />
        </div>

        <h3 className="text-lg font-medium text-[#222] mt-6 mb-4">Billing Address</h3>

        <Input
          label="Street Address"
          {...register('billing_address.street', { required: 'Street address is required' })}
          error={errors.billing_address?.street?.message}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            {...register('billing_address.city', { required: 'City is required' })}
            error={errors.billing_address?.city?.message}
            required
          />

          <Input
            label="State"
            {...register('billing_address.state', { required: 'State is required' })}
            error={errors.billing_address?.state?.message}
            required
          />

          <Input
            label="Postal Code"
            {...register('billing_address.postal_code', { required: 'Postal code is required' })}
            error={errors.billing_address?.postal_code?.message}
            required
          />

          <Input
            label="Country"
            {...register('billing_address.country')}
            defaultValue="India"
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            Add Card
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};