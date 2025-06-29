// BuwattoButton.jsx
import PropTypes from 'prop-types';
import styles from './BuwattoButton.module.css';

const BuwattoButton = ({ children, onClick, variant = 'default' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      alert('クリックされました！');
    }
  };

  const buttonClass = variant === 'tool' ? `${styles.button} ${styles.toolButton}` : styles.button;

  return (
    <button className={buttonClass} onClick={handleClick}>
      {children}
    </button>
  );
};

// ✅ props の型を定義してESLint警告を解消
BuwattoButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'tool'])
};

export default BuwattoButton;
