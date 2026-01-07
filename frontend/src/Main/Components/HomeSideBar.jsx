import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaCircle, FaCircleNotch } from "react-icons/fa";
import useHomePage from "../Zustand/homePage";
import useRoadmap from "../Zustand/Roadmap";

import {toast} from  'react-toastify'
import api from "../../api";
import { useNavigate } from "react-router-dom";

const HomeSideBar = () => {

    

    const {setIsOpen} = useHomePage()

    const isOpen = useHomePage(p=>p.isOpen)
    const RoadMaps = useRoadmap(p=>p.RoadMaps)

    

    const HandleClose = ()=>{
        setIsOpen(false)
    }
  return (
    <div
      className={`${isOpen?'flex':'hidden'}  top-0 left-0  bottom-0 w-64  flex-col border-r border-solid border-gray-600  bg-[#000000] fixed z-50 `}
    >
      <div
        className="text-xl relative py-4 border-b border-gray-600 border-solid  text-center w-full h-fit select-none cursor-pointer font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-red-500 to-blue-600"
      >
        My-Roadmap  

        <div className="absolute top-[30%] right-0">
            <FaChevronLeft onClick={HandleClose} className=" rounded-full font-light " color="gray" size={'1.3rem'} /> 
        </div>
      </div>

        {
        RoadMaps?.length<=0?
        <div className="text-center h-32 text-gray-600 font-semibold flex justify-center items-center">
            No Roadmaps  
         </div>
        :
        <div className="flex flex-col justify-center gap-2 p-1 ">
           {
            RoadMaps?.map((itm,idx)=>{
              return <div key={idx}><Boxes data={itm} idx={idx}/></div>
            })
           }
      </div>
    }
      
    </div>
  );
};

export default HomeSideBar;


const Boxes = (data,idx)=>{

  const navigate = useNavigate()
  return <button onClick={()=>{
    navigate(`/roadmap/${data.data._id}`)
  }} className="text-sm text-gray-300 w-full font-semibold p-3 border-solid border border-gray-800 rounded bg-[#ffffff15] cursor-pointer" key={idx+69}>
    {data?.data?.name}
  </button>
}
