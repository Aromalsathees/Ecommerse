import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../../../api';

const PayOptions = () => {
  const [open, setOpen] = useState(null);
  const [product, setProduct] = useState(null);
  const [payment, setPayment] = useState('');
  const [errors, setErrors] = useState('');

  const { id } = useParams();

  const options = [
    { id: 'upi', title: 'UPI', icon: 'account_balance', content: 'Pay with Google Pay, PhonePe, or other UPI apps.' },
    { id: 'emi', title: 'EMI', icon: 'credit_card', content: 'Pay in installments with Credit Card EMI.' },
    { id: 'net-banking', title: 'Net Banking', icon: 'payments', content: "Pay using your bank's net banking portal." },
    { id: 'cod', title: 'Cash on Delivery', icon: 'attach_money', content: 'Pay in cash when the product is delivered.' },
  ];

  useEffect(() => {
    Api.get(`/Get_product_details/${id}/`)
      .then((response) => {
        console.log('success:', response.data);
        setProduct(response.data.Data);
      })
      .catch((error) => {
        console.log('error:', error.response?.data);
      });
  }, [id]);

  function submitPayment(pk) {
    if (!pk) {
      setErrors('Please select a payment method.');
      return;
    }

    Api.post(`/Order/submit_payment/`, { payment_method: pk })
      .then((response) => {
        setPayment(response.data.Data);
        console.log('success:', response.data);
      })
      .catch((error) => {
        setErrors(error.response?.data || 'Something went wrong');
        console.log('error:', error.response?.data);
      });
  }

  return (
    <main className='max-w-6xl mx-auto h-screen mt-10 p-4'>
      <h1 className='font-bold flex gap-2 mb-4'>
        <span className="material-symbols-outlined">keyboard_backspace</span> Payments
      </h1>

      <div className='border border-gray-500 rounded-md flex justify-between p-3'>
        <h1 className='text-blue-800'>Total Amount</h1>
        <p className='text-blue-800 font-bold'>
          ${product ? product.price : '...'}
        </p>
      </div>

      <div className='border border-gray-500 mt-10 rounded-lg overflow-hidden'>
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
              <div className='flex justify-between mx-auto p-4'>
                <div className='text-gray-600 bg-gray-50'>{opt.content}</div>
                <input
                  type="radio"
                  name="payment_method"
                  checked={open === opt.id}
                  onChange={() => setOpen(opt.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {product && (
        <div className="mt-6 p-4 border rounded-md shadow-sm">
          <h1 className="font-bold text-lg">{product.name}</h1>
          <p className="text-gray-700">Price: ${product.price}</p>
        </div>
      )}

      {errors && <p className='text-red-600 mt-2'>{errors}</p>}

      <div className='mx-auto max-w-6xl'>
        <button
          onClick={() => submitPayment(open)}
          className='bg-green-500 rounded-md font-semibold mt-4 p-2 text-white w-full'
        >
          Proceed
        </button>
      </div>
    </main>
  );
};

export default PayOptions;
