import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PayModal = ({ isOpen, setIsOpen, userData }) => {
  const { salary } = userData;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handlePayment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const salary = form.salary.value;
    const month = form.month.value;
    const year = form.year.value;
    const salaryInfo = { salary, month, year };
    salaryInfo.requestedBy = user.email;
    console.log(salaryInfo);
    try {
      const { data } = await axiosSecure.post("/payment-request", salaryInfo);
      if (data.insertedId) {
        Swal.fire({
          title: "Payment request Successful",
          icon: "success",
          draggable: true,
        });
        setIsOpen(false)
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Deactivate account</DialogTitle>

          <form
            onSubmit={handlePayment}
            class="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div class="mb-1 flex flex-col gap-6">
              <div class="w-full max-w-sm min-w-[200px]">
                <label class="block mb-2 text-sm text-slate-600">
                  Your Salary
                </label>
                <input
                  type="text"
                  defaultValue={salary}
                  name="salary"
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Your salary"
                  readOnly
                />
              </div>
              <div class="w-full max-w-sm min-w-[200px]">
                <label class="block mb-2 text-sm text-slate-600">
                  Payment Month
                </label>
                <input
                  type="text"
                  name="month"
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Your payment Month"
                />
              </div>
              <div class="w-full max-w-sm min-w-[200px]">
                <label class="block mb-2 text-sm text-slate-600">
                  Payment Year
                </label>
                <input
                  type="text"
                  name="year"
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Payment Year"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-between">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button type="submit">Pay</button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PayModal;
