import AccoundFundsTable from "../account/AccoundFundsTable";
import AccountDetails from "../account/AccountDetails";
import AccountLookup from "../account/AccountLookup";
import AccountTransactionsTable from "../account/AccountTransactionsTable";

const FundAccountPage = () => {
  return (
    <>
      <div className='mx-auto w-fit '>
        <div className='py-8'>
          <div className='container mx-auto'>
            <div className='flex gap-16'>
              <AccountLookup />
              <AccountDetails />
            </div>
            <AccoundFundsTable />
          </div>
          <AccountTransactionsTable />
        </div>
      </div>
    </>
  );
};

export default FundAccountPage;
