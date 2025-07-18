import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Component/hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckoutForm = ({ pay, setIsOpen, onSuccess }) => {
  const { salary, _id, employeeName } = pay;
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState('');

  useEffect(() => {
    const fetchIntent = async () => {
      try {
        const res = await axiosSecure.post('/create-payment-intent', { salary });
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.error('Failed to fetch client secret:', error);
      }
    };

    if (salary) fetchIntent();
  }, [salary, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    const data = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

   

    const  { paymentIntent, error: confirmError } = data;

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const transactionId = paymentIntent.id;

      await axiosSecure.patch(`/payment/pay/${_id}`, {
        transactionId,
      });

      Swal.fire('Success!', `Payment to ${employeeName} completed.`, 'success');
      setIsOpen(false);
      onSuccess();
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 text-black  p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">💳 Complete Your Payment</h2>

      <div className="bg-base-100 dark:bg-base-100 p-4 rounded-md border border-neutral">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff', 
                '::placeholder': { color: '#ffffff' },
              },
              invalid: { color: '#EF4444' }, 
            },
          }}
        />
      </div>

      {cardError && <p className="text-red-500 mt-2">{cardError}</p>}

      <button
        type="submit"
        className="btn btn-primary w-full mt-4"
        disabled={!stripe || processing}
      >
        {processing ? 'Paying...' : `Pay ৳${salary}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
