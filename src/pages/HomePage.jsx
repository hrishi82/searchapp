import { Search } from "../components/search/Search";
import "./homepage.css"
export const HomePage = () => {
  return (
    <div className="homepage-container">
      <p className="homepage-infotext">Search for words like: "john" or numbers like 1</p>
      <Search />
    </div>
  );
};
