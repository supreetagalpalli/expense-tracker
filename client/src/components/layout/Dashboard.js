import React from "react";
import Expenses from "../expenses/Expenses";
import Sidebar from "../layout/Sidebar";

export default () => {
  return (
    <div className="row">
      <div className="col-md-2">
        <br />
      </div>
      <div className="col-md-8">
        <Expenses />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
};
