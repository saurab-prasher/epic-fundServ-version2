import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
          <h1 className='text-xl font-bold'>EPIC/FundServ</h1>
          <div className='flex items-center gap-2'>
            <button className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md text-sm px-5 py-2.5'>
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className='bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex space-x-4 py-3'>
            <Link
              to='/'
              className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
            >
              Home
            </Link>
            <Link
              to='/accounts'
              className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
            >
              Accounts
            </Link>
            <Link
              to='transactions'
              className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
            >
              Transactions
            </Link>
            <Link
              to='NAV'
              className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
            >
              NAV
            </Link>
            <Link
              to='distribution'
              className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
            >
              Distribution
            </Link>
            <Link
              to='#'
              className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
            >
              FundServ
            </Link>
            <Link
              to='about'
              className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
