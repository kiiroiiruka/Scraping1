import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import videoData from '@/data/videoData.json';
import styles from './PublishedPage.module.css';
import Header from '@/components/Header/Header';

// Helper: "1 日前", "2 か月前" など → 投稿日（Dateオブジェクト）に変換
const convertToDate = (publishedStr) => {
  const now = new Date();
  const normalized = publishedStr.replace(/[０-９]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)
  );

  const match = normalized.match(/(\d+)\s*(分|時間|日|か月|年)前/);
  if (!match) return now;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const date = new Date(now);

  switch (unit) {
    case '分':
      date.setMinutes(now.getMinutes() - value);
      break;
    case '時間':
      date.setHours(now.getHours() - value);
      break;
    case '日':
      date.setDate(now.getDate() - value);
      break;
    case 'か月':
      date.setMonth(now.getMonth() - value);
      break;
    case '年':
      date.setFullYear(now.getFullYear() - value);
      break;
  }

  return date;
};

// 投稿時期別（何日前〜）にカウント
const groupByTimeRange = () => {
  const ranges = [
    { label: '数日前（3日以内）', maxDays: 3 },
    { label: '1週間以内', maxDays: 7 },
    { label: '1か月以内', maxDays: 30 },
    { label: '3か月以内', maxDays: 90 },
    { label: '6か月以内', maxDays: 180 },
    { label: '1年以内', maxDays: 365 },
    { label: '3年以内', maxDays: 1095 },
    { label: 'それ以前', maxDays: Infinity },
  ];

  const counts = Object.fromEntries(ranges.map(range => [range.label, 0]));
  const now = new Date();

  videoData.forEach(video => {
    const publishedDate = convertToDate(video.published);
    const diffDays = Math.floor((now - publishedDate) / (1000 * 60 * 60 * 24));

    for (const range of ranges) {
      if (diffDays <= range.maxDays) {
        counts[range.label]++;
        break;
      }
    }
  });

  return ranges.map(range => ({
    range: range.label,
    count: counts[range.label],
  }));
};

const PublishedPage = () => {
  const chartData = groupByTimeRange(); // ← LengthPageのデータ

  return (
    <div className={styles.container}>
      <Header title="投稿時期ごとの動画数" />

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" angle={-30} textAnchor="end" interval={0} height={80} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PublishedPage;
