import React from 'react'
import { FaCircleNotch } from 'react-icons/fa'

const LoadingComponent = () => {
  return (
    <div className='h-[40rem] flex justify-center items-center'>
        <FaCircleNotch size={'3rem'} className='animate-spin'/>
    </div>
  )
}

export default LoadingComponent