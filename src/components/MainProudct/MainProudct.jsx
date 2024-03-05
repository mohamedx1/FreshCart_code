import React, {useContext, useEffect, useState} from 'react'
import {cartContext} from '../../Context/CartContextProvider';
import {WishListContext} from '../../Context/WishListContextProvider';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom';
import {ColorRing} from 'react-loader-spinner';



export default function MainProudct ({proudct}  ) {
    const [loading, setLoading] = useState(false)
    const {addProudctToCart} = useContext(cartContext)
    const {addProudctToWishList, removeProudct, allWishList} = useContext(WishListContext)
    const [isHearted, sitIsHearted] = useState(false);

    // console.log(allWishList);
    // console.log(proudct);

    async function addingToWishList (proudctID) {
        const wishData = await addProudctToWishList(proudctID);
        if (wishData) {
            sitIsHearted(true)
            //    console.log(wishData)
            toast.success("Product added successfully to your wishlist", {position: "top-center"})
        } else {
            toast.error("error", {position: "top-center"})
        }

    }

    async function addingProudct (id) {
        setLoading(true)

        await addProudctToCart(id)
            .then((res) => {
                setLoading(false)
                toast.success("Proudct Added Succsessfuly ", {position: 'top-center'})
            }
            )
            .catch((err) =>
                toast.error("Proudct Added Succsessfuly ", {position: 'top-center'})
            )
    }


    async function removeWishProudct (id) {
        const removeData = await removeProudct(id);
        console.log("remove DATAT" , removeData );
        if (removeData) {
            sitIsHearted(false)
            toast.success("proudct removed Sucsessfully", {position: "top-center"})

        } else {
            toast.error("error", {position: "top-right"})
        }
    }
    // console.log(isHearted);
    useEffect(() => {
        for (let i = 0; i < allWishList.length; i++) {
            if (proudct.id == allWishList[i].id) {
                sitIsHearted(true)
            }
        }
        // gettAllWishListProudcts()

    }, [ allWishList])


  return (
      <>
          <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12 mb-sm-3 main-div   rounded-2 position-relative  ">
              {/* {setProudctId(proudct.id)} */}
              <div style={{height: "450px"}} className=' mainP shadow p-2 product '>
                  <Link to={`/proudctDetails/${ proudct.id }`} >
                      <img className='w-100 ' src={proudct.imageCover} alt="" style={{height: "250px"}} />
                      <h5 className='text-main h6'>{proudct.category.name}</h5>
                      <h4 className='h6'>{proudct.title.split(" ").splice(0, 2).join(" ")}</h4>
                      <div className='d-flex justify-content-between'>
                          {proudct.priceAfterDiscount ?
                              <> <div> <span className='text-decoration-line-through'>{proudct.price} &#163;</span> - <span>{proudct.priceAfterDiscount}&#163; </span></div>
                              </> :
                              <span>{proudct.price} &#163;</span>}
                          <span> <i style={{color: "#FFD700"}} className="fa-solid fa-star"></i> {proudct.ratingsAverage} </span>
                      </div>
                  </Link>
                  <div className='d-flex justify-content-between'>
                      <button onClick={() => addingProudct(proudct.id)} className='btn bg-main text-white mt-4 d-block  '>
                          {loading ?
                              <ColorRing
                                  visible={true}
                                  height="25"
                                  width="25"
                                  ariaLabel="color-ring-loading"
                                  wrapperStyle={{}}
                                  wrapperClass="color-ring-wrapper"
                                  colors={['#eee', '#eee', '#eee', '#eee', '#eee']}
                              /> : "Add To Cart"
                          }
                      </button>
                      {isHearted ?
                          <button onClick={() => removeWishProudct(proudct.id)} className='btn d-flex align-items-center mt-4 '>
                              <i className="fa-solid fa-heart fs-4" style={{color: " #ff0000"}}></i>
                          </button> :
                          <button onClick={() => addingToWishList(proudct.id)} className='btn d-flex align-items-center mt-4'>
                              <i className="fa-regular fa-heart fs-4"></i>
                          </button>
                       }
                  </div>
              </div>
          </div>
      </>
  )
}
