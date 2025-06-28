// BuwattoButton.jsx
import PropTypes from 'prop-types';
import styles from './BuwattoButton.module.css';

const BuwattoButton = ({ children, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      alert('クリックされました！');
    }
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {children}
    </button>
  );
};

// ✅ props の型を定義してESLint警告を解消
BuwattoButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

export default BuwattoButton;
