import React from "react";
import PublicNavBar from "../../navbar/PublicNavbar";
import PublicSearchBar from "../../searchbar/PublicSearchbar";

const PublicHomeComponent = () => {
  return (
    <div>
      <PublicNavBar />
      <PublicSearchBar />

      {/* logged in content has to be different*/}
      {/*  */}
      <h1>Home</h1>
    </div>
  );
};
export default PublicHomeComponent;
