import React from "react";
import "./searchItems.css";

const SearchItems = ({ data }) => {
  return (
    <div>
      {data &&
        data.map((item) => {
          return <div key={item.id}>data</div>;
        })}
    </div>
  );
};

export default SearchItems;
