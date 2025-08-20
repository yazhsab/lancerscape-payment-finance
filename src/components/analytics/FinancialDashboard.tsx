import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Clock, CheckCircle, Calendar } from 'lucide-react';
import { analyticsApi } from '../../services/paymentApi';
import { formatCurrency, formatDate } from '../../utils/validation';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import type { FinancialAnalytics } from '../../types/payment';

export const FinancialDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<FinancialAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const periodOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' }
  ];

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await analyticsApi.getEarnings({
        date_from: dateRange.start,
        date_to: dateRange.end
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const handlePeriodChange = (days: string) => {
    const end = new Date();
    const start = new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000);
    setDateRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FDB813] border-t-transparent"></div>
      </div>
    );
  }

  const stats = analytics ? [
    {
      title: 'Total Earnings',
      value: formatCurrency(analytics.total_earnings),
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'This Month',
      value: formatCurrency(analytics.this_month),
      icon: TrendingUp,
      color: 'bg-[#FDB813] bg-opacity-20 text-[#FDB813]'
    },
    {
      title: 'Pending Payments',
      value: formatCurrency(analytics.pending_payments),
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Completed Projects',
      value: analytics.completed_projects.toString(),
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-600'
    }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-[#222]">Financial Dashboard</h1>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <Calendar className="h-5 w-5 text-gray-400" />
          <Select
            options={periodOptions}
            onChange={(e) => handlePeriodChange(e.target.value)}
            className="min-w-[150px]"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-[#222] mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Earnings Chart */}
      <Card>
        <h2 className="text-lg font-semibold text-[#222] mb-4">Earnings Overview</h2>
        <div className="h-64 flex items-center justify-center bg-[#F5F5F5] rounded-lg">
          <p className="text-gray-500">Chart visualization would be implemented here</p>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <h2 className="text-lg font-semibold text-[#222] mb-4">Recent Transactions</h2>
        {analytics?.recent && analytics.recent.length > 0 ? (
          <div className="space-y-3">
            {analytics.recent.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg">
                <div>
                  <p className="font-medium text-[#222]">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{formatDate(transaction.created_at)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#222]">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </p>
                  <p className={`text-sm ${
                    transaction.status === 'completed' ? 'text-green-600' :
                    transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No recent transactions</p>
        )}
      </Card>
    </div>
  );
};