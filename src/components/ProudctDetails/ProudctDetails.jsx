import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import LoadingScreen from '../LoadingScreenComponent/LoadingScreen';
import {cartContext} from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';
import {ColorRing} from 'react-loader-spinner';
import {Helmet} from 'react-helmet';


const ProudctDetails = () => {
    const [loading, setLoading] = useState(false)

    const {id} = useParams("id")

    const {addProudctToCart} = useContext(cartContext);

    async function addingProudct (id) {
        setLoading(true)
        await addProudctToCart(id)
            .then((res) => {
                toast.success("Proudct Added Succsessfuly ", {position: 'top-center'} )
                setLoading(false)
            }

            )
            .catch((err) =>
                toast.error("Proudct Added Succsessfuly ", {position: 'top-center'})
            )
    }

    function getProudctDetails () {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const {data, isLoading, isError} = useQuery({queryKey: [`getProudctDetails${id}`], queryFn: getProudctDetails})
    console.log(data);
    if (isLoading) {
        return <LoadingScreen/>
    }

    if (isError) {
        return <Navigate to={"/proudcts"} />
    }


    const proudctData = data.data.data;
    return (
        <>
            <Helmet>
                <title>{proudctData.slug }</title>
            </Helmet>
            <div className="container">
                <div className="row  align-items-center">
                    <div className="col-md-3">
                        <figure>
                            <img className='w-100' src={proudctData.imageCover} alt={proudctData.title} />
                        </figure>
                    </div>
                    <div className="col-md-9">
                        <div>
                            <h6>{proudctData.description}</h6>
                            <p className=' text-muted'>{proudctData.slug}</p>
                            <span className='text-main'>{proudctData.category.name }</span>
                            <div className='d-flex justify-content-between mt-2'>

                                {proudctData.priceAfterDiscount ?
                                    <> <div> <span className='text-decoration-line-through'>{proudctData.price} &#163;</span> - <span>{proudctData.priceAfterDiscount}&#163; </span></div>
                                    </> :
                                    <span>{proudctData.price} &#163;</span>}

                                <p><i style={{color: "#FFD700"}} className="fa-solid fa-star"></i> {proudctData.ratingsAverage}</p>
                            </div>
                            {/* <p>{id}</p> */}
                            <button onClick={() => addingProudct(id)} className='btn bg-main text-white w-100'>
                                {loading ?
                                    <ColorRing
                                        visible={true}
                                        height="35"
                                        width="35"
                                        ariaLabel="color-ring-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="color-ring-wrapper"
                                        colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
                                    /> : "Add To Cart"
                                }

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProudctDetails;
