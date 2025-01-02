import React from "react";
import styles from "./home.module.scss";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className={styles.navbar}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default HomeLayout;
