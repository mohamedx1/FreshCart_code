import { useQuery} from '@tanstack/react-query'
import axios from 'axios'
import LoadingScreen from '../LoadingScreenComponent/LoadingScreen'
import {Helmet} from 'react-helmet'

export default function AllordersComponent () {

  function getUserOrders () {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${ localStorage.getItem('userID') }`);
  }
const {data , isLoading } =  useQuery({queryKey: ["getUserOrders"], queryFn: getUserOrders})
  if (isLoading) {
    return <LoadingScreen/>
  }

  return (
    <>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      {/* {console.log(data.data)} */}
      <div className="container">
        <div className="row g-4">
          {data.data.map((item, idx) =>
            <div key={idx} className="col-md-6 ">
              <div className='h-100'>
                <div className="card mb-3 p-4 h-100 " >
                  <div className='container'>
                    <h2>order : { idx+1 }</h2>
                    <div className="row g-2">
                      {item.cartItems.map((proudct , secIdx) => <div key={secIdx} className="col-md-4">
                        <div>
                          <div className="card">
                            <img src={proudct.product.imageCover} className="card-img-top" alt="..." />
                            <div className="card-body">
                              <h6 className='fw-bold'>{proudct.product.title.split(" ").splice(0, 2).join(" ")}</h6>
                              <p className="card-text"> count : {proudct.count}</p>
                              <p className="card-text text-main"> Price : {proudct.price} EGP</p>
                            </div>
                          </div>
                        </div>
                      </div>)}
                    </div>
                  </div>
                  <div className="card-body">
                      <h5 className="card-title">Order Info</h5>
                      <p className="card-text">payment method : {item.paymentMethodType} </p>
                      <p className="card-text">Clinet Name : {item.user.name}  </p>
                      <p className="card-text">Clinet Phone numper : {item.user.phone}  </p>
                      <p className="card-text">Clinet E-mail : {item.user.email} </p>
                      <p className='h5 text-main'>total order price : {item.totalOrderPrice}</p>
                  </div>
              </div>
          </div>
        </div>
          )}

        </div>
      </div>
    </>
  )
}
