import {useQuery} from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'
import LoadingScreen from '../LoadingScreenComponent/LoadingScreen';
import {Helmet} from 'react-helmet';

export default function Categories () {

    function getCategorisData () {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    const {data, isLoading} = useQuery({
        queryKey: ['getCategorisData'], queryFn: getCategorisData,
    })

    if (isLoading) {
        return <LoadingScreen></LoadingScreen>;
    }

    console.log(data.data.data);

    return (<>
        <Helmet>
            <title>Categories</title>
        </Helmet>
      <div className="container">
          <h1 className='mb-4'>Our Categories :</h1>
          <div className="row">
              {data.data.data.map((category , idx) =>
                  <div key={idx} className="col-lg-2 col-md-4 col-sm-6 mb-sm-3   rounded-2 position-relative main-div ">
                      <div style={{height: "350px"}} className=' shadow p-2 product '>
                          <img className='w-100 ' style={{height: "200px"}} src={category.image} alt={category.name} />
                          <h5 className='text-main h6'>{category.name}</h5>
                          <h4 className='h6'>title</h4>
                      </div>
                  </div>
             )}
          </div>
    </div>
     </>
  )
}
