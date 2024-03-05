import axios from 'axios';
import React, {createContext, useContext, useEffect, useState} from 'react'
import {myContext} from './AuthContextProvider';

export const WishListContext = createContext()

export default function WishListContextProvider ({children}) {
    const [countWishList, setCountWishList] = useState(0);
    const [allWishList, setAllWishList] = useState(0);
  const {token} = useContext(myContext);


    function addProudctToWishList (proudctID) {
        const AddData = axios
          .post(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            {
              productId: proudctID,
            },
            {
              headers: { token: localStorage.getItem("tkn") },
            }
          )
          .then((res) => {
            gettAllWishListProudcts();
            return true
          })
            .catch((err) => {
                console.log("error from wish list addProudct", err);
                return false
            });

        return AddData;
    }

    function gettAllWishListProudcts () {
        axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
            {headers: {token: localStorage.getItem('tkn')}})
            .then((res) => {
                setAllWishList(res.data.data)
                setCountWishList(res.data.count);

            })
            .catch((err) => {
                console.log(err , "err")
            })
    }

    // useEffect(() =>
    //     gettAllWishListProudcts()
    //     , [token]);


    function removeProudct (proudctId) {
       const reomveData = axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${ proudctId }`,

          { headers: { token: localStorage.getItem("tkn") } }
        ).then(
          (res) => {
            // console.log(res);
            gettAllWishListProudcts()
                return true
            }
        ).catch(() => {
            return false
        })
        return reomveData;
    }

    return (
      <WishListContext.Provider
        value={{
          addProudctToWishList,
          gettAllWishListProudcts,
          countWishList,
          allWishList,
          removeProudct,
        }}
      >
        {children}
      </WishListContext.Provider>
    );
}
