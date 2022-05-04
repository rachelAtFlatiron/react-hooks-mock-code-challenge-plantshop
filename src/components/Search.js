import React from "react";

function Search({ filterPlants, filter }) {

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        value={filter}
        placeholder="Type a name to search..."
        onChange={(e) => filterPlants(e.target.value)}
      />
    </div>
  );
}

export default Search;
