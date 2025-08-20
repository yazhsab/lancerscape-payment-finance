import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { paymentMethodsApi } from '../../services/paymentApi';
import { bankAccountValidation } from '../../utils/validation';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { BankAccount } from '../../types/payment';

interface AddBankAccountFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddBankAccountForm: React.FC<AddBankAccountFormProps> = ({
  onSuccess,
  onCancel
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<BankAccount>();

  const accountTypeOptions = [
    { value: 'checking', label: 'Current Account' },
    { value: 'savings', label: 'Savings Account' }
  ];

  const verificationMethodOptions = [
    { value: 'micro', label: 'Micro Deposit Verification' },
    { value: 'instant', label: 'Instant Verification' }
  ];

  const onSubmit = async (data: BankAccount) => {
    setLoading(true);
    try {
      await paymentMethodsApi.addBank(data);
      toast.success('Bank account added successfully!');
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add bank account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-[#222] mb-6">Add Bank Account</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Account Holder Name"
          {...register('account_holder_name', bankAccountValidation.account_holder_name)}
          error={errors.account_holder_name?.message}
          placeholder="As per bank records"
          required
        />

        <Input
          label="Account Number"
          {...register('account_number', bankAccountValidation.account_number)}
          error={errors.account_number?.message}
          placeholder="12345678901234"
          required
        />

        <Input
          label="IFSC Code"
          {...register('routing_number', bankAccountValidation.ifsc_code)}
          error={errors.routing_number?.message}
          placeholder="SBIN0001234"
          required
        />

        <Select
          label="Account Type"
          {...register('account_type', { required: 'Account type is required' })}
          options={accountTypeOptions}
          error={errors.account_type?.message}
          required
        />

        <Input
          label="Bank Name"
          {...register('bank_name', bankAccountValidation.bank_name)}
          error={errors.bank_name?.message}
          placeholder="State Bank of India"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Street Address"
            {...register('bank_address.street', { required: 'Street address is required' })}
            error={errors.bank_address?.street?.message}
            required
          />

          <Input
            label="City"
            {...register('bank_address.city', { required: 'City is required' })}
            error={errors.bank_address?.city?.message}
            required
          />

          <Input
            label="State"
            {...register('bank_address.state', { required: 'State is required' })}
            error={errors.bank_address?.state?.message}
            required
          />

          <Input
            label="Postal Code"
            {...register('bank_address.postal_code', { required: 'Postal code is required' })}
            error={errors.bank_address?.postal_code?.message}
            required
          />
        </div>

        <Input
          label="Country"
          {...register('bank_address.country')}
          defaultValue="India"
          readOnly
          className="bg-gray-50"
        />

        <Select
          label="Verification Method"
          {...register('verification_method', { required: 'Verification method is required' })}
          options={verificationMethodOptions}
          error={errors.verification_method?.message}
          required
        />

        <div className="flex space-x-4 pt-4">
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            Add Bank Account
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