import { createContext, useState } from "react";

export const FundContext = createContext();

export const FundProvider = ({ children }) => {
  const [fundData, setFundData] = useState([]);
  const [dealerData, setDealerData] = useState([]);
  const [accountDataNames, setAccountNames] = useState([]);
  const [allData, setAllData] = useState([]);
  const [dealerAccountId, setDealerAccountId] = useState("");
  const [accountLookupData, setAccountLookupData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fundDealerAccountData, setFundDealerAccountData] = useState([]);
  const [fundAccountId, setFundAccountId] = useState("");
  const [suggestions, setSuggestions] = useState(accountDataNames);

  const [accountName, setAccountName] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [accountInfoData, setAccountInfoData] = useState([]);
  const [accountInfo, setAccountInfo] = useState({});
  const [transactionsData, setTransactionsData] = useState([]);

  const fetchAccountDataNames = async () => {
    const response = await fetch("/suncrestFiles/xx_account_info.json");
    const data = await response.json();
    // Account_name
    const accountNames = data.map(({ Account_name }) => Account_name);
    setAccountNames(accountNames);
  };

  async function fetchAllData() {
    try {
      const response = await fetch(
        "/suncrestFiles/xx_fund_account_master.json"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setAllData(json);
    } catch (e) {
      console.log(e);
    }
  }

  const fetchAccountInfoData = async () => {
    const response = await fetch("/suncrestFiles/xx_account_info.json");
    const data = await response.json();
    setAccountInfoData(data);
  };

  const fetchFundAndDealerData = async () => {
    const response = await fetch("/suncrestFiles/xx_account.json");
    const data = await response.json();
    setFundDealerAccountData(data);
    const fundAccoundIds = data.map((account) => account.Fund_account_id);
    const dealerAccoundIds = data.map((account) => account.Dealer_account_id);
    setFundData(fundAccoundIds);
    setDealerData(dealerAccoundIds);
  };

  const fetchAccountData = async () => {
    const response = await fetch("/suncrestFiles/xx_account_lookup.json");
    const data = await response.json();
    setAccountLookupData(data);
  };

  const fetchTransactionData = async () => {
    const response = await fetch("/suncrestFiles/xx_transaction.json");
    const data = await response.json();
    setTransactionsData(data);
  };

  const handleSelectedAccount = (value, type) => {
    if (type === "name") {
      accountInfoData.forEach((account) => {
        if (account.Account_name.toLowerCase() == value.toLowerCase()) {
          setAccountInfo(account);
          setFundAccountId(account.Fund_account_id);
          // Find and set the dealer account based on the fund account ID
          const dealerAccount = fundDealerAccountData.find(
            (da) => da.Fund_account_id === account.Fund_account_id
          );
          if (dealerAccount) {
            handleSelectedDealerAccount(dealerAccount.Dealer_account_id);
          }
        }
      });
    }

    if (type === "fundAccountId") {
      handleSelectedFundAccount(value);
      console.log("searching for fund account id");
    }

    if (type === "dealerAccountId") {
      handleSelectedDealerAccount(value);
    }
  };

  function getAccountInfo() {
    accountInfoData.map((account) => {
      if (allData.length > 0)
        if (account.Fund_account_id == fundAccountId) {
          setAccountInfo(account);
        }
    });
  }

  function getTransactionInfo() {
    transactionsData.filter(
      (transaction) => transaction.Fund_account_id == fundAccountId
    );
  }

  function loadDataIntoFundsTable() {
    const data = allData?.filter(
      (account) => account.Fund_account_id === fundAccountId
    );
    setFilteredData(data);
  }

  const handleSelectedFundAccount = (value) => {
    // Find the corresponding dealer account ID from dataset
    const correspondingDealerAccount = fundDealerAccountData.find(
      (account) => account.Fund_account_id === value
    )?.Dealer_account_id;

    // Update both states
    setFundAccountId(value);
    if (correspondingDealerAccount) {
      setDealerAccountId(correspondingDealerAccount);
    }

    accountInfoData.forEach((account) => {
      if (account.Fund_account_id === value) {
        setAccountInfo(account);
      }
    });
  };

  const handleSelectedDealerAccount = (value) => {
    // Find the corresponding fund account ID from your dataset
    const correspondingFundAccount = fundDealerAccountData.find(
      (account) => account.Dealer_account_id === value
    )?.Fund_account_id;

    // Update both states
    setDealerAccountId(value);
    if (correspondingFundAccount) {
      setFundAccountId(correspondingFundAccount);

      accountInfoData.forEach((account) => {
        if (account.Fund_account_id === correspondingFundAccount) {
          setAccountInfo(account);
        }
      });
    }
  };

  function handleSearchTerm(value) {
    setSearchTerm(value);
  }
  function handleSearch(e) {
    const value = e.target?.value.toLowerCase();
    setSearchTerm(value);

    if (value?.length > 0) {
      const filteredSuggestions = accountDataNames
        .filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      // Limit to the first 5 suggestions
      handleSuggestions(filteredSuggestions);
    } else {
      handleSuggestions([]);
    }
  }

  function handleSuggestions(suggestions) {
    setSuggestions(suggestions);
  }
  return (
    <FundContext.Provider
      value={{
        fundAccountId,
        filteredData,
        fundData,
        fetchFundAndDealerData,
        dealerData,
        accountInfo,
        accountLookupData,
        accountInfoData,
        transactionsData,
        fetchAccountData,
        fetchTransactionData,
        fetchAccountInfoData,
        dealerAccountId,
        fetchAccountDataNames,
        accountDataNames,
        handleSelectedAccount,
        handleSelectedFundAccount,
        getAccountInfo,
        getTransactionInfo,
        handleSelectedDealerAccount,

        fetchAllData,
        loadDataIntoFundsTable,
        handleSearchTerm,
        handleSearch,
        suggestions,
        searchTerm,
        handleSuggestions,
      }}
    >
      {children}
    </FundContext.Provider>
  );
};
