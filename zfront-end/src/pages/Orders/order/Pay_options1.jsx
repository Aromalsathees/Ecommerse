import React, { useState } from 'react';


const PayOptions = () => {
  const [open, setOpen] = useState(null);

  const options = [
    { id: 'upi', title: 'UPI', icon: 'account_balance', content: 'Pay with Google Pay, PhonePe, or other UPI apps.' },
    { id: 'emi', title: 'EMI', icon: 'credit_card', content: 'Pay in installments with Credit Card EMI.' },
    { id: 'net-banking', title: 'Net Banking', icon: 'payments', content: "Pay using your bank's net banking portal." },
    { id: 'cod', title: 'Cash on Delivery', icon: 'attach_money', content: 'Pay in cash when the product is delivered.' },
  ];

  return (
    <main className='max-w-6xl mx-auto h-screen mt-10 p-4'>
      <h1 className='font-bold flex gap-2 mb-4'>
        
        <span className="material-symbols-outlined">keyboard_backspace</span> Payments
      </h1>

      <div className='border border-gray-500 rounded-md flex justify-between p-3'>
        <h1 className='text-blue-800'>Total Amount</h1>
        <p className='text-blue-800 font-bold'>$1500</p>
      </div>

      <div className='border border-gray-500 mt-10 rounded-lg overflow-hidden '>
        {options.map(opt => (
          <div key={opt.id} className="border-b last:border-b-0">
            <button
              onClick={() => setOpen(open === opt.id ? null : opt.id)}
              className="flex items-center justify-between w-full p-4 text-left text-gray-800 focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                <span className="font-medium text-lg">{opt.title}</span>
              </div>
              <span className={`material-symbols-outlined transition-transform duration-300 ${open === opt.id ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${open === opt.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className='p-4 text-gray-600 bg-gray-50'>{opt.content}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PayOptions;
