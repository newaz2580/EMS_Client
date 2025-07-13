import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../pages/CheckOutForm/CheckOutForm";
import CheckOutForm from "../../../pages/CheckOutForm/CheckOutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentModal = ({ setIsOpen, isOpen, pay, refetch }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-xl space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">
            Deactivate aflsdfalsbfa fsafdjkfsdjhggjhglllllll{" "}
          </DialogTitle>

          <Elements stripe={stripePromise}>
            <CheckOutForm pay={pay} setIsOpen={setIsOpen} onSuccess={refetch} />
          </Elements>

          <div className="flex gap-4"></div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
