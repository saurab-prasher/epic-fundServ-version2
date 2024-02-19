import { createContext, useState } from "react";

export const FundContext = createContext();

export const FundProvider = ({ children }) => {
  const [fundData, setFundData] = useState([]);
  const [dealerData, setDealerData] = useState([]);
  const [accountDataNames, setAccountNames] = useState([]);
  const [allData, setAllData] = useState([]);
  const [dealerAccountId, setDealerAccountId] = useState("");
  const [accountLookupData, setAccountLookupData] = useState([]);
  const [fundAccountId, setFundAccountId] = useState("");

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
    const { Dealer_account_id, Fund_account_id } = await response.json();

    setFundData(Fund_account_id);
    setDealerData(Dealer_account_id);
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

  const handleSelectedAccountByName = (name) => {
    setAccountName(name);
    showSelectedFundAccount({ name: name });
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

  function showSelectedFundAccount(value) {
    const { name } = value;

    accountInfoData.forEach((account) => {
      if (account.Account_name.toLowerCase() == name.toLowerCase()) {
        setAccountInfo(account);
        setFundAccountId(account.Fund_account_id);
      }
    });

    // let localAccountNameSet = new Set();
    // accountLookupData.forEach((account) => {
    //   if (
    //     account.Fund_account_id === fundAccountId &&
    //     account.Dealer_account_id == dealerAccountId
    //   )
    //     account.Account_lu.split(" ").forEach((value) =>
    //       localAccountNameSet.add(value)
    //     );
    // });
    // setAccountName([...localAccountNameSet]);
    // const filteredData = allData?.filter((account) => {
    //   const accountFundID = account.Fund_account_id;
    //   return [...localAccountNameSet].some((value) =>
    //     value.includes(accountFundID)
    //   );
    // });
    // setFilteredData(filteredData);
  }

  function loadDataIntoFundsTable() {
    const data = allData?.filter(
      (account) => account.Fund_account_id == fundAccountId
    );

    setFilteredData(data);
  }

  const handleSelectedFundAccount = (e) => {
    const value = e.target.value;
    setFundAccountId(value);
  };

  const handleSelectedDealerAccount = (e) => {
    const value = e.target.value;
    setDealerAccountId(value);
  };
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

        fetchAccountDataNames,
        accountDataNames,
        handleSelectedAccountByName,
        handleSelectedFundAccount,
        getAccountInfo,
        getTransactionInfo,
        handleSelectedDealerAccount,
        showSelectedFundAccount,
        fetchAllData,
        loadDataIntoFundsTable,
      }}
    >
      {children}
    </FundContext.Provider>
  );
};
