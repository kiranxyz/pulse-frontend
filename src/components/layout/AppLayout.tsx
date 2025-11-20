import { Outlet, useNavigation } from "react-router";

import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      <Header />
      {isLoading && <div className="loading-indicator">Loading...</div>}
      <Outlet />
      <Footer />
    </div>
  );
}
