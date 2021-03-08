import React from 'react'
import { Link } from "react-router-dom"
import { BsFillBagFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const Nav = () => {

    const {totalQuantities} = useSelector(state =>state.CartReducer)
    return (
        <div className="nav">
            <div className="container">
                <div className="nav__container">
                    <div className="nav__left">
                        <Link to="/">
                            <h3>{`<NaresH/>`}</h3>
                            {/* <img src="/images/logo.jpeg" alt="logo" className="imagelogo" /> */}
                        </Link>
                    </div>
                    <div className="nav__right">
                        <div className="basket">
                            <Link to="/cart">
                                <BsFillBagFill className="cart-icon" />
                            </Link>
                            <span>{totalQuantities}</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Nav
