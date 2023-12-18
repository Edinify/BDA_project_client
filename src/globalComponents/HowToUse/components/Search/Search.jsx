import React from "react";
import "./search.css";
import { ReactComponent as SearchIcon } from "../../../../assets/icons/search-normal-20.svg";

const Search = () => {
  return (
      <div className="input-box">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input type="text" placeholder="Axtar" />
      </div>
  );
};

export default Search;
