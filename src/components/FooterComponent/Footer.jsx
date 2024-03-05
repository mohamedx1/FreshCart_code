import React from 'react';
import myFooterStyle from "./footer.module.css";
import payment1 from '../../images/payment1.svg'
import payment2 from '../../images/payment2.svg'
import payment3 from '../../images/payment3.svg'
import payment4 from '../../images/payment4.svg'
import googlePlay from '../../images/appstore.svg'
import AppStore from '../../images/googleplay.svg'


const Footer = () => {
    return (
        < >
            <footer className='mt-4 bg-main-light pt-5 pb-5'>
                <div className='container'>
                    <h4>Get the FreshCart app</h4>
                    <p>We Will send you Link , open it on your phone to download the app.</p>
                    <div className='footer-email'>
                        <form className='row'>
                            <input type="email" className='col-md-8 form-control  ms-lg-4 me-3 w-75 mb-sm-3 mb-md-0 text-center '/>
                            <button className='btn bg-main text-white col-md-2  '>Share App Link</button>
                    </form>
                    </div>
                    <hr />
                    <div className='payment d-flex justify-content-between pt-2 '>
                        <div>
                            <span>Payment partners </span>
                            <span><img src={payment1} alt="" className={myFooterStyle.mini_logo} /></span>
                            <span><img src={payment2} alt="" className={myFooterStyle.mini_logo} /></span>
                            <span><img src={payment3} alt="" className={myFooterStyle.mini_logo} /></span>
                            <span><img src={payment4} alt="" className={myFooterStyle.mini_logo} /></span>
                        </div>
                        <div>
                            <span className=' pe-4'>Get deliveries with FreshCart</span>
                            <span><img src={googlePlay} alt="" className={` me-2 ${myFooterStyle.md_logo}`} /></span>
                            <span><img src={AppStore} alt="" className={myFooterStyle.md_logo} /></span>
                        </div>
                    </div>
                    <hr />
                </div>
            </footer>
        </>
    )
}

export default Footer;
