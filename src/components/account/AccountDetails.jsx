import { useContext } from "react";
import { FundContext } from "../../contexts/FundContext";
const AccountDetails = () => {
  const { accountInfo } = useContext(FundContext);
  return (
    <>
      <div className='container mx-auto flex flex-col'>
        <h2 className='text-2xl font-semibold leading-tight mb-6'>
          Accounts Details
        </h2>
        <div className='pb-8 mb-4 w-full bg-[#c8d8e4] p-8 px-12 rounded-md'>
          <div className='mb-4'>
            <div className='flex flex-col content-between  gap-6  mb-4'>
              <div className=''>
                <label>Name</label>
                <p className='text-gray-700 py-3  border-b w-full leading-tight text-left text-sm bg-white px-3'>
                  {accountInfo?.Account_name || "N/A"}
                </p>
              </div>
              <div className=''>
                <label> Address</label>
                <p className='text-gray-700 border-b py-3 w-full leading-tight text-sm bg-white px-3'>
                  {[
                    accountInfo?.Account_address,
                    accountInfo?.Account_city,
                    accountInfo?.Account_prov,
                    accountInfo?.Account_postal,
                  ]
                    .filter(Boolean)
                    .join(", ") || "N/A"}
                </p>
              </div>
              <div className=''>
                <label>Email</label>
                <p className='text-gray-700 border-b py-3 w-full leading-tight text-sm bg-white px-3'>
                  {`${accountInfo?.Account_email || "no email found"} `}
                </p>
              </div>
              <div className=''>
                <label>Phone</label>

                <p className='text-gray-700 border-b py-3 w-full leading-tight text-sm bg-white px-3'>
                  {accountInfo?.Account_phone
                    ? accountInfo.Account_phone
                    : "no contact info found"}
                </p>
              </div>
              <div className=''>
                <label>Type</label>
                <p className=' text-gray-700 border-b py-3 w-full  leading-tight text-sm bg-white px-3'>
                  {accountInfo?.Account_type || "N/A"}
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
