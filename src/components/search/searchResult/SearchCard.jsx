import { useState, useEffect, useRef } from "react";

export const SearchCard = ({
  active,
  userData,
  searchParams,
  highlightTextHandler,
  setDataFromHover,
  eventType
}) => {
  const searchCardRef = useRef(null);

  useEffect(()=>{
    if(active && eventType !== "hover"){
        searchCardRef.current.scrollIntoView({block:'nearest', behavior: "smooth"});
    }
  },[active, eventType]);


  const hoverHandler = ()=>{
    if(eventType==="hover" && !active){
        setDataFromHover(userData)
    }
  }

  return (
    <div
      key={userData?.id}
      className={`search-result-card ${active ? "active" : null}`}
      onMouseOver={hoverHandler}
      ref={searchCardRef}
    >
      <h4 className="search-result-card-id">
        {highlightTextHandler(userData.id, searchParams?.searchQuery)}
      </h4>
      <h5 className="search-result-card-name">
        {highlightTextHandler(userData.name, searchParams?.searchQuery)}
      </h5>

      <ul>
        {userData.items.map((item) => {
          let found = item
            ?.toLowerCase()
            ?.includes(searchParams?.searchQuery?.toLowerCase());
          if (searchParams?.searchQuery === "") {
            return null;
          } else {
            return found ? (
              <li key={item}>
                <span className="highlighted-word">
                  {searchParams?.searchQuery}
                </span>{" "}
                found in items
              </li>
            ) : null;
          }
        })}
      </ul>

      <p className="search-result-card-address">
        {highlightTextHandler(userData.address, searchParams?.searchQuery)}
      </p>

      <h5 className="search-result-card-pin">
        {highlightTextHandler(userData.pincode, searchParams?.searchQuery)}
      </h5>
    </div>
  );
};
