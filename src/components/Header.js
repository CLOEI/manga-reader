import styles from '../style/components/header.module.scss';

const Header = ({ children, style }) => {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
};

export default Header;
