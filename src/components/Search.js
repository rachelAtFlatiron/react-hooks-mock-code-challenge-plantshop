import React, { useState } from "react";

function Search({ updatePlantsToDisplay, search, handleSetSearch }) {

  const handleOnChange = (e) => {
    handleSetSearch(e.target.value) //passed to plantPage
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        value={search}
        onChange={handleOnChange}
        type="text"
        id="search"
        placeholder="Type a name to search..."
        
      />
    </div>
  );
}

export default Search;
