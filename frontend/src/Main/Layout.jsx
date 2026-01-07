import React, { useEffect, useState } from 'react'

import {  Protect, useUser } from "@clerk/clerk-react";
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

      const {isLoaded} = useUser()
  
       useEffect(()=>{
        const fetchMaps = async()=>{
          try {
            const data = await api.get(`/project/get-all`)
            setAllRoadMaps(data?.data?.data)
          } catch (error) {
            toast.error("Couldnt Fetch")
          }
          finally{
            setLoading(false)
          }
        }
  
        if(isLoaded){
          fetchMaps()
        }
  
       },[isLoaded])

       if (Loading && isLoaded) return <LoadingComponent/>
  return (
     <Protect fallback={<RedirectToHome/>}>
        <Navbar />
        <HomeSideBar/>
        <div className={` h-[98dvh] ${!!isOpen ? "md:pl-[16rem]" : "p-1"} `}s>
          {children}
        </div>
     </Protect>
  )
}

export default Layout