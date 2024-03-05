import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/LayoutComponent/Layout";
import Register from "./components/RegisterComponent/Register";
import Login from "./components/LoginComponent/Login";
import Proudcts from "./components/ProudctsComponent/Proudcts";
import Cart from "./components/CartComponent/Cart";
import AuthContextProvider from "./Context/AuthContextProvider";
import ProtectedRouts from "./components/ProtectedRouts/ProtectedRouts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProudctDetails from "./components/ProudctDetails/ProudctDetails";
import Err from "./components/ErrComponent/Err";
import CartContextProvider from './Context/CartContextProvider';
import {Toaster} from "react-hot-toast";
import PaymentCash from "./components/paymentCash/PaymentCash";
import PaymentOnline from "./components/paymentOnline/PaymentOnline";
import Allorders from "./components/AllordersCopmonent/AllordersCoponent";
import WishList from "./components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContextProvider";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";

const App = () => {
  const myRoute = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRouts>
              <Proudcts />
            </ProtectedRouts>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRouts>
              <Proudcts />
            </ProtectedRouts>
          ),
        },
        {
          path: "categoris",
          element: (
            <ProtectedRouts>
              <Categories />
            </ProtectedRouts>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRouts>
              <Brands />
            </ProtectedRouts>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "proudctDetails/:id", element: <ProudctDetails /> },
        {
          path: "paymentCash",
          element: (
            <ProtectedRouts>
              <PaymentCash />
            </ProtectedRouts>
          ),
        },
        {
          path: "paymentOnline",
          element: (
            <ProtectedRouts>
              <PaymentOnline />
            </ProtectedRouts>
          ),
        },
        {
          path: "proudcts",
          element: (
            <ProtectedRouts>
              <Proudcts />
            </ProtectedRouts>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRouts>
              <Cart />
            </ProtectedRouts>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRouts>
              <WishList />
            </ProtectedRouts>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRouts>
              <Allorders />
            </ProtectedRouts>
          ),
        },
        { path: "error", element: <Err /> },
        { path: "*", element: <Err /> },
      ],
    },
  ]);

  const myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthContextProvider>
          <WishListContextProvider>
            <CartContextProvider>
              <RouterProvider router={myRoute} />
            </CartContextProvider>
          </WishListContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  )
}

export default App
