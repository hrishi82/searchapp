import { useState, useEffect, useRef } from "react";
import { SearchCard } from "./SearchCard";

export const SearchResult = ({ searchParams, cursor, setDataFromHover, eventType, setCursor }) => {
  const highlightTextHandler = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="highlighted-word">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  if (
    searchParams.freshLoad === false &&
    searchParams.searchResult.length === 0
  ) {
    return (
      <div className="searchbar-search-result-container no-results-found-card">
        <h5>No results found!</h5>
      </div>
    );
  } else if (
    searchParams.freshLoad === true &&
    searchParams.searchResult.length === 0
  ) {
    return null;
  } else {
    return (
      <div className="searchbar-search-result-container">
        <ul className="search-result-table">
          {searchParams.searchResult.map((userData, i) => {
            return (
              <li className="search-result-li" key={userData?.id}>
                <SearchCard
                  active={cursor === i}
                  searchParams={searchParams}
                  userData={userData}
                  highlightTextHandler={highlightTextHandler}
                  setDataFromHover={setDataFromHover}
                  eventType={eventType}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};
