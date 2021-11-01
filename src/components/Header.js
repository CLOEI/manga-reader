const Header = ({ children, style }) => {
  return (
    <div className="header-container" style={style}>
      {children}
    </div>
  );
};

export default Header;
