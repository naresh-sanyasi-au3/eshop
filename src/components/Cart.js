import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import currencyFormatter from "currency-formatter";
import { BsFillSkipStartFill, BsFillSkipEndFill, BsFillXCircleFill } from "react-icons/bs";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();



const Cart = (props) => {

    const { products, totalQuantities, totalPrice } = useSelector(state => state.CartReducer);
    const dispatch = useDispatch();
    const handleToken = async (token) => {
        const product = { name: 'All Product', price: totalPrice }
        const response = await axios.post("http://localhost:8080/checkout", {
            product,
            token
        });
        const { status } = response.data;
        if (status === "success") {
            dispatch({ type: 'EMPTY' })
            props.history.push('/');
            toast.success("thanks for using our shoping portal", {position: toast.POSITION.TOP_RIGHT});
        }
    }



    return (
        <div className="cart">

            {products.length > 0 ? <>
                <div className="row">
                    <div className="col-9">
                        <div className="">
                            <div className="row cart__heading" >
                                <div className="col-2">
                                    picture
                            </div>
                                <div className="col-2">
                                    name
                            </div>
                                <div className="col-2">
                                    price
                            </div>
                                <div className="col-2">
                                    inc/dec
                            </div>
                                <div className="col-2">
                                    total price
                            </div>
                                <div className="col-2">
                                    remove
                            </div>
                            </div>
                            {products.map(product => (
                                <div className="row verticalAllign summary__details" key={product.id}>
                                    <div className="col-2">
                                        <div className="cart__image">
                                            <img src={`/images/${product.image}`} />
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__name">
                                            {product.name}
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__price">
                                            {currencyFormatter.format(product.discountPrice, { code: 'INR' })}
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="details__incDec">
                                            <span className="dec" onClick={() => dispatch({ type: 'DEC', payload: product.id })}><BsFillSkipStartFill /></span>
                                            <span className="quantity">{product.quantity}</span>
                                            <span className="inc" onClick={() => dispatch({ type: 'INC', payload: product.id })}><BsFillSkipEndFill /></span>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__total text__center">
                                            {currencyFormatter.format((product.discountPrice * product.quantity), { code: 'INR' })}
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="cart__remove" onClick={() => dispatch({ type: 'REMOVE', payload: product.id })}>
                                            <BsFillXCircleFill />
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>
                    <div className="col-3 summary-col">
                        <div className="summary">
                            <div className="summary__heading">
                                Summary
                            </div>
                            <div className="summary__details">
                                <div className="row mb-10">
                                    <div className="col-6">
                                        Total Items:
                                    </div>
                                    <div className="col-6">{totalQuantities}</div>
                                </div>
                                <div className="row mb-10">
                                    <div className="col-6">
                                        Total Price
                                    </div>
                                    <div className="col-6">
                                        {currencyFormatter.format(totalPrice, { code: 'INR' })}
                                    </div>
                                </div>
                                <div className="stripe_section">
                                    <StripeCheckout
                                        className="checkout"
                                        stripeKey="pk_test_51ISMpaDeuELIrjv1F9lpjrT1SIcRH1euf6BVnyf9GPNW3Ta0ad6OYXh0LcBOZX0nnZ3jrSNTI2EHt2t8UkL5QnuD00mjSNG2ki"
                                        token={handleToken}
                                        billingAddress
                                        shippingAddress
                                        amount={totalPrice * 100}
                                        name="All Product">

                                    </StripeCheckout>

                                </div>

                                {/* <button type="button" className="checkout">Checkout</button> */}
                            </div>

                        </div>
                    </div>
                </div>

            </> : <div className="checkout1"><h1>Your Cart is Empty</h1> </div>}
        </div>
    )
}

export default Cart
