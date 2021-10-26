import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;
