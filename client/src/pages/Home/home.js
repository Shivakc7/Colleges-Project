import './home.css'
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import TopNavBar from "../../components/TopNavBar/topNavBar";

const Home = () => {
  return (
    <>
      <TopNavBar />
      <div className="home-container">
        <Leftbar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
