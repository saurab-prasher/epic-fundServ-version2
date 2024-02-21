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
  const fetchTransactionData = async (selectedFundIds) => {
    try {
      const response = await fetch("/suncrestFiles/xx_transaction.json");
      const transactionsData = await response.json();

      // Assuming selectedFundIds is an object with composite keys,
      // extract just the Fund_id part if needed. If it's already an array of Fund_id values, adjust as necessary.
      const fundIds = Object.keys(selectedFundIds).map((key) => {
        // Example extraction, adjust based on your composite key structure
        // If your key is something like `Fund_id-Class`, adjust the splitting logic accordingly.
        return key.split("-")[0]; // Adjust this line based on your actual composite key format.
      });

      // Filter transactions based on extracted fund IDs
      const filteredTransactions = transactionsData.filter((transaction) =>
        fundIds.includes(transaction.Fund_id)
      );

      // Set the filtered transactions data
      setTransactionsData(filteredTransactions);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  const handleSelectedAccount = (value, type) => {
    if (type === "name") {
      accountInfoData.forEach((account) => {
        if (account.Account_name.toLowerCase() === value.toLowerCase()) {
          setAccountInfo(account);
          setFundAccountId(account.Fund_account_id);
          // Find and set the dealer account based on the fund account ID
          const dealerAccount = fundDealerAccountData.find(
            (da) => da.Fund_account_id === account.Fund_account_id
          );
          if (dealerAccount) {
            setDealerAccountId(dealerAccount.Dealer_account_id); // Directly set dealer account ID
          }
        }
      });
    } else if (type === "fundAccountId") {
      if (value.trim() === "") {
        // Clear related fields when Fund Account ID is empty
        setFundAccountId("");
        setDealerAccountId("");
        setAccountInfo({});
        // Add any other related fields that should be cleared
      } else {
        // Handle non-empty fund account ID selection
        setFundAccountId(value);
        // Assuming handleSelectedFundAccount does more than just set the fund account ID,
        // like fetching related data, keep this call here.
        handleSelectedFundAccount(value);
      }
    } else if (type === "dealerAccountId") {
      if (value.trim() === "") {
        setFundAccountId("");
        setDealerAccountId("");
        setAccountInfo({});
      } else {
        setDealerAccountId(value);
        handleSelectedDealerAccount(value);
      }
    }
  };

  function loadDataIntoFundsTable() {
    const data = allData?.filter(
      (account) => account.Fund_account_id === fundAccountId
    );
    setFilteredData(data);
  }

  const handleSelectedFundAccount = (value) => {
    setTransactionsData([]);
    setSelectedFundId({});

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

    handleCheckboxState();
  };

  const handleSelectedDealerAccount = (value) => {
    // Find the corresponding fund account ID from your dataset

    console.log("dealer account id: ", value);
    setTransactionsData([]);
    setSelectedFundId({});
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
    handleCheckboxState();
  };

  function handleSearchTerm(value) {
    setSearchTerm(value);
  }
  function handleSearch(value) {
    // console.log(formattedString);
    setTransactionsData([]);
    setSelectedFundId({});

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

    handleCheckboxState();
  }

  function handleSuggestions(suggestions) {
    setSuggestions(suggestions);
  }

  function createCompositeKey(item) {
    return `${item.Fund_id}-${item.Fund_class}`;
  }

  function handleCheckboxState() {
    // Uncheck all checkboxes by targeting them by class or any other selector
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }
  function handleSelectedFundAccTable(item, e) {
    const isChecked = e.target.checked;
    const compositeKey = createCompositeKey(item);

    setSelectedFundId((prevSelectedFundId) => {
      const newSelected = { ...prevSelectedFundId };
      if (isChecked) {
        newSelected[compositeKey] = true;
      } else {
        delete newSelected[compositeKey];
      }
      return newSelected;
    });
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
        setSelectedFundId,
        // getTransactionsInfo,
        handleSelectedDealerAccount,
        createCompositeKey,
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
