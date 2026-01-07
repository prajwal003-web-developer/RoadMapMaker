import React, { useEffect, useState } from 'react'

import {  Protect } from "@clerk/clerk-react";
import RedirectToHome from '../Not-Main/Components/RedirectToHome';
import useRoadmap from './Zustand/Roadmap';
import api from '../api';
import Navbar from './Components/Navbar';
import LoadingComponent from './LoadingComponent';
import HomeSideBar from './Components/HomeSideBar';
import useHomePage from './Zustand/homePage';
import { toast } from 'react-toastify';

const Layout = ({children}) => {
  const {setAllRoadMaps} = useRoadmap()

  const isOpen = useHomePage(p=>p.isOpen)
  
      const [Loading, setLoading] = useState(true)
  
       useEffect(()=>{
        const fetchMaps = async()=>{
          try {
            const data = await api.get(`/project`)
            setAllRoadMaps(data?.data?.data)
          } catch (error) {
            toast.error("Couldnt Fetch")
          }
          finally{
            setLoading(false)
          }
        }
  
        fetchMaps()
  
       },[])

       if (Loading) return <LoadingComponent/>
  return (
     <Protect fallback={<RedirectToHome/>}>
        <Navbar />
        <HomeSideBar/>
        <div className={` h-[98dvh] ${isOpen ? "md:pl-[16rem]" : ""} `}s>
          {children}
        </div>
     </Protect>
  )
}

export default Layout