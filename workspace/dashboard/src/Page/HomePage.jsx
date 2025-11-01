import AsidebarComponent from "./Components/AsidebarComponent";
import MainContentComponent from "./Components/MainContentComponent";
import SidebarComponent from "./Components/SidebarComponent";
import "./Style/App.css";

const HomePage = () => {
  return (
    <div className="app">
      <div className="sidebar">
        <SidebarComponent />
      </div>
      <div className="main-content">
        <MainContentComponent />
      </div>
      <div className="aside-bar">
        <AsidebarComponent />
      </div>
    </div>
  );
};

export default HomePage;
