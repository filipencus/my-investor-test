import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
