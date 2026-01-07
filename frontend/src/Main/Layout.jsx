import React, { useEffect, useState } from 'react';
import { Protect, useUser } from "@clerk/clerk-react";
import RedirectToHome from '../Not-Main/Components/RedirectToHome';
import useRoadmap from './Zustand/Roadmap';
import api from '../api';
import Navbar from './Components/Navbar';
import LoadingComponent from './LoadingComponent';
import HomeSideBar from './Components/HomeSideBar';
import useHomePage from './Zustand/homePage';
import { toast } from 'react-toastify';

const Layout = ({ children }) => {

  const { setAllRoadMaps } = useRoadmap();
  const isOpen = useHomePage(p => p.isOpen);

  const [loading, setLoading] = useState(true);

  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const fetchMaps = async () => {
      try {
        const res = await api.get('/project/get-all');
        setAllRoadMaps(res.data.data);
      } catch (err) {
        toast.error("Couldn't fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchMaps();
  }, [isLoaded, isSignedIn]);

  // show loader while clerk OR api is loading
  if (!isLoaded || loading) return <LoadingComponent />;

  return (
    <Protect fallback={<RedirectToHome />}>
      <Navbar />
      <HomeSideBar />
      <div className={`h-[98dvh] ${isOpen ? "md:pl-[16rem]" : "p-1"}`}>
        {children}
      </div>
    </Protect>
  );
};

export default Layout;
