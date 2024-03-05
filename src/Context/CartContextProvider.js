import axios from 'axios';
import React, {createContext, useContext, useEffect, useState} from 'react'
import {myContext} from './AuthContextProvider';


export const cartContext = createContext();


export default function CartContextProvider ({children}) {
    const [ allProudcts, setAllproudcts ] = useState(0);
    const [ totalCartPrice, setTotalCartPrice ] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartID, setcartID] = useState(null);
  // const [userID, setuserID] = useState(null);
  const {token} = useContext(myContext);



  async function addProudctToCart(id) {
    const data = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        setAllproudcts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
        // console.log(res)
        getLoggedUserCart();
        return true;
      })
      .catch((err) => {
        // console.log(err);
        return false;
      });

    return data;
  }

  function getLoggedUserCart () {
    axios.get("https://ecommerce.routemisr.com/api/v1/cart", {headers: {token: localStorage.getItem("tkn")}})
      .then((res) => {
        setAllproudcts(res.data.data.products);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setNumOfCartItems(res.data.numOfCartItems);
        setcartID(res.data.data._id);
        localStorage.setItem("userID" , res.data.data.cartOwner)
      // console.log(res.data.data.cartOwner);
    }
    )
    .catch((err) => {
        console.log(err)
      }
      )

  }

  async function UpdateCount (id , count) {
    const data = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          "count": count,
        },
        { headers: { token: localStorage.getItem("tkn") } }
      )
      .then((res) => {
        // console.log(res.data.data.products);
        setAllproudcts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
        return true;
      })
      .catch((err) => {
        console.log("error")
        return false
      }
    );
    console.log(data)
    return data;
  }


  async function removeProudct (id) {
   const removeData = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ id }`, {headers: {token: localStorage.getItem('tkn')}})
      .then( (res)=>{
        setAllproudcts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
        return true
      }
      )
      .catch((err) => {
        console.log("error")
        return false
      })

    return removeData;
  }

  async function deleteAllproudcts () {
    const deleateCartData = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {headers: {token: localStorage.getItem('tkn')}})
      .then((res) => {
         setAllproudcts(0);
         setTotalCartPrice(0);
         setNumOfCartItems(0);
        return true
      })
      .catch((err) => {
        return false
      })
    return deleateCartData;
  }
  useEffect(() =>
    getLoggedUserCart()
    , [token])





    return (
      <>
        <cartContext.Provider
          value={{
            addProudctToCart,
            allProudcts,
            totalCartPrice,
            numOfCartItems,
            removeProudct,
            deleteAllproudcts,
            UpdateCount,
            setAllproudcts,
            cartID,
            setNumOfCartItems,
            // userID,
          }}
        >
          {children}
        </cartContext.Provider>
      </>
    );
}


