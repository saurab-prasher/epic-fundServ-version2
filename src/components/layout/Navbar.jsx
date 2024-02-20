import { Link } from "react-router-dom";
import logo from "../../assets/Images/EPIC_normal.png";

const Navbar = () => {
  return (
    <header className="bg-[#2b6777] text-white flex justify-between">
      <div className="flex py-2 px-4 mt-8">
        {/* Logo*/}
        <div className="">
          <img className="w-[90px] h-[94px]" src={logo} />
        </div>
        {/* Navigation Links */}
        <nav className="">
          <div className="h-8 text-white text-[25px] font-normal font-['Balsamiq Sans'] leading-normal pl-8 pb-16">
            EPIC/ FundServ
          </div>

          <Link
            to="/"
            className="text-white text-xl font-normal font-['Balsamiq Sans'] leading-normal pl-8"
          >
            Home
          </Link>
          <Link
            to="/accounts"
            className="text-white text-xl font-normal font-['Balsamiq Sans'] leading-normal pl-8"
          >
            Accounts
          </Link>
          <Link
            to="/transactions"
            className="text-white text-xl font-normal font-['Balsamiq Sans'] leading-normal pl-8"
          >
            Transactions
          </Link>
          <Link
            to="/nav"
            className="text-white text-xl font-normal font-['Balsamiq Sans'] leading-normal pl-8"
          >
            Nav
          </Link>
          <Link
            to="/distribution"
            className="text-white text-xl font-normal font-['Balsamiq Sans'] leading-normal pl-8"
          >
            Distribution
          </Link>
          <Link
            to="/fundserv"
            className="text-white text-xl font-normal font-['Balsamiq Sans'] leading-normal pl-8"
          >
            FundServ
          </Link>
        </nav>
      </div>
      <div className="py-2 px-4 flex flex-col items-end">
        {/* Right-aligned links */}
        <div className="float-right flex items-center">
          <a className="mx-2" href="/about">
            About
          </a>
          <a className="mx-2" href="/contact">
            Contact
          </a>
          <a className="mx-2" href="/help">
            Help
          </a>
          <button className="w-24 h-8 bg-white flex items-center pl-4 text-black text-xl font-normal font-['Balsamiq Sans'] leading-normal">
            Log out
          </button>
        </div>
        <span className="mt-8">Welcome User01</span>
      </div>
    </header>
  );
};

export default Navbar;
