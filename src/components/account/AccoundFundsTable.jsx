import { useState, useEffect } from "react";

const AccoundFundsTable = () => {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5 rows per page
  const [fundData, setFundData] = useState([]);
  const [dealerData, setDealerData] = useState([]);

  const [fundAccountId, setFundAccountId] = useState("");
  const [dealerAccountId, setDealerAccountId] = useState("");
  const [accountLookupData, setAccountLookupData] = useState([]);

  const [accountName, setAccountName] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [accountInfoData, setAccountInfoData] = useState([]);
  const [accountInfo, setAccountInfo] = useState({});
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'url/to/your/data.json' with the path to your JSON file or API endpoint
        const response = await fetch(
          "/suncrestFiles/xx_fund_account_master.json"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    const fetchAccountInfoData = async () => {
      const response = await fetch("/suncrestFiles/xx_account_info.json");
      const data = await response.json();
      setAccountInfoData(data);
    };

    const fetchFundData = async () => {
      const response = await fetch("/suncrestFiles/xx_account_lookup.json");
      const data = await response.json();
      setFundData(data);
    };

    const fetchDealerData = async () => {
      const response = await fetch("/suncrestFiles/xx_account_lookup.json"); // Replace with actual file path
      const data = await response.json();
      setDealerData(data);
    };

    const fetchAccountData = async () => {
      const response = await fetch("/suncrestFiles/xx_account_lookup.json"); // Replace with actual file path
      const data = await response.json();
      setAccountLookupData(data);
    };

    const fetchTransactionData = async () => {
      const response = await fetch("/suncrestFiles/xx_transaction.json");
      const data = await response.json();
      setTransactionsData(data);
    };
    fetchFundData();
    fetchDealerData();
    fetchAccountData();
    fetchAccountInfoData();
    fetchTransactionData();

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    showSelectedFundAccount();
    getAccountInfo();
    getTransactionInfo();
  }, [fundAccountId, dealerAccountId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Calculate the current stocks to display
  const indexOfLastStock = currentPage * rowsPerPage;
  const indexOfFirstStock = indexOfLastStock - rowsPerPage;
  const currentData = filteredData?.slice(indexOfFirstStock, indexOfLastStock);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data?.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  //   const handleSelectAll = (e) => {
  //     if (e.target.checked) {
  //       const newSelected = {};
  //       Array.from(10).forEach((item) => (newSelected[item.id] = true));
  //       setSelected(newSelected);
  //     } else {
  //       setSelected({});
  //     }
  //   };

  const handleSelectRow = (id, e) => {
    console.log(id, e);
    const newSelected = { ...selected, [id]: e.target.checked };
    setSelected(newSelected);
  };

  const handleSelectedFundAccount = (e) => {
    const value = e.target.value;
    setFundAccountId(value);
  };

  const handleSelectedDealerAccount = (e) => {
    const value = e.target.value;
    setDealerAccountId(value);
  };

  function showSelectedFundAccount() {
    let localAccountNameSet = new Set();
    accountLookupData.forEach((account) => {
      if (
        account.Fund_account_id === fundAccountId &&
        account.Dealer_account_id == dealerAccountId
      )
        account.Account_lu.split(" ").forEach((value) =>
          localAccountNameSet.add(value)
        );
    });

    setAccountName([...localAccountNameSet]);

    const filteredData = data?.filter((account) => {
      const accountFundID = account.Fund_account_id;

      return [...localAccountNameSet].some((value) =>
        value.includes(accountFundID)
      );
    });

    setFilteredData(filteredData);
  }

  function getAccountInfo() {
    accountInfoData.map((account) => {
      if (data.length > 0)
        if (account.Fund_account_id == fundAccountId) {
          setAccountInfo(account);
        }
    });
  }

  function getTransactionInfo() {
    transactionsData.filter(
      (transaction) => transaction.Fund_account_id == fundAccountId
    );

    console.log(transactionsData[5]);
  }

  return (
    <>
      <div className='flex gap-48'>
        <div className='flex flex-col gap-12'>
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-col'>
              <label className='block text-sm font-medium text-gray-700'>
                Fund Account ID
              </label>

              <input
                list='fundAccounts'
                value={fundAccountId}
                onChange={(e) => handleSelectedFundAccount(e)}
                placeholder='Select or paste account ID here'
                className='mt-1 block border w-64 pl-3 pr-5 py-2 text-base border-gray-300 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none sm:text-sm rounded-md shadow-sm'
              />
              {/* <select
            value={fundAccountId}
            onChange={(e) => handleSelectedFundAccount(e)}
            className='mt-1 block border w-fit pl-3 pr-5 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm'
          > */}
              <option value='' disabled hidden>
                Select Account ID
              </option>

              <datalist id='fundAccounts'>
                {fundData?.map(({ Fund_account_id }, index) => (
                  <option value={Fund_account_id} key={index}>
                    {Fund_account_id}
                  </option>
                ))}
              </datalist>

              {/* {fundData?.map(({ Fund_account_id }, index) => (
              <option value={Fund_account_id} key={index}>
                {Fund_account_id}
              </option>
            ))} */}
              {/* </select> */}
            </div>

            <div className='flex flex-col'>
              <label className='block text-sm font-medium text-gray-700'>
                Dealer Account ID
              </label>

              <input
                list='dealerAccounts'
                value={dealerAccountId}
                onChange={(e) => handleSelectedDealerAccount(e)}
                placeholder='Select or paste Dealer ID here'
                className='mt-1 block border w-64 pl-3 pr-5 py-2 text-base border-gray-300 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none sm:text-sm rounded-md shadow-sm'
              />

              <datalist id='dealerAccounts'>
                {dealerData?.map(({ Dealer_account_id }, index) => (
                  <option key={index} value={Dealer_account_id}>
                    {Dealer_account_id}
                  </option>
                ))}
              </datalist>
            </div>
          </div>

          <div className='flex gap-x-20 items-start'>
            <div>
              <div className='my-2 flex sm:flex-row flex-col'>
                <div className='block relative'>
                  <span className='h-full absolute inset-y-0 left-0 flex items-center pl-2'></span>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='search'
                  >
                    Enter First 4+ Characters of Account Search
                  </label>
                  <input
                    placeholder='Search by Account'
                    className='appearance-none rounded-r rounded-l pl-3 pr-5 border border-gray-300 block py-2 w-full bg-white text-sm rounded-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none
                '
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container mx-auto w-fit'>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <div className='flex mb-4'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='account-name'
                  >
                    Name
                  </label>
                  <p className='appearance-none block w-full text-gray-700 border-b rounded py-3 px-4 mb-3 leading-tight'>
                    {accountInfo.Account_name}
                  </p>
                </div>
                <div className='w-full md:w-1/2 px-3'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='account-address'
                  >
                    Address
                  </label>
                  <p className='appearance-none block w-full  text-gray-700 border-b rounded py-3 px-4 leading-tight'>
                    {accountInfo.Account_address} {accountInfo.Account_city}{" "}
                    {accountInfo.Account_prov}`
                  </p>
                </div>
              </div>
              <div className='flex mb-6'>
                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='account-phone'
                  >
                    Phone
                  </label>
                  <p className='appearance-none block w-full text-gray-700 border-b rounded py-3 px-4 leading-tight'>
                    Static value = (416) 555-7021
                  </p>
                </div>
                <div className='w-full md:w-1/2 px-3'>
                  <label
                    className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                    htmlFor='account-email'
                  >
                    Email
                  </label>
                  <p className='appearance-none block w-full  text-gray-700 border-b  rounded py-3 px-4 leading-tight'>
                    {accountInfo.Account_email
                      ? accountInfo.Account_email
                      : "Static Email"}
                  </p>
                </div>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='account-email'
                >
                  Type
                </label>
                <p className='appearance-none block w-full  text-gray-700 border-b  rounded py-3 px-4 leading-tight'>
                  {accountInfo.Account_type}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
        <div>
          <h2 className='text-2xl font-semibold leading-tight mb-6'>
            Accounts Funds
          </h2>
        </div>
        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  <input
                    type='checkbox'
                    className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
                    // onChange={handleSelectAll}
                    //   checked={isAllSelected}
                  />
                </th>

                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Fund ID
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Fund Name
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Class Series
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Units
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData &&
                currentData?.map((item, i) => {
                  const { Fund_id, Fund_name, Fund_class, Unit_balance } = item;
                  return (
                    <tr key={i}>
                      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
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
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, pageNumbers.length)
                  )
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
                          <p className='text-gray-900 whitespace-no-wrap'>
                            {Fees}
                          </p>
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
                          <p className='text-gray-900 whitespace-no-wrap'>
                            {NAV}
                          </p>
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, pageNumbers.length)
                    )
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
      </div>
    </>
  );
};

export default AccoundFundsTable;
