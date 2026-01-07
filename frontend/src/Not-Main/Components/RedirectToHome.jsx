import React from 'react'
import { useNavigate } from "react-router-dom";

const RedirectToHome = () => {

    const router = useNavigate()

    const RedirectToHomePage = ()=>{
        router('/')
    }
  return (
    <div className='h-[100dvh] w-full flex justify-center flex-col gap-2 items-center text-lg font-semibold'>
        <p className='text-center'>
            Hey , You Can Login and Continue Now Redirect To Home To Learn More
            <br />
            About Our Site like how it work and all
        </p>
        <button onClick={RedirectToHomePage} className='bg-green-600 p-2 px-12 rounded cursor-pointer'>
            Go To Home
        </button>
    </div>
  )
}

export default RedirectToHome