import React from "react";

const Search = ({ value, setValue }) => {
  return (
    <div className="container">
      <input
        className="search"
        onChange={(e) => setValue(e.currentTarget.value)}
        type="search"
        value={value}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
