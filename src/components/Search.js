import React from "react";

function Search({ updateSearch, search }) {

  //don't forget to make form controlled
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        // value/what the user sees is relying on react state
        value={search} 
        placeholder="Type a name to search..."
        onChange={(e) => updateSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
