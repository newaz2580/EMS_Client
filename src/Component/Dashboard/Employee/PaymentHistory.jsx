import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['payment-history', user?.email, page],
    
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user?.email}&page=${page}&limit=5`);
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });
  console.log(data)
  if (isLoading) return <p>Loading payment history...</p>;
  if (error) return <p>Failed to load payment history.</p>;

  const payments = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const currentPage = data?.currentPage || 1;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 dark:text-white">My Salary Payment History</h2>
      <table className="table w-full border">
        <thead>
          <tr className="text-black dark:text-white">
            <th>Month</th>
            <th>Year</th>
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Paid On</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 dark:text-white">No payment history found.</td>
            </tr>
          ) : (
            payments.map((item) => (
              <tr key={item._id} className="text-black dark:text-white">
                <td>{item.month}</td>
                <td>{item.year}</td>
                <td>৳{item.salary}</td>
                <td>{item.transactionId || 'N/A'}</td>
                <td>{item.paymentDate ? new Date(item.paymentDate).toLocaleDateString() : '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={`btn btn-sm ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
