import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import PaymentModal from './PaymentModal';

const Payroll = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedPay, setSelectedPay] = useState(null);

  const { data = [], refetch } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payment');
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment Approvals</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Month</th>
            <th>Year</th>
            <th>Payment Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(pay => (
            <tr key={pay._id}>
              <td>{pay.employeeName}</td>
              <td>৳{pay.salary}</td>
              <td>{pay.month}</td>
              <td>{pay.year}</td>
              <td>{pay.paymentDate ? new Date(pay.paymentDate).toLocaleDateString() : '—'}</td>
              <td>
                {pay.paymentDate ? (
                  <span className="text-green-500 font-semibold">Paid</span>
                ) : (
                  <button className="btn btn-primary btn-sm" onClick={() => setSelectedPay(pay)}>Pay</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPay && (
        <PaymentModal
          isOpen={!!selectedPay}
          setIsOpen={() => setSelectedPay(null)}
          pay={selectedPay}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Payroll;
