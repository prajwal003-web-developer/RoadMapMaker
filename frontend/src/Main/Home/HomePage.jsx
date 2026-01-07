import { Protect, useAuth, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import Layout from "../Layout";
import { useEffect } from "react";
import api from "../../api";
import Navbar from "../Components/Navbar";
import HomeSideBar from "../Components/HomeSideBar";
import HomeBody from "../Components/HomeBody";
import useHomePage from "../Zustand/homePage";



const HomePage = () => {
  const isOpen = useHomePage((p) => p.isOpen);

  

  return (
    <Layout>
      <div >
        <HomeBody />
      </div>
    </Layout>
  );
};

export default HomePage;
