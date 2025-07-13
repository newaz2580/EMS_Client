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

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

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
    <form onSubmit={handleSubmit}>
      <CardElement />
      {cardError && <p className="text-red-500">{cardError}</p>}
      <button type="submit" className="btn" disabled={!stripe || processing}>
        {processing ? 'Paying...' : `Pay ৳${salary}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
