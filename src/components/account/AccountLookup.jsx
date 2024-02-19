import { useState, useContext, useEffect } from "react";
import { FundContext } from "../../contexts/FundContext";

const AccountLookup = () => {
  const {
    fundData,
    dealerData,
    accountDataNames,
    fetchAccountDataNames,
    handleSelectedAccountByName,
    handleSelectedFundAccount,
    handleSelectedDealerAccount,
    fetchAccountInfoData,
    fetchFundAndDealerData,
    fundAccountId,
    dealerAccountId,
  } = useContext(FundContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState(accountDataNames);

  // Debounce input value
  //   const [debouncedValue, setDebouncedValue] = useState(searchTerm);

  useEffect(() => {
    fetchAccountDataNames();
    fetchAccountInfoData();
    fetchFundAndDealerData();
  }, []);

  //   useEffect(() => {
  //     const handler = setTimeout(() => {
  //       setDebouncedValue(searchTerm);
  //     }, 300); // Delay in ms

  //     return () => {
  //       clearTimeout(handler);
  //     };
  //   }, [searchTerm]);

  //   useEffect(() => {
  //     if (debouncedValue.length > 0) {
  //       const filteredSuggestions = accountDataNames
  //         .filter((suggestion) =>
  //           suggestion.toLowerCase().includes(debouncedValue.toLowerCase())
  //         )
  //         .slice(0, 5); // Limit to the first 5 suggestions
  //       setSuggestions(filteredSuggestions);
  //     } else {
  //       setSuggestions([]);
  //     }
  //   }, [debouncedValue]);

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = accountDataNames
        .filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      // Limit to the first 5 suggestions
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }
  return (
    <div>
      <h2 className='text-2xl font-semibold leading-tight mb-6'>
        Accounts Search
      </h2>

      <div className='flex flex-col gap-10'>
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
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='search'
                >
                  Enter First 4+ Characters of Account Search: <br />
                  Name, Dealer Account or Fund Account, then select account
                </label>
                <input
                  value={searchTerm}
                  onChange={(e) => handleSearch(e)}
                  placeholder='Search by Account'
                  className='appearance-none rounded-r rounded-l pl-3 pr-5 border border-gray-300 block py-2 w-full bg-white text-sm rounded-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none
        '
                />

                {suggestions.length > 0 && searchTerm && (
                  <ul className='absolute z-10 w-full mb-2'>
                    {suggestions.map((suggestion, index) => (
                      <li
                        onClick={() => {
                          handleSelectedAccountByName(suggestion);
                          setSearchTerm(suggestion);
                          setSuggestions([]);
                        }}
                        key={index}
                        className='cursor-pointer rounded-r rounded-l pl-3 pr-5 border-b border-gray-300 block py-2 w-full bg-white text-sm rounded-md text-gray-400 dark:md:hover:text-gray-800'
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLookup;
