import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Api } from '../../../api';

const PayOptions = () => {
  const [open, setOpen] = useState(null);
  const [product, setProduct] = useState(null);
  const [payment, setPayment] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();

  // Get optional state passed from Cart page (like cart_id or mode)
  const cart_id = location.state?.cart_id || null;
  const buy_all = location.state?.buy_all || false;

  const options = [
    { id: 'razorpay', title: 'Razorpay (UPI / Card)', icon: 'account_balance', content: 'Pay using UPI, Cards, or Razorpay Wallet.' },
    { id: 'cod', title: 'Cash on Delivery', icon: 'attach_money', content: 'Pay in cash when your order is delivered.' },
  ];

  // ✅ Fetch product details only if direct buy (from product page)
  useEffect(() => {
    if (id) {
      Api.get(`/Get_product_details/${id}/`)
        .then((response) => {
          console.log('Product fetched:', response.data);
          setProduct(response.data.Data);
        })
        .catch((error) => {
          console.log('Error:', error.response?.data);
          setErrors('Failed to load product details');
        });
    }
  }, [id]);

  // ✅ Submit payment
  const submitPayment = () => {
    if (!open) {
      setErrors('Please select a payment method.');
      return;
    }

    setLoading(true);
    setErrors('');

    const payload = {
      payment_method: open,
    };

    // 🟢 1. Direct Buy
    if (id) {
      payload.product_id = id;
      payload.quantity = 1; // You can make it dynamic if needed
    }

    // 🟢 2. Single Cart Item
    if (cart_id) {
      payload.cart_id = cart_id;
    }

    // 🟢 3. Buy All Cart Items (no id or cart_id)
    if (buy_all) {
      // no need to add anything extra — backend handles empty payload
    }

    Api.post(`/Order/create_order/`, payload)
      .then((response) => {
        console.log('Order Success:', response.data);
        setPayment(response.data.Data);
      })
      .catch((error) => {
        console.log('Order Error:', error.response?.data);
        setErrors(error.response?.data?.error || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="max-w-6xl mx-auto h-screen mt-10 p-4">
      <h1 className="font-bold flex gap-2 mb-4 items-center">
        <span className="material-symbols-outlined">keyboard_backspace</span> Payments
      </h1>

      {/* ✅ Total Amount section */}
      <div className="border border-gray-500 rounded-md flex justify-between p-3">
        <h1 className="text-blue-800">Total Amount</h1>
        <p className="text-blue-800 font-bold">
          ₹{product ? product.price : payment?.amount || '...'}
        </p>
      </div>

      {/* ✅ Payment options */}
      <div className="border border-gray-500 mt-10 rounded-lg overflow-hidden">
        {options.map((opt) => (
          <div key={opt.id} className="border-b last:border-b-0">
            <button
              onClick={() => setOpen(open === opt.id ? null : opt.id)}
              className="flex items-center justify-between w-full p-4 text-left text-gray-800 focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-xl">{opt.icon}</span>
                <span className="font-medium text-lg">{opt.title}</span>
              </div>
              <span
                className={`material-symbols-outlined transition-transform duration-300 ${open === opt.id ? 'rotate-180' : ''
                  }`}
              >
                expand_more
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${open === opt.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="flex justify-between mx-auto p-4">
                <div className="text-gray-600 bg-gray-50">{opt.content}</div>
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

      {/* ✅ Product preview (if direct buy) */}
      {product && (
        <div className="mt-6 p-4 border rounded-md shadow-sm">
          <h1 className="font-bold text-lg">{product.name}</h1>
          <p className="text-gray-700">Price: ₹{product.price}</p>
        </div>
      )}

      {/* ✅ Error message */}
      {errors && <p className="text-red-600 mt-2">{errors}</p>}

      {/* ✅ Submit button */}
      <div className="mx-auto max-w-6xl">
        <button
          onClick={submitPayment}
          disabled={loading}
          className="bg-green-600 rounded-md font-semibold mt-6 p-3 text-white w-full hover:bg-green-700 transition"
        >
          {loading ? 'Processing...' : 'Proceed to Pay'}
        </button>
      </div>

      {/* ✅ Show confirmation */}
      {payment && (
        <div className="mt-6 p-4 border rounded-md shadow bg-green-50">
          <h2 className="font-bold text-green-700">Order Placed Successfully!</h2>
          <p>Order ID: {payment.order_id}</p>
          <p>Total: ₹{payment.total || payment.amount}</p>
        </div>
      )}
    </main>
  );
};

export default PayOptions;
