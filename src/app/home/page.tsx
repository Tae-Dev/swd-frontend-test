'use client';
import { useRouter } from 'next/navigation'
import styles from "./home.module.scss";

function HomePage() {
  const router = useRouter()
  return (
    <div className={styles.container_box}>
    <div className={styles.card} onClick={() => router.push('/home/web-management')}>
      <p className={styles.title}>Test 1</p>
      <p className={styles.description}>Layout & Style</p>
    </div>
    <div className={styles.card} onClick={() => router.push('/home/user-management')}>
      <p className={styles.title}>Test 2</p>
      <p className={styles.description}>Form & Table</p>
    </div>
  </div>
  );
}

export default HomePage;
