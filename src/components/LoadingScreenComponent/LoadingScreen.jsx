import React from 'react'
import {Bars} from 'react-loader-spinner'
function LoadingScreen() {
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center'>
      <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          />
          </div>
  )
}

export default LoadingScreen