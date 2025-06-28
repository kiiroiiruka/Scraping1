import videoData from '@/data/videoData.json';
import styles from './ViewsPage.module.css';
import Header from '@/components/Header/Header';  // Headerコンポーネントをインポート

const ViewsPage = () => {
  // videoDataの中からトップ1〜10までのデータだけを抽出
  const chartData = videoData
    .map((video) => ({
      title: video.title,
      views: video.views,
    }))
    .sort((a, b) => b.views - a.views) // 視聴回数の降順でソート
    .slice(0, 10); // 1位〜10位を抽出

  return (
    <div className={styles.container}>
      {/* Headerコンポーネントを追加 */}
      <Header title="視聴した動画の再生回数ランキング" />

      {/* ランキング表示 */}
      <div className={styles.rankings}>
        <h2>視聴回数 ランキング (Top 10)</h2>
        <ul>
          {chartData.map((video, index) => (
            <li key={index} className={styles.rankItem}>
              <span className={styles.rankNumber}>{index + 1}</span>
              <span className={styles.rankTitle}>{video.title}</span>
              <span className={styles.rankViews}>{video.views} views</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewsPage;
