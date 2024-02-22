import { useState, useEffect, useContext } from "react";
import { FundContext } from "../../contexts/FundContext";

const TransactionsTable = () => {
  const { allTransactionsData, fetchAllTransactionsData } =
    useContext(FundContext);

  useEffect(() => {
    fetchAllTransactionsData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentData = allTransactionsData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Pagination logic
  const totalPageNumbersToShow = 5;
  const totalPageNumbers = Math.ceil(allTransactionsData?.length / rowsPerPage);
  const pageNumbers = Array.from({ length: totalPageNumbers }, (_, i) => i + 1);

  let firstPageNumberToShow = Math.max(
    1,
    currentPage - Math.floor(totalPageNumbersToShow / 2)
  );
  let lastPageNumberToShow = firstPageNumberToShow + totalPageNumbersToShow - 1;

  if (lastPageNumberToShow > pageNumbers.length) {
    lastPageNumberToShow = pageNumbers.length;
    let firstPageAdjusted = Math.max(
      1,
      lastPageNumberToShow - totalPageNumbersToShow + 1
    );
    firstPageNumberToShow = Math.min(firstPageNumberToShow, firstPageAdjusted);
  }

  const visiblePageNumbers = pageNumbers.slice(
    firstPageNumberToShow - 1,
    lastPageNumberToShow
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {" "}
      <div className='mt-12 px-4 w-11/12 mx-auto'>
        <div>
          <h2 className='text-2xl font-semibold leading-tight mb-6'>
            Accounts Transactions
          </h2>
        </div>
        <table className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
          <thead>
            <tr className='bg-[#2b6777] text-slate-100'>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Fund Account ID
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                OTH Fund ID
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Fund ID
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Fund Class
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Rep Code
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Dealer Code
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Transact Type
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Transact Name
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Transact Type Detail
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Record Status
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Trade Date
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Settlement Date
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Gross Amount
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Fees
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Net Amount
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Settlement Amount
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                NAV
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Units
              </th>
              <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs'>
                Process Date
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData &&
              currentData?.map((transaction, index) => {
                // const {
                //   Fund_account_id,
                //   OTH_Fund_account_id,
                //   Fund_id,
                //   Fund_class,
                //   Rep_code,
                //   Dealer_code,
                //   Transact_type,
                //   transact_name,
                //   Transact_type_detail,
                //   Record_status,
                //   Trade_date,
                //   Settlement_date,
                //   Gross_amount,
                //   Fees,
                //   Net_amount,
                //   Settlement_amount,
                //   NAV,
                //   Units,
                //   Process_date,
                // } = transaction;

                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {Object.values(transaction).map((value, idx) => (
                      <td
                        key={idx}
                        className='px-2 py-3 border-b border-gray-200 text-sm whitespace-nowrap'
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-4'>
            <label
              htmlFor='rows-per-page'
              className='text-xs font-semibold text-gray-600 tracking-wider '
            >
              Rows per page:
            </label>
            <select
              name='rows per page'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
              className='w-16 mt-1 block w-fit border py-1 px-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='20'>20</option>
            </select>
          </div>

          <div className='justify-self-start px-6 mr-auto'>
            <p className='text-xs font-normal text-gray-600 mr-auto'>
              Total:
              <span className='font-semibold'>
                {" "}
                {allTransactionsData?.length}{" "}
              </span>
              transactions.
            </p>
          </div>
          <div className='pagination flex space-x-1 '>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              &#171; Prev
            </button>

            {visiblePageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
                  currentPage === number
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : ""
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))
              }
              disabled={currentPage === pageNumbers.length}
              className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 ${
                currentPage === pageNumbers.length
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next &#187;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
