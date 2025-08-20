import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  CreditCard, 
  History, 
  FileText, 
  Shield, 
  BarChart3, 
  Receipt,
  Home
} from 'lucide-react';
import { PaymentMethods } from './components/payments/PaymentMethods';
import { PaymentHistory } from './components/payments/PaymentHistory';
import { CreateInvoice } from './components/invoices/CreateInvoice';
import { FinancialDashboard } from './components/analytics/FinancialDashboard';

type ActiveTab = 'dashboard' | 'methods' | 'history' | 'invoices' | 'escrow' | 'analytics';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'methods', name: 'Payment Methods', icon: CreditCard },
    { id: 'history', name: 'Transaction History', icon: History },
    { id: 'invoices', name: 'Create Invoice', icon: FileText },
    { id: 'escrow', name: 'Escrow', icon: Shield },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <FinancialDashboard />;
      case 'methods':
        return <PaymentMethods />;
      case 'history':
        return <PaymentHistory />;
      case 'invoices':
        return <CreateInvoice onSuccess={() => setActiveTab('dashboard')} />;
      case 'escrow':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
            <Shield className="h-12 w-12 text-[#FF9800] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#222] mb-2">Escrow Management</h2>
            <p className="text-gray-600">Secure project payments with escrow protection</p>
            <p className="text-sm text-gray-500 mt-4">Coming soon...</p>
          </div>
        );
      case 'analytics':
        return <FinancialDashboard />;
      default:
        return <FinancialDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FDB813',
            color: '#222',
          },
        }}
      />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-[#FDB813] p-2 rounded-lg">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#222]">LancerScape</h1>
                <p className="text-sm text-gray-600">Payment & Financial Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-[#222]">Freelancer Dashboard</p>
                <p className="text-xs text-gray-600">Manage your finances</p>
              </div>
              <div className="h-10 w-10 bg-[#FDB813] rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">FD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 mb-8 lg:mb-0">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#FDB813] bg-opacity-10 text-[#FDB813] font-medium'
                        : 'text-[#222] hover:bg-[#F5F5F5]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Stats Card */}
            <div className="mt-8 bg-gradient-to-r from-[#FDB813] to-[#FF9800] rounded-lg p-6 text-white">
              <h3 className="font-semibold mb-2">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>This Month</span>
                  <span>₹45,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending</span>
                  <span>₹12,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Projects</span>
                  <span>8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#F5F5F5] border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-[#222] font-medium">LancerScape - Payment & Financial Management</p>
              <p className="text-xs text-gray-600 mt-1">Designed for Indian freelancers</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-gray-500">
                Secure payments • PCI compliant • GST ready
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;