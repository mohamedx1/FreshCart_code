import React from 'react';
import NavBar from '../NavbarComponent/NavBar';
import Footer from '../FooterComponent/Footer';
import {Outlet} from 'react-router-dom';

const Layout = () => {
    return (
            <>
            <NavBar />
            <div className='mt-5 pt-5'></div>
            <Outlet/>
            <Footer />
            </>


    )
}

export default Layout
