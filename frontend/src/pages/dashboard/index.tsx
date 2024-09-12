import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { MainContextProvider } from "../../contexts/mainContextProvider";

export default function Dashboard() {
  const width = ["w-[20%]", "w-[80%]"];
  return (
    <MainContextProvider>
      <div className="flex items-stretch justify-start">
        <div className={`${width[0]}`}>
          <Sidebar sidebarWidth={width[0]} />
        </div>
        <div className={`${width[1]}`}>
          <Header />
          <Outlet />
        </div>
      </div>
    </MainContextProvider>
  );
}
