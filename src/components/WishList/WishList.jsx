import React, {useContext} from 'react'
import {WishListContext} from '../../Context/WishListContextProvider'
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';
import {cartContext} from '../../Context/CartContextProvider';
import EmptyWishlist from './../EmptyWishlist/EmptyWishlist';
import {Helmet} from 'react-helmet';

export default function WishList () {
    const {allWishList, removeProudct} = useContext(WishListContext);
    const {addProudctToCart} = useContext(cartContext);

    async function addingProudct (id) {
        await addProudctToCart(id)
            .then((res) => {
                toast.success("Proudct Added Succsessfuly ", {position: 'top-center'})
            }
            )
            .catch((err) =>
                toast.error("Proudct Added Succsessfuly ", {position: 'top-center'})
            )
    }

   async function removeWishProudct (id) {
       const removeData = await removeProudct(id);
       if (removeData) {
        //    sitIsHearted(false);
           toast.success("proudct removed Sucsessfully", {position: "top-center"})

       } else {
           toast.error("error", { position:"top-right"})
       }
    }


    // console.log(allWishList);

    if (allWishList == 0) {
        return <EmptyWishlist/>
    }


    return (
        <>
            <Helmet>
                <title>Wishlist</title>
            </Helmet>
        <div className="container">
                <div className="row">
                    {allWishList.map((item, idx) =>
                        <div key={idx} className=" col-xl-3 col-lg-4 col-md-6 col-sm-11 col-xsm-12 p-sm-5   rounded-2 position-relative main-div ">
                            <div  className=' shadow p-2 product '>
                                <Link to={`/proudctDetails/${ "item.id" }`} >
                                    <img className='w-100 ' src={item.imageCover} alt="" />
                                    <h5 className='text-main h6'>{item.category.name}</h5>
                                    <h3 className='h6'>{item.title.split(" ").splice(0, 2).join(" ")}</h3>
                                    <div className='d-flex justify-content-between mb-3'>
                                        <span>{item.price} &#163;</span>
                                        <span> <i style={{color: "#FFD700"}} className="fa-solid fa-star"></i> {item.ratingsAverage} </span>
                                    </div>
                                </Link>
                                {/* <p>{item.id}</p> */}
                                <div className='d-flex justify-content-between'>
                                    <button onClick={() => addingProudct(item.id)} className='btn bg-main text-white mt-4 d-block '>
                                        Add To Cart
                                    </button>
                                    <button onClick={() => removeWishProudct(item.id)} className='btn btn-outline-danger d-flex align-items-center mt-4 '><i className="fa-solid fa-trash-can "></i></button>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    </>
    )
}
