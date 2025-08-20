import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Download } from 'lucide-react';
import { paymentHistoryApi } from '../../services/paymentApi';
import { formatCurrency, formatDate } from '../../utils/validation';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { PaymentTransaction } from '../../types/payment';

export const PaymentHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    role: 'freelancer',
    date_from: '',
    date_to: '',
    status: '',
    search: ''
  });

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = filters.role === 'sponsor' 
        ? await paymentHistoryApi.getSponsorHistory(filters)
        : await paymentHistoryApi.getFreelancerHistory(filters);
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h1 className="text-2xl font-bold text-[#222]">Payment History</h1>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>

          <Select
            options={statusOptions}
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          />

          <Input
            type="date"
            value={filters.date_from}
            onChange={(e) => setFilters({ ...filters, date_from: e.target.value })}
            placeholder="From date"
          />

          <Input
            type="date"
            value={filters.date_to}
            onChange={(e) => setFilters({ ...filters, date_to: e.target.value })}
            placeholder="To date"
          />

          <Button
            onClick={fetchTransactions}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Apply</span>
          </Button>
        </div>
      </Card>

      {/* Transactions List */}
      <Card>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FDB813] border-t-transparent"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-[#222]">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-medium text-[#222]">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-[#222]">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-[#222]">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#222]">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-[#222]">Method</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-[#F5F5F5]">
                    <td className="py-3 px-4 text-sm font-mono text-[#222]">
                      {transaction.id.slice(0, 8)}...
                    </td>
                    <td className="py-3 px-4 text-sm text-[#222]">
                      {transaction.description}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-[#222]">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-[#222]">
                      {formatDate(transaction.created_at)}
                    </td>
                    <td className="py-3 px-4 text-sm text-[#222]">
                      {transaction.payment_method}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};