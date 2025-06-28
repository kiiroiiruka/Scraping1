// src/pages/About.jsx
import styles from './About.module.css'

function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>アバウトページ</h1>
      <p className={styles.text}>
        このアプリは、Electron と React を使って構築され、React Router によってページ遷移を管理しています。
      </p>
    </div>
  )
}

export default About
