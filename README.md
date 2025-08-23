# LancerScape - Payment & Financial Management

A comprehensive payment and financial management micro frontend module designed specifically for Indian freelancers. Built with React, TypeScript, and Tailwind CSS with real API integration.

## 🚀 Features

### 💳 Payment Management
- **Secure Payment Methods**: Add and manage bank accounts and cards
- **Indian Banking Support**: IFSC code validation and Indian bank integration
- **Payment Verification**: Micro-deposit and instant verification methods
- **Default Payment Methods**: Set preferred payment methods for quick transactions

### 📊 Financial Analytics
- **Earnings Dashboard**: Real-time earnings tracking and visualization
- **Monthly Reports**: Detailed monthly financial summaries
- **Pending Payments**: Track outstanding payments and invoices
- **Project Analytics**: Per-project financial breakdown
- **Interactive Charts**: Visual representation of financial data

### 🧾 Invoice Management
- **Professional Invoices**: Generate GST-compliant invoices
- **Itemized Billing**: Add multiple items with quantities and rates
- **Automatic Calculations**: GST (18%) and total calculations
- **Invoice Status Tracking**: Draft, sent, paid, and overdue statuses
- **Client Management**: Store and manage client information

### 🔒 Escrow System
- **Secure Transactions**: Hold payments until project completion
- **Milestone Payments**: Release payments based on project milestones
- **Dispute Resolution**: Handle payment disputes securely
- **Transaction History**: Complete audit trail of escrow transactions

### 📈 Transaction History
- **Comprehensive History**: View all payment transactions
- **Advanced Filtering**: Filter by date, status, amount, and description
- **Export Functionality**: Download transaction reports
- **Search Capability**: Quick search through transaction history
- **Role-based Views**: Different views for sponsors and freelancers

### 🏦 Banking Features
- **Multi-currency Support**: Handle multiple currencies (INR focus)
- **Bank Account Verification**: Secure account verification process
- **IFSC Validation**: Real-time IFSC code validation
- **Account Types**: Support for savings and current accounts

### 🛡️ Security & Compliance
- **PCI Compliance**: Secure handling of payment card data
- **Data Encryption**: All sensitive data encrypted in transit
- **Audit Trail**: Complete transaction logging
- **GST Compliance**: Indian tax regulation compliance
- **Secure Authentication**: Token-based authentication system

### 📱 User Experience
- **Responsive Design**: Optimized for mobile and desktop
- **Indian Market Focus**: Designed for Indian freelancer workflows
- **Real-time Updates**: Live status updates and notifications
- **Intuitive Interface**: Clean, professional design
- **Accessibility**: WCAG compliant interface

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

## 📋 Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/lancerscape-payment-module.git
cd lancerscape-payment-module
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.development` file in the root directory:
```env
VITE_API_URL=/api
```

For production, create a `.env.production` file:
```env
VITE_API_URL=https://api.lancerscape.com
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

## 🔧 Configuration

### API Configuration
The application uses a proxy configuration in `vite.config.ts` to handle API requests during development:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://api.lancerscape.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

### Environment Variables
- `VITE_API_URL`: Base URL for API requests
- Additional environment variables can be added as needed

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── analytics/       # Financial analytics components
│   ├── invoices/        # Invoice management components
│   ├── payments/        # Payment-related components
│   └── ui/              # Reusable UI components
├── services/            # API service layer
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and validation
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🔌 API Integration

### Authentication
All API requests include authentication headers:
```typescript
headers: {
  'Content-Type': 'application/json',
  'token': localStorage.getItem('auth_token')
}
```

### Key Endpoints
- **Payment Methods**: `/payment-methods`
- **Payment History**: `/payments/history`
- **Invoice Management**: `/invoices`
- **Escrow Transactions**: `/escrow`
- **Financial Analytics**: `/analytics/earnings`

## 🎨 Design System

### Color Palette
- **Background**: White (#FFFFFF)
- **Primary Text**: Charcoal Black (#222222)
- **Primary Actions**: Bee Yellow (#FDB813)
- **Secondary Sections**: Light Gray (#F5F5F5)
- **Accent Elements**: Honey Orange (#FF9800)

### Typography
- **Font Family**: System fonts (Inter, Segoe UI, Roboto)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Line Heights**: 150% for body text, 120% for headings

### Components
- **Cards**: Rounded corners (8px), subtle shadows
- **Buttons**: Rounded (6px), hover states, loading indicators
- **Forms**: Consistent spacing, validation states
- **Tables**: Zebra striping, hover effects

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Test Coverage
```bash
npm run test:coverage
```

## 📦 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Vercel Deployment
1. Connect your repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@lancerscape.com
- Documentation: [docs.lancerscape.com](https://docs.lancerscape.com)

## 🔄 Changelog

### Version 1.0.0
- Initial release with core payment management features
- Invoice generation and management
- Financial analytics dashboard
- Escrow system implementation
- Indian banking integration

## 🚧 Roadmap

- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Mobile app integration
- [ ] Advanced escrow features
- [ ] Tax document automation
- [ ] Integration with accounting software

---

**LancerScape** - Empowering Indian freelancers with professional financial management tools.