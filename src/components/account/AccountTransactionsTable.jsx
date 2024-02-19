import { useState, useContext } from "react";
import { FundContext } from "../../contexts/FundContext";
const AccountTransactionsTable = () => {
  const { transactionsData } = useContext(FundContext);
  const [selected, setSelected] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleSelectRow = (id, e) => {
    console.log(id, e);
    const newSelected = { ...selected, [id]: e.target.checked };
    setSelected(newSelected);
  };

  const indexOfLastStock = currentPage * rowsPerPage;
  const indexOfFirstStock = indexOfLastStock - rowsPerPage;
  //   const currentData = filteredData?.slice(indexOfFirstStock, indexOfLastStock);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data?.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='mt-12'>
      <div>
        <h2 className='text-2xl font-semibold leading-tight mb-6'>
          Accounts Transactions
        </h2>
      </div>

      <div className='inline-block min-w-full shadow rounded-lg overflow-x-auto'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-1 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                <input
                  type='checkbox'
                  className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
                  // onChange={handleSelectAll}
                  //   checked={isAllSelected}
                />
              </th>
              <th className='px-1 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Fund Acct
              </th>
              <th className='px-1 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Other Fund Acct
              </th>
              <th className='px-1 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Fund
              </th>
              <th className='px-1 py-1 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Class Series ID
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                REP Code
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Dealer Code
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Transaction Type
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Transaction Type Detail
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Transaction Status
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Trade Date
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Settlement Date
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Gross Amount
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Fees
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                NET Amount
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Settlement Amount
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 sm:table-cell uppercase '>
                NAV
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Units
              </th>
              <th className='px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase '>
                Process Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionsData &&
              transactionsData.slice(0, 10).map((transaction, i) => {
                const {
                  Fund_account_id,
                  OTH_Fund_account_id,
                  Fund_id,
                  Fund_class,
                  Rep_code,
                  Dealer_code,
                  Transact_type,
                  transact_name,
                  Transact_type_detail,
                  Record_status,
                  Trade_date,
                  Settlement_date,
                  Gross_amount,
                  Fees,
                  Net_amount,
                  Settlement_amount,
                  NAV,
                  Units,
                  Process_date,
                } = transaction;

                return (
                  <tr key={i}>
                    <td className='px-3 py-5 border-b border-gray-200 bg-white text-sm'>
                      <input
                        type='checkbox'
                        className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
                        onChange={(e) => handleSelectRow(Fund_id, e)}
                      />
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <div className='flex items-center'>
                        <div className='ml-3'>
                          <p className='text-gray-900 whitespace-no-wrap'>
                            {Fund_account_id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {OTH_Fund_account_id}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Fund_id}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Fund_class}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Rep_code}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Dealer_code}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Transact_type}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {transact_name}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Transact_type_detail}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Record_status}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Trade_date}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Settlement_date}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Gross_amount}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{Fees}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Net_amount}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Settlement_amount}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>{NAV}</p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Units}
                      </p>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {Process_date}
                      </p>
                    </td>
                  </tr>
                );
              })}
            {/* {currentData &&
            currentData?.map((item, i) => {
              const { Fund_id, Fund_name, Fund_class, Unit_balance } =
                item;
              return (
                <tr key={i}>
                  <td className='px-3 py-5 border-b border-gray-200 bg-white text-sm'>
                    <input
                      type='checkbox'
                      className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
                      onChange={(e) => handleSelectRow(Fund_id, e)}
                    />
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex items-center'>
                      <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          30101
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {Fund_name}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {Fund_class}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {Unit_balance}
                    </p>
                  </td>
                </tr>
              );
            })} */}
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

            {pageNumbers
              .slice(
                Math.max(0, currentPage - 2),
                Math.min(currentPage + 1, pageNumbers.length)
              )
              .map((number) => (
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

export default AccountTransactionsTable;
