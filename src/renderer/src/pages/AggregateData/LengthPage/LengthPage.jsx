import videoData from '@/data/videoData.json';  // ここに時間データが格納されていると仮定
import styles from './LengthPage.module.css';
import Header from '@/components/Header/Header';  // Headerコンポーネントをインポート

// Helper function to convert length to total seconds
const processLength = (lengthStr) => {
  // 全角数字を半角に変換し、「分」と「秒」を処理
  const normalizedStr = lengthStr
    .replace(/[０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)) // 全角数字 → 半角
    .replace('分', '分') // ここは分を半角に変換
    .replace('秒', '秒'); // 秒も半角に

  // 正規表現で「X分 Y秒」を取得
  const match = normalizedStr.match(/(\d+)\s*分\s*(\d+)\s*秒/);

  if (match) {
    const minutes = parseInt(match[1]); // 分
    const seconds = parseInt(match[2]); // 秒
    return minutes * 60 + seconds; // 秒に変換して返す
  } else {
    // フォーマットが合わない場合はNaNを避けるために0秒を返す
    console.error(`Invalid length format: ${lengthStr}`);
    return 0;
  }
};

const LengthPage = () => {
  // トップ10の動画を抽出して、秒数に変換
  const chartData = videoData
    .map((video) => ({
      title: video.title,
      lengthInSeconds: processLength(video.length),  // "length"を秒に変換
    }))
    .sort((a, b) => b.lengthInSeconds - a.lengthInSeconds)  // 長さ順にソート（長い順）
    .slice(0, 10);  // トップ10を取得

  return (
    <div className={styles.container}>
      {/* Headerコンポーネントを追加 */}
      <Header title="視聴した動画の長さランキング" />

      {/* ランキング表示 */}
      <div className={styles.rankings}>
        <h2>動画の長さ ランキング (Top 10)</h2>
        <ul>
          {chartData.map((video, index) => (
            <li key={index} className={styles.rankItem}>
              <span className={styles.rankNumber}>{index + 1}</span>
              <span className={styles.rankTitle}>{video.title}</span>
              <span className={styles.rankLength}>{video.lengthInSeconds} 秒</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LengthPage;
