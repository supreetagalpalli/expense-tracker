import React from "react";
import { Link } from "react-router-dom";
export default () => {
  return (
    <Link to="/add" className="btn btn-success btn-black">
      <i className="fas fa-plus" /> New
    </Link>
  );
};
