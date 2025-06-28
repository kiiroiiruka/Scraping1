import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import videoData from '@/data/videoData.json';
import styles from './TagsPage.module.css';
import Header from '@/components/Header/Header';

// 色設定（必要に応じて追加）
const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57', '#d88884',
  '#c6bfff', '#a8e6cf', '#ffb347', '#f4a460'
];

// データ集計
const aggregateByTag = (data) => {
  return data.reduce((acc, video) => {
    video.tag.forEach((tag) => {
      const existingTag = acc.find((item) => item.name === tag);
      if (existingTag) {
        existingTag.value += video.views;
      } else {
        acc.push({ name: tag, value: video.views });
      }
    });
    return acc;
  }, []);
};

// パーセンテージ表示用ラベル関数
const renderLabel = ({ percent, cx, cy, midAngle, innerRadius, outerRadius }) => {
  const threshold = 0.05; // 5%以上のセグメントのみ表示

  if (percent < threshold) return null;

  // 中央の位置を計算
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const RADIAN = Math.PI / 180;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {(percent * 100).toFixed(1)}%
    </text>
  );
};

const TagsPage = () => {
  const chartData = aggregateByTag(videoData);
  const totalViews = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.container}>
      <Header title="タグ別視聴回数グラフ" />

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {/* 円グラフ部分 */}
        <ResponsiveContainer width="60%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={190}
              label={renderLabel}  // ラベルにパーセンテージを表示
              labelLine={false}    // ラベルの線を非表示
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* 凡例・詳細（右側） */}
        <div style={{ width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 16 }}>
          {chartData.map((entry, index) => {
            const percent = (entry.value / totalViews) * 100;
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <div style={{
                  width: 16,
                  height: 16,
                  backgroundColor: COLORS[index % COLORS.length],
                  marginRight: 8,
                  flexShrink: 0
                }} />
                <div>
                  <div>{entry.name}</div>
                  <div style={{ fontSize: '0.9em', color: '#666' }}>
                    {percent.toFixed(1)}%（{entry.value.toLocaleString()} 回）
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TagsPage;
