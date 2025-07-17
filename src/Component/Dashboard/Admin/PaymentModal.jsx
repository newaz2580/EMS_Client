import { Dialog, DialogPanel } from '@headlessui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../../pages/CheckOutForm/CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentModal = ({ isOpen, setIsOpen, pay, refetch }) => {

  
  return (
    <Dialog open={isOpen} onClose={setIsOpen} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50">
        <DialogPanel className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4 text-black ">Payment to {pay.EmployeeName}</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm pay={pay} setIsOpen={setIsOpen} onSuccess={refetch} />
          </Elements>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
