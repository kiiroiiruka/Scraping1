import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header({ title }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);  // 履歴を1つ戻る（React Nativeのrouter.back()と同じ）
  };

  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={handleBack}>戻る</button>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}

export default Header;
