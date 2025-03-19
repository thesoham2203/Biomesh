import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, ArrowDownToLine, ArrowUpFromLine, Clock, AlertCircle, ChevronDown, ExternalLink, History, CreditCard, Coins, Ban as Bank } from 'lucide-react';
import CountUp from 'react-countup';

const Wallet = () => {
  const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState<string | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 250,
      description: 'Clinical Trial Participation - Cancer Research Study',
      date: '2025-03-15 14:30',
      status: 'completed'
    },
    {
      id: 2,
      type: 'credit',
      amount: 100,
      description: 'AI Data Contribution - Health Records Analysis',
      date: '2025-03-14 09:15',
      status: 'completed'
    },
    {
      id: 3,
      type: 'debit',
      amount: 500,
      description: 'Withdrawal to USDT',
      date: '2025-03-10 16:45',
      status: 'completed'
    },
    {
      id: 4,
      type: 'credit',
      amount: 300,
      description: 'Research Data Sharing Reward',
      date: '2025-03-05 11:20',
      status: 'completed'
    }
  ];

  const withdrawMethods = [
    {
      id: 'usdt',
      name: 'USDT',
      icon: Coins,
      description: 'Withdraw to USDT wallet',
      fee: '1%',
      minAmount: 100
    },
    {
      id: 'eth',
      name: 'ETH',
      icon: WalletIcon,
      description: 'Convert to Ethereum',
      fee: '1.5%',
      minAmount: 150
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Bank,
      description: 'Direct bank transfer',
      fee: '2%',
      minAmount: 200
    }
  ];

  const handleWithdraw = () => {
    // Handle withdrawal logic here
    setShowWithdrawModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <WalletIcon className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold">Your Wallet</h1>
            </div>
            <button className="flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
              <ExternalLink className="h-5 w-5 mr-2" />
              Connect Wallet
            </button>
          </div>
          
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">
              <CountUp end={1500} duration={2} /> BMT
            </span>
            <span className="ml-2 text-blue-200">≈ $1,500 USD</span>
          </div>
          
          <div className="mt-4 flex space-x-4">
            <div className="flex items-center text-blue-200">
              <ArrowUpFromLine className="h-5 w-5 mr-1" />
              <span>+350 BMT this month</span>
            </div>
            <div className="flex items-center text-blue-200">
              <History className="h-5 w-5 mr-1" />
              <span>4 transactions</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction History</h2>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownToLine className={`h-5 w-5 ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      ) : (
                        <ArrowUpFromLine className={`h-5 w-5 ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {transaction.date}
                      </div>
                    </div>
                  </div>
                  <div className={`text-right ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <p className="font-semibold">
                      {transaction.type === 'credit' ? '+' : '-'}{transaction.amount} BMT
                    </p>
                    <p className="text-sm text-gray-500">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Withdraw Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Withdraw Options</h2>
            <div className="space-y-4">
              {withdrawMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setSelectedWithdrawMethod(method.id);
                    setShowWithdrawModal(true);
                  }}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <method.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-3 text-left">
                      <p className="font-medium text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm text-blue-900 font-medium">Important Note</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Withdrawals are processed within 24 hours. Minimum withdrawal amounts apply.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && selectedWithdrawMethod && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Withdraw to {withdrawMethods.find(m => m.id === selectedWithdrawMethod)?.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (BMT)
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fee</span>
                  <span className="text-gray-900">
                    {withdrawMethods.find(m => m.id === selectedWithdrawMethod)?.fee}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Minimum Amount</span>
                  <span className="text-gray-900">
                    {withdrawMethods.find(m => m.id === selectedWithdrawMethod)?.minAmount} BMT
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm Withdrawal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Wallet;