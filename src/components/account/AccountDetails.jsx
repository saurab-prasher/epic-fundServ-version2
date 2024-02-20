import { useContext } from "react";
import { FundContext } from "../../contexts/FundContext";
const AccountDetails = () => {
  const { accountInfo } = useContext(FundContext);
  return (
    <>
      <div className='container mx-auto w-96'>
        <h2 className='text-2xl font-semibold leading-tight mb-6'>
          Accounts Details
        </h2>
        <div className='pb-8 mb-4'>
          <div className='mb-4'>
            <div className='flex flex-col content-between gap-6  mb-4'>
              <div className=' flex items-center gap-10 px-3 mb-6 md:mb-0'>
                <label>Name</label>
                <p className=' text-gray-700 py-3 border-b w-full leading-tight text-sm'>
                  {accountInfo?.Account_name}
                </p>
              </div>
              <div className=' flex items-center gap-10  px-3 mb-6 md:mb-0'>
                <label>Address</label>
                <p className=' text-gray-700 border-b py-3 w-full leading-tight text-sm'>
                  {accountInfo?.Account_address},{accountInfo?.Account_city},{" "}
                  {accountInfo?.Account_prov}, {accountInfo?.Account_postal}
                </p>
              </div>
              <div className=' flex items-center gap-10  px-3 mb-6 md:mb-0'>
                <label>Email</label>
                <p className=' text-gray-700 border-b py-3 w-full leading-tight text-sm'>
                  {`${accountInfo?.Account_email || "no email found"} `}
                </p>
              </div>
              <div className=' flex items-center gap-10  px-3 mb-6 md:mb-0'>
                <label>Phone</label>
                <p className=' text-gray-700 border-b py-3 w-full leading-tight text-sm'>
                  {`${accountInfo?.Account_phone || "no contact info found"} `}
                </p>
              </div>
              <div className=' flex items-center gap-10  px-3 mb-6 md:mb-0'>
                <label>Type</label>
                <p className=' text-gray-700 border-b py-3 w-full leading-tight text-sm'>
                  {accountInfo?.Account_type}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
