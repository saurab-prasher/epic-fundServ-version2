import AccoundFundsTable from "../account/AccoundFundsTable";
import AccountDetails from "../account/AccountDetails";
import AccountLookup from "../account/AccountLookup";

const FundAccountPage = () => {
  return (
    <>
      <div className='container mx-auto px-4 '>
        <div className='py-8'>
          <div className='flex gap-16'>
            <AccountLookup />
            <AccountDetails />
          </div>
          <AccoundFundsTable />
        </div>
      </div>
    </>
  );
};

export default FundAccountPage;
