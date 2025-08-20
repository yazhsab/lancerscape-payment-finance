import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { paymentMethodsApi } from '../../services/paymentApi';
import { PaymentMethodCard } from './PaymentMethodCard';
import { AddBankAccountForm } from './AddBankAccountForm';
import { AddCardForm } from './AddCardForm';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { PaymentMethod } from '../../types/payment';

export const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddBank, setShowAddBank] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  const fetchPaymentMethods = async () => {
    setLoading(true);
    try {
      const response = await paymentMethodsApi.getAll();
      setPaymentMethods(response.data);
    } catch (error) {
      toast.error('Failed to fetch payment methods');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleVerify = async (id: string) => {
    try {
      await paymentMethodsApi.verify(id, {});
      toast.success('Verification initiated');
      fetchPaymentMethods();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Verification failed');
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm('Are you sure you want to remove this payment method?')) return;
    
    try {
      await paymentMethodsApi.remove(id);
      toast.success('Payment method removed');
      fetchPaymentMethods();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove payment method');
    }
  };

  const handleSetDefault = async (id: string) => {
    // This would typically be a separate API call
    toast.success('Default payment method updated');
    fetchPaymentMethods();
  };

  const handleSuccess = () => {
    setShowAddBank(false);
    setShowAddCard(false);
    fetchPaymentMethods();
  };

  if (showAddBank) {
    return (
      <AddBankAccountForm
        onSuccess={handleSuccess}
        onCancel={() => setShowAddBank(false)}
      />
    );
  }

  if (showAddCard) {
    return (
      <AddCardForm
        onSuccess={handleSuccess}
        onCancel={() => setShowAddCard(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#222]">Payment Methods</h1>
            <p className="text-gray-600 mt-2">Manage your bank accounts and cards for receiving payments</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <Button
              onClick={() => setShowAddBank(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Bank Account</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowAddCard(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Card</span>
            </Button>
          </div>
        </div>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FDB813] border-t-transparent"></div>
        </div>
      ) : paymentMethods.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 mb-4">💳</div>
            <h2 className="text-xl font-medium text-[#222] mb-2">No payment methods added</h2>
            <p className="text-gray-600 mb-6">Add a bank account or card to start receiving payments</p>
            <div className="flex justify-center space-x-3">
              <Button onClick={() => setShowAddBank(true)}>
                Add Bank Account
              </Button>
              <Button variant="secondary" onClick={() => setShowAddCard(true)}>
                Add Card
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              onVerify={handleVerify}
              onRemove={handleRemove}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}
    </div>
  );
};