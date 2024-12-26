import React from "react";
import styles from "./home.module.scss";
import { Card } from "antd";

function HomePage() {
  return (
    <div className={styles.container_box}>
    <div className={styles.card}>
      <p className={styles.title}>แบบทดสอบที่ 1</p>
      <p className={styles.description}>การจัดการหน้าเว็บ</p>
    </div>
    {/* <div className={styles.card}>
      <p>แบบทดสอบที่ 2</p>
      <p>การจัดการหน้าฟอร์ม</p>
    </div> */}
  </div>
  );
}

export default HomePage;
