import { createContext, useState } from "react";

export const FundContext = createContext();

export const FundProvider = ({ children }) => {
  const [fundData, setFundData] = useState([]);
  const [dealerData, setDealerData] = useState([]);
  const [accountData, setAccount] = useState([]);
  const [allData, setAllData] = useState([]);
  const [dealerAccountId, setDealerAccountId] = useState("");
  const [accountLookupData, setAccountLookupData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fundDealerAccountData, setFundDealerAccountData] = useState([]);
  const [fundAccountId, setFundAccountId] = useState("");
  const [suggestions, setSuggestions] = useState(accountData);
  const [selectedFundId, setSelectedFundId] = useState({});
  // const [accountName, setAccountName] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [accountInfoData, setAccountInfoData] = useState([]);
  const [accountInfo, setAccountInfo] = useState({});
  const [transactionsData, setTransactionsData] = useState([]);

  const fetchAccountData = async () => {
    const response = await fetch("/suncrestFiles/xx_account_info.json");
    const data = await response.json();
    setAccount(data);
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

  const fetchTransactionData = async (fundId) => {
    try {
      const response = await fetch("/suncrestFiles/xx_transaction.json");
      const transactionsData = await response.json();

      const filteredTransactions = transactionsData.filter(
        (transaction) => transaction.Fund_id == fundId
      );

      setTransactionsData(filteredTransactions);
      console.log(filteredTransactions);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
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

  // function getTransactionsInfo(fundId) {
  //   fetchTransactionData();

  //   const filteredTransactions = transactionsData.filter(
  //     (transaction) => transaction.Fund_id == fundId
  //   );

  //   setTransactionsData(filteredTransactions);
  //   console.log(filteredTransactions);
  // }

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
  function handleSearch(value) {
    // console.log(formattedString);

    if (typeof value === "object") {
      const formattedString = `${value?.Account_name} - ${value?.Fund_account_id} - ${value?.Dealer_account_id}`;
      setSearchTerm(formattedString);
    }
    if (value?.length > 0) {
      const filteredSuggestions = accountData
        .filter(
          (account) =>
            account.Account_name.toLowerCase().includes(value) ||
            account.Fund_account_id.toLowerCase().includes(value) ||
            account.Dealer_account_id.toLowerCase().includes(value)
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

  function handleSelectedFundAccTable(fundId, e) {
    // console.log(fundId, e);
    const newSelected = {
      ...selectedFundId,
      [fundId]: e.target.checked, // Directly use fundId as the key
    };
    setSelectedFundId(newSelected);
  }
  return (
    <FundContext.Provider
      value={{
        selectedFundId,
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
        handleSelectedFundAccTable,
        accountData,
        handleSelectedAccount,
        handleSelectedFundAccount,

        // getTransactionsInfo,
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
