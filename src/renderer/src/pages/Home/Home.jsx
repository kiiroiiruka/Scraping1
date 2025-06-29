import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import BuwattoButton from '@/components/BuwattoButton/BuwattoButton';

// 📷 画像インポート
import viewsImg from '@/assets/images/views.svg';
import lengthImg from '@/assets/images/length.svg';
import publishedImg from '@/assets/images/published.svg';
import tagsImg from '@/assets/images/tags.svg';

function Home() {
  const navigate = useNavigate();

  const buttons = [
    { label: '視聴回数\nランキング', path: '/ViewsPage', image: viewsImg },
    { label: '動画の長さ\nランキング', path: '/LengthPage', image: lengthImg },
    { label: '公開時間\nグラフ', path: '/PublishedPage', image: publishedImg },
    { label: 'タグごとの分布\nグラフ', path: '/TagsPage', image: tagsImg },
  ];

  const handleLaunchExe = async () => {
    try {
      // メインプロセスにexeファイル起動を要求
      const result = await window.electronAPI.launchExe();
      if (result.success) {
        console.log(result.message);
        // 成功した場合の処理（例：通知表示など）
      } else {
        console.error(result.message);
        alert(`エラー: ${result.message}`);
      }
    } catch (error) {
      console.error('exeファイルの起動に失敗しました:', error);
      alert('exeファイルの起動に失敗しました');
    }
  };

  const handleSetUserdata = async () => {
    try {
      // メインプロセスにユーザーデータセット用exeファイル起動を要求
      const result = await window.electronAPI.setUserdata();
      if (result.success) {
        console.log(result.message);
        // 成功した場合の処理（例：通知表示など）
      } else {
        console.error(result.message);
        alert(`エラー: ${result.message}`);
      }
    } catch (error) {
      console.error('ユーザーデータセット用exeファイルの起動に失敗しました:', error);
      alert('ユーザーデータセット用exeファイルの起動に失敗しました');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>後で見るリスト</h1>
      <p className={styles.description}>あなたのためた動画を整理しよう</p>

      <h2 className={styles.subtitle}>📊 データ集計ページへ移動</h2>
      <div className={styles.grid}>
        {buttons.map((btn, i) => (
          <BuwattoButton key={i} onClick={() => navigate(btn.path)}>
            <div className={styles.buttonContent}>
              <img src={btn.image} alt={btn.label} className={styles.image} />
              <span>{btn.label}</span>
            </div>
          </BuwattoButton>
        ))}
      </div>

      <h2 className={styles.subtitle}>🔧 ツール起動</h2>
      <div className={styles.toolGrid}>
        <BuwattoButton onClick={handleLaunchExe} variant="tool">
          <div className={styles.toolButtonContent}>
            <img src={viewsImg} alt="情報を取得する" className={styles.toolImage} />
            <span>情報を取得する</span>
          </div>
        </BuwattoButton>
        <BuwattoButton onClick={handleSetUserdata} variant="tool">
          <div className={styles.toolButtonContent}>
            <img src={tagsImg} alt="ユーザーデータをセットする" className={styles.toolImage} />
            <span>ユーザーデータを\nセットする</span>
          </div>
        </BuwattoButton>
      </div>
    </div>
  );
}

export default Home;
