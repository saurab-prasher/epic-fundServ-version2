import { useState, useContext, useEffect } from "react";
import { FundContext } from "../../contexts/FundContext";

const AccountLookup = () => {
  const {
    fundData,
    dealerData,
    fetchAccountDataNames,
    handleSelectedAccount,
    handleSelectedFundAccount,
    handleSelectedDealerAccount,
    fetchAccountInfoData,
    fetchFundAndDealerData,
    fundAccountId,
    dealerAccountId,
    searchTerm,
    handleSearchTerm,
    suggestions,
    handleSuggestions,
    handleSearch,
  } = useContext(FundContext);

  // Debounce input value
  //   const [debouncedValue, setDebouncedValue] = useState(searchTerm);

  useEffect(() => {
    fetchAccountDataNames();
    fetchAccountInfoData();
    fetchFundAndDealerData();
  }, []);

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
              onChange={(e) => {
                handleSelectedAccount(e.target.value, "fundAccountId");
                handleSearchTerm("");
              }}
              placeholder='Select or paste account ID here'
              className='mt-1 block border w-64 pl-3 pr-5 py-2 text-base border-gray-300 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none sm:text-sm rounded-md shadow-sm'
            />

            <option value='' disabled hidden>
              Select Account ID
            </option>

            <datalist id='fundAccounts'>
              {fundData.map((fundAccountId, index) => (
                <option value={fundAccountId} key={index}>
                  {fundAccountId}
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
              onChange={(e) => {
                handleSelectedAccount(e.target.value, "dealerAccountId");
                handleSearchTerm("");
              }}
              placeholder='Select or paste Dealer ID here'
              className='mt-1 block border w-64 pl-3 pr-5 py-2 text-base border-gray-300 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none sm:text-sm rounded-md shadow-sm'
            />

            <datalist id='dealerAccounts'>
              {dealerData.map((dealerAccountId, index) => (
                <option value={dealerAccountId} key={index}>
                  {dealerAccountId}
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
                  onChange={(e) => {
                    handleSearchTerm(e.target.value);
                    handleSearch(e);
                  }}
                  placeholder='Search by Account'
                  className='appearance-none rounded-r rounded-l pl-3 pr-5 border border-gray-300 block py-2 w-full bg-white text-sm rounded-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none
        '
                />
                {/* {suggestions.length > 0 && searchTerm && ( */}
                <ul role='list-box' className='absolute z-10 w-full mb-2'>
                  {suggestions.map((suggestion, index) => (
                    <li
                      role='option'
                      onClick={() => {
                        handleSelectedAccount(suggestion, "name");
                        handleSearchTerm(suggestion);
                        handleSuggestions([]);
                      }}
                      key={index}
                      className='cursor-pointer rounded-r rounded-l pl-3 pr-5 border-b border-gray-300 block py-2 w-full bg-white text-sm rounded-md text-gray-400 dark:md:hover:text-gray-800'
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLookup;
