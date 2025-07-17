import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data = {}, isLoading } = useQuery({
    queryKey: ['payment-history', user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-history?email=${user?.email}&page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: payments = [], totalPages = 0 } = data;

  if (isLoading)
    return <p className="text-center py-10 text-gray-700 dark:text-gray-300">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        💸 Salary Payment History
      </h2>

      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black ring-opacity-5 dark:ring-gray-700">
        <table className="table w-full text-left border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300">
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">#</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Month</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Year</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Amount</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Transaction ID</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Paid Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-200">
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map((pay, index) => (
                <tr
                  key={pay._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="capitalize border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {pay.month}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {pay.year}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    ৳{pay.salary}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {pay.transactionId}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    {new Date(pay.paymentDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? 'btn-primary' : 'btn-outline'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
