"use client";
import React from "react";
import StoreProvider from "./redux";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default DashboardWrapper;
