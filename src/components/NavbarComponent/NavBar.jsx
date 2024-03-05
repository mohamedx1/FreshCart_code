import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../images/freshcart-logo.svg'
import {myContext} from '../../Context/AuthContextProvider';
import {cartContext} from '../../Context/CartContextProvider';
import {WishListContext} from '../../Context/WishListContextProvider';
const NavBar = () => {
    const navigate = useNavigate();
    const {token, setToken} = useContext(myContext);
    const {numOfCartItems} =useContext(cartContext)
    const {countWishList} =useContext(WishListContext)

    function logOut () {
        setToken(null);
        localStorage.removeItem("tkn");
        navigate("/login")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary  fixed-top mb-4 ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">
                        <img src={logo} alt="Cart Logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {token ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/proudcts">Proudcts</Link>
                                </li>
                                <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/categoris">Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/brands">Brands</Link>
                                </li>
                            </ul>:""
                        }



                        <ul className='ms-auto mb-2 mb-lg-0 list-unstyled d-flex gap-3 '>
                            <li>
                                <Link><i className="fa-brands fa-instagram"></i></Link>
                            </li>
                            <li>
                                <Link><i className="fa-brands fa-facebook"></i></Link>
                            </li>
                            <li>
                                <Link><i className="fa-brands fa-tiktok"></i></Link>
                            </li>
                            <li>
                                <Link><i className="fa-brands fa-twitter"></i></Link>
                            </li>
                            <li>
                                <Link><i className="fa-brands fa-linkedin"></i></Link>
                            </li>
                            <li>
                                <Link><i className="fa-brands fa-youtube"></i></Link>
                            </li>
                        </ul>
                        {token ?<>
                            <span type="button" className=' ms-4 position-relative  '>
                                <Link aria-current="page" to="/cart" ><i className="fa-solid fa-cart-shopping fs-5"></i>
                                <span className="position-absolute translate-middle badge rounded-pill bg-danger ms-2">
                                        {numOfCartItems >= 99 ? `${ "+99" }` : (numOfCartItems? numOfCartItems : "") }
                                </span>
                                </Link>
                            </span>
                            <span type="button" className=' ms-4 position-relative  '>
                                <Link aria-current="page" to="/wishlist" ><i className="fa-solid fa-heart fs-4"></i>
                                <span className="position-absolute translate-middle badge rounded-pill bg-danger ms-2">
                                        {/* countWishList */}
                                        {countWishList >= 99 ? `${ "+99" }` : (countWishList ? countWishList : "")}
                                </span>
                                </Link>
                            </span>
                            <button onClick={logOut} className='border-0 bg-transparent ms-4 '>LogOut</button>
                        </>
                            :
                            <>
                                <Link to="/register"><button className='  border-0 bg-transparent ms-4 '>Sign Up</button></Link>
                                <Link to="/login"><button className='  border-0 bg-transparent ms-4 '>Log in</button></Link>
                            </>
                        }


                    </div>
                </div>
        </nav>
        </>
    );
}

export default NavBar;
