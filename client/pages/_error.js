import React, { useEffect } from "react";
import Router from "next/router";

const _error  = () => {
  useEffect(() => {
    Router.push("/");
  },[]);
    return <div />;
}

export default _error;