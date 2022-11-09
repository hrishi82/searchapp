import "./search.css";
import { useState, useEffect } from "react";
import { SearchResult } from "./searchResult/SearchResult";
import { searchFilter } from "../../utils/utilityFunctions";
import axios from "axios";
import { useKeyPress } from "../../utils/utilityFunctions";

export const Search = () => {
  const [userData, setUserData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    freshLoad: true,
    searchActive: false,
    searchQuery: "",
    searchResult: [],
  });
  const [cursor, setCursor] = useState(0);
  const [dataFromHover, setDataFromHover] = useState(undefined);
  const [eventType, setEventType] = useState("");

  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");

  const searchHandler = (e) => {
    let stringToMatch = e.target.value;
    let filteredResult = searchFilter(userData, stringToMatch);
    setSearchParams({
      ...searchParams,
      freshLoad: false,
      searchQuery: stringToMatch,
      searchResult: filteredResult,
    });
  };

  useEffect(() => {
    if (searchParams.searchResult.length && downPress) {
      setCursor((prevState) =>
        prevState < searchParams.searchResult.length - 1
          ? prevState + 1
          : prevState
      );
      setEventType("keydown");
      setDataFromHover(undefined);
    }
  }, [downPress, searchParams.searchResult]);

  useEffect(() => {
    if (searchParams.searchResult.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
    setEventType("keyup");
    setDataFromHover(undefined);
  }, [upPress, searchParams.searchResult]);

  useEffect(() => {
    if (searchParams.searchResult.length && dataFromHover) {
      setCursor(searchParams.searchResult.indexOf(dataFromHover));
    }
    setEventType("hover");
  }, [dataFromHover, searchParams.searchResult]);


  useEffect(() => {
    const handler = () => {
      setEventType("hover");
    }
    window.addEventListener("mouseover", handler);
    return () => {
      window.removeEventListener("mouseover", handler);
    };
  });

  useEffect(() => {
    (async () => {
      let response = await axios.get(
        "http://www.mocky.io/v2/5ba8efb23100007200c2750c"
      );
      if (response.status === 200) {
        setUserData(response.data);
      }
    })();
  }, []);

  return (
    <>
      <div className="searchbar-container">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search.."
            name="search-bar"
            className="search-bar"
            value={searchParams.searchQuery}
            onChange={(e) => {
              searchHandler(e);
            }}
          />
          {searchParams.searchResult.length === 0 ? (
            <button className="search-bar-btn">
              <i className="fas fa-search"></i>
            </button>
          ) : (
            <button
              className="search-bar-btn"
              onClick={() => {
                setSearchParams({
                  ...searchParams,
                  freshLoad: true,
                  searchActive: false,
                  searchQuery: "",
                  searchResult: [],
                });
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <SearchResult
          searchParams={searchParams}
          cursor={cursor}
          setDataFromHover={setDataFromHover}
          eventType={eventType}
          setCursor={setCursor}
        />
      </div>
    </>
  );
};
