export const bankAccountValidation = {
  account_holder_name: {
    required: 'Account holder name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' }
  },
  account_number: {
    required: 'Account number is required',
    pattern: {
      value: /^\d{8,17}$/,
      message: 'Account number must be 8-17 digits'
    }
  },
  ifsc_code: {
    required: 'IFSC code is required',
    pattern: {
      value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
      message: 'Invalid IFSC code format'
    }
  },
  bank_name: {
    required: 'Bank name is required',
    minLength: { value: 2, message: 'Bank name must be at least 2 characters' }
  }
};

export const cardValidation = {
  card_number: {
    required: 'Card number is required',
    pattern: {
      value: /^\d{13,19}$/,
      message: 'Invalid card number'
    }
  },
  expiry_month: {
    required: 'Expiry month is required',
    pattern: {
      value: /^(0[1-9]|1[0-2])$/,
      message: 'Invalid month (01-12)'
    }
  },
  expiry_year: {
    required: 'Expiry year is required',
    pattern: {
      value: /^\d{4}$/,
      message: 'Invalid year format'
    }
  },
  cvv: {
    required: 'CVV is required',
    pattern: {
      value: /^\d{3,4}$/,
      message: 'CVV must be 3-4 digits'
    }
  }
};

export const invoiceValidation = {
  client_name: {
    required: 'Client name is required',
    minLength: { value: 2, message: 'Client name must be at least 2 characters' }
  },
  amount: {
    required: 'Amount is required',
    min: { value: 1, message: 'Amount must be greater than 0' }
  },
  due_date: {
    required: 'Due date is required'
  }
};

export const formatCurrency = (amount: number, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};