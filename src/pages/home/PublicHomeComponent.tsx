import React from "react";
import PublicNavBar from "../../navbar/PublicNavbar";

const PublicHomeComponent = () => {
  return (
    <div>
      <PublicNavBar />
      {/* anonymous content up to here */}


      {/* logged in content has to be different*/}
      {/*  */}
      <h1>Home</h1>
    </div>
  );
};
export default PublicHomeComponent;
