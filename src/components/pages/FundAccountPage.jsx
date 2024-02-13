import AccoundFundsTable from "../account/AccoundFundsTable";
import AccountDetails from "../account/AccountDetails";

const FundAccountPage = () => {
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div>
            <h2 className='text-2xl font-semibold leading-tight mb-6'>
              Accounts
            </h2>
          </div>

          <AccoundFundsTable />
        </div>
      </div>
    </>
  );
};

export default FundAccountPage;
