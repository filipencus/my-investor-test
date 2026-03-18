import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import styles from "./Layout.module.css";

export default function RootLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main id="main-content" className={styles.padding}>
        <Outlet />
      </main>
    </div>
  );
}
