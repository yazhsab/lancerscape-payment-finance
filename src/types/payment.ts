export interface PaymentMethod {
  id: string;
  type: 'bank' | 'card';
  account_holder_name?: string;
  last4?: string;
  bank_name?: string;
  card_brand?: string;
  is_default: boolean;
  verified: boolean;
  created_at: string;
}

export interface BankAccount {
  account_holder_name: string;
  account_number: string;
  routing_number: string;
  account_type: 'checking' | 'savings';
  bank_name: string;
  bank_address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  verification_method: 'micro' | 'instant';
}

export interface CardDetails {
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  cardholder_name: string;
  billing_address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  amount: number;
  tax_amount: number;
  gst_amount?: number;
  total_amount: number;
  due_date: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  items: InvoiceItem[];
  created_at: string;
  currency: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface EscrowTransaction {
  id: string;
  project_id: string;
  amount: number;
  status: 'pending' | 'held' | 'released' | 'disputed';
  created_by: string;
  released_to?: string;
  created_at: string;
  released_at?: string;
  currency: string;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  payment_method: string;
  description: string;
  created_at: string;
  project_id?: string;
  invoice_id?: string;
}

export interface FinancialAnalytics {
  total_earnings: number;
  this_month: number;
  pending_payments: number;
  completed_projects: number;
  chart_data: Array<{
    date: string;
    earnings: number;
    expenses: number;
  }>;
  recent: PaymentTransaction[];
}

export interface ProcessPaymentData {
  data: {
    type: "payment";
    attributes: {
      amount: number;
      payment_method_id: string;
      project_id: string;
      milestone_id?: string;
      description: string;
    };
  };
}