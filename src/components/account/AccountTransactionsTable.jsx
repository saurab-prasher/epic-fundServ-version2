import { useContext, useEffect } from "react";
import { FundContext } from "../../contexts/FundContext";
const AccountTransactionsTable = () => {
  const { selectedFundId, transactionsData, fetchTransactionData } =
    useContext(FundContext);

  useEffect(() => {}, []);
  useEffect(() => {
    fetchTransactionData(Object.keys(selectedFundId)[0]);
  }, [selectedFundId]);

  return (
    <div className='mt-12 px-4 w-11/12 mx-auto'>
      <div>
        <h2 className='text-2xl font-semibold leading-tight mb-6'>
          Accounts Transactions
        </h2>
      </div>
      <table className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
        <thead>
          <tr className='bg-[#2b6777] text-slate-100'>
            <th className='px-2 py-3 border-b-2 border-gray-200 text-left text-xs font-normal'>
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
          {transactionsData &&
            transactionsData?.map((transaction, index) => {
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
                // <tr key={index}>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Fund_account_id}
                //   </td>

                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {OTH_Fund_account_id}
                //   </td>

                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Fund_id}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Fund_class}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Rep_code}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Dealer_code}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Transact_type}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {transact_name}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Transact_type_detail}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Record_status}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Trade_date}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Settlement_date}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Gross_amount}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Fees}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Net_amount}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Settlement_amount}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {NAV}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Units}
                //   </td>
                //   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                //     {Process_date}
                //   </td>
                // </tr>
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
    </div>
  );
};

export default AccountTransactionsTable;
