// src/pages/Home.jsx
import styles from './Home.module.css'

function Home() {
  const handlePing = () => {
    window.electron.ipcRenderer.send('ping')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ホームページ</h1>
      <p className={styles.description}>これはElectron + React + React Routerで作られたホーム画面です。</p>
      <button className={styles.button} onClick={handlePing}>
        IPCメッセージを送信
      </button>
    </div>
  )
}

export default Home
