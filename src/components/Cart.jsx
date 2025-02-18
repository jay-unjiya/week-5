import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa";
import emptycart from '../assets/empty-cart.png';
import { closeNav } from './Navbar';
import { GiCrossedBones } from "react-icons/gi";
import { removeFromCart, handleCart } from '../store/reducers';
import Checkout from './Checkout';
import '../scss/Cart.scss';

const Cart = () => {
    const [checkbox, setCheckbox] = useState('')
    const cart = useSelector((state) => state.products.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart({ id }));
    };

    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };
    const handleSubmitCart = () => {
        if (checkbox) {
            navigate('/viewcart');
            closeNav()
        }
        else {
            alert("Please agree to the terms and conditions to proceed.");

        }

    }
    const handleDecrease = (id, quantity) => {
        if (quantity >= 1) {
            dispatch(handleCart({ id: id, quantity: quantity }))
        }
        else if (quantity == 0) {
            dispatch(handleRemove(id))
        }
    }

    return (

        <div className="cartContent">
            <div className="cartHeader">
                <h1>Shopping Cart</h1>

                <button className="closeCart" onClick={closeNav}><GiCrossedBones /></button>
            </div>
            <hr />
            {cart.length === 0 ? (
                <div className="EmptyCart">
                    <img className="empty" src={emptycart} alt="Empty Cart" />
                    <h1>Your Cart is empty</h1>
                    <button onClick={() => { closeNav(); navigate('/collection'); }}>
                        CONTINUE SHOPPING
                    </button>
                </div>
            ) : (
                <div className="cartDetails">
                    {cart.map((item, index) => (
                        <div className='card'>
                            <div className="content" key={index}>
                                <div className="image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="details">
                                    <h4>{String(item.title).slice(0, 50)}</h4>
                                    {/* <p>Color: {item.color}</p>   */}
                                    <del className="delPrice">Rs. {(item.price * 5).toFixed(2)}</del>
                                    <p className="price">Rs. {item.price.toFixed(2)}</p>
                                    <div className="quantityOpt">
                                        <button onClick={() => handleDecrease(item.id, item.quantity - 1)}><FaMinus /></button>
                                        <input
                                            type="text"
                                            readOnly
                                            value={item.quantity}
                                        />
                                        <button onClick={() => { dispatch(handleCart({ id: item.id, quantity: item.quantity + 1 })) }}><FaPlus /></button>
                                    </div>

                                    <div className="action-buttons">
                                        <button className="edit-btn"><FiEdit /></button>
                                        <button className="delete-btn" onClick={() => handleRemove(item.id)}><RiDeleteBinLine /></button>
                                    </div>
                                </div>
                                {/* <hr /> */}
                            </div>
                        </div>
                    ))}
                    <div className="summary">
                        <p>Subtotal: <span>Rs.{calculateSubtotal()}</span></p>
                        <label>
                            <input type="checkbox" onChange={(e) => setCheckbox(e.target.checked)} />
                            I agree with the <span className="terms-text">terms and conditions</span>.
                        </label>
                        <button className="place-order-btn" onClick={() => { handleSubmitCart() }}>View Cart</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Cart;
