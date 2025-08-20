import axios from 'axios';
import type { 
  PaymentMethod, 
  BankAccount, 
  CardDetails, 
  Invoice, 
  EscrowTransaction, 
  PaymentTransaction, 
  FinancialAnalytics,
  ProcessPaymentData 
} from '../types/payment';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.lancerscape.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

// Payment Methods API
export const paymentMethodsApi = {
  getAll: () => api.get<PaymentMethod[]>('/payment-methods'),
  
  addBank: (bankData: BankAccount) => 
    api.post('/payment-methods/bank', {
      data: {
        type: "bank_account",
        attributes: bankData
      }
    }),
  
  addCard: (cardData: CardDetails) => 
    api.post('/payment-methods/card', {
      data: {
        type: "card",
        attributes: cardData
      }
    }),
  
  verify: (id: string, verificationData: any) => 
    api.post(`/payment-methods/verify/${id}`, verificationData),
  
  remove: (id: string) => api.delete(`/payment-methods/${id}`),
};

// Payment History API
export const paymentHistoryApi = {
  getSponsorHistory: (params: {
    role?: string;
    date_from?: string;
    date_to?: string;
    status?: string;
    search?: string;
  }) => api.get('/shopping_cart/customer_appointments/customer_orders', { params }),
  
  getFreelancerHistory: (params: {
    role?: string;
    date_from?: string;
    date_to?: string;
    status?: string;
    search?: string;
  }) => api.get('/payments/history', { params }),
};

// Payment Processing API
export const paymentApi = {
  process: (paymentData: ProcessPaymentData) => 
    api.post('/payments/process', paymentData),
};

// Invoices API
export const invoicesApi = {
  create: (invoiceData: Partial<Invoice>) => 
    api.post('/invoices/create', invoiceData),
  
  getAll: (params?: { status?: string; search?: string }) => 
    api.get<Invoice[]>('/invoices', { params }),
  
  update: (id: string, invoiceData: Partial<Invoice>) => 
    api.put(`/invoices/${id}`, invoiceData),
  
  getById: (id: string) => api.get<Invoice>(`/invoices/${id}`),
};

// Escrow API
export const escrowApi = {
  create: (escrowData: {
    project_id: string;
    amount: number;
    currency?: string;
  }) => api.post('/escrow/create', escrowData),
  
  release: (id: string, releaseData: { recipient_id: string }) => 
    api.post(`/escrow/${id}/release`, releaseData),
  
  getTransactions: () => api.get<EscrowTransaction[]>('/escrow/transactions'),
};

// Analytics API
export const analyticsApi = {
  getEarnings: (params: {
    date_from?: string;
    date_to?: string;
    project_id?: string;
  }) => api.get<FinancialAnalytics>('/analytics/earnings', { params }),
  
  getExpenses: (params: {
    date_from?: string;
    date_to?: string;
    project_id?: string;
  }) => api.get('/analytics/expenses', { params }),
};