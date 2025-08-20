import React from 'react';
import { CreditCard, Building2, CheckCircle, Clock, Trash2 } from 'lucide-react';
import type { PaymentMethod } from '../../types/payment';
import { Button } from '../ui/Button';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onVerify: (id: string) => void;
  onRemove: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  method,
  onVerify,
  onRemove,
  onSetDefault
}) => {
  const getIcon = () => {
    return method.type === 'card' ? (
      <CreditCard className="h-6 w-6 text-[#FF9800]" />
    ) : (
      <Building2 className="h-6 w-6 text-[#FF9800]" />
    );
  };

  const getStatusBadge = () => {
    if (method.verified) {
      return (
        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
          <CheckCircle className="h-3 w-3" />
          <span>Verified</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
        <Clock className="h-3 w-3" />
        <span>Pending</span>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1">
            <h3 className="font-medium text-[#222]">
              {method.type === 'card' ? 
                `${method.card_brand} •••• ${method.last4}` : 
                method.bank_name
              }
            </h3>
            <p className="text-sm text-gray-600">
              {method.account_holder_name}
            </p>
            {method.is_default && (
              <span className="inline-block px-2 py-1 bg-[#FDB813] text-white text-xs rounded mt-2">
                Default
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge()}
          <button
            onClick={() => onRemove(method.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Remove payment method"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        {!method.verified && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onVerify(method.id)}
          >
            Verify
          </Button>
        )}
        {!method.is_default && method.verified && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSetDefault(method.id)}
          >
            Set as Default
          </Button>
        )}
      </div>
    </div>
  );
};