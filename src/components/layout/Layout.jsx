import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{children}</main>
    </div>
  );
};

export default Layout;
