import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import currencyFormatter from "currency-formatter";
import { BsFillSkipStartFill, BsFillSkipEndFill } from "react-icons/bs";



const Details = () => {
    const [quantity, setQuantity] = useState(1)

    const { id } = useParams();
    // console.log(id)
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.ProductReducer);
    useEffect(() => {
        dispatch({ type: "PRODUCT", id })
    }, [id])

const decQuantity = ()=>{
    if(quantity>1){
        setQuantity(quantity-1)
    }
}
const incQuantity = ()=>{
    if(quantity<5){
        setQuantity(quantity+1)
    }
    else{
        alert("only 5 product")
    }
}
    return (
        <>
            <div className="container mt-100">
                <div className="row">
                    {/* <div className="col-3" >
                    </div> */}
                    <div className="col-6">
                        <div className="details__image">
                            <img src={`/images/${product.image}`} alt={product.name} />
                           
                        </div>
                    </div>
                    <div className="col-6">
                       <div className="details__name">
                         {product.name}
                       </div>
                       <div className="details__price">
                         <span className="details__actual">
                         {currencyFormatter.format(product.price, { code: 'INR' })}
                         </span>
                         <span className="details__discount">
                         {currencyFormatter.format(product.discountPrice, { code: 'INR' })}
                         </span>
                         <div className="details__p">{product.desc}</div>

                       </div>
                      
                       <div className="details__info">
                          
                           <div className="details__incDec">
                           <span className="dec"onClick={decQuantity}><BsFillSkipStartFill/></span>
                           <span className="quantity">{quantity}</span>
                           <span className="inc" onClick={incQuantity}><BsFillSkipEndFill/></span>
                           <button className="btn-default" onClick ={()=>dispatch({type: 'ADD_TO_CART', payload: {product, quantity}})} >Add to Cart</button>
                           </div>

                       </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Details
