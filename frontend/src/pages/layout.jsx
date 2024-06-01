// import Header from '../components/common/header'
import React from "react";
import variables from "../styles/global.module.scss";
import MyHeader from "../Components/header";
import ResponsiveAppBar from "../common/HeaderAppBar";

export default function BaseLayout({ children }) {
  return (
    <div >
      {/* <MyHeader /> */}
      <ResponsiveAppBar/>
      <div className="container">{children}</div>
    </div>
  );
}
