import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../scss/viewCart.scss'
import Checkout from './Checkout';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, handleCart } from '../store/reducers';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import Footer from './Footer';

const ViewCart = () => {
  const cart = useSelector((state) => state.products.cart);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkbox, setCheckbox] = useState('')


  useEffect(() => {
    window.scrollTo(0, 0)
    const calculateTotal = () => {
      const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotal();
  }, [cart]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)

    }, 1000)
  }, [])


  const handleCheckout = () => {
 if (checkbox) {
        setShowCheckout(true);
      }
      else{
        alert("Please agree to the terms and conditions to proceed.");
        
      }
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    // navigate("/")
  };
  const handleClose = () => {
    setShowCheckout(false);

  }
  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleDecrease = (id,quantity)=>{
    if (quantity >= 1){ 
        dispatch(handleCart({ id:id, quantity: quantity }))
    }
    else if(quantity == 0)
    {
        dispatch(handleRemove(id))
    }
}

const handleIncrease = (id,quantity)=>{
      dispatch(handleCart({ id:id, quantity: quantity }))
}
  return (
    <>
      {loading ? (
        <div style={{
          display: 'grid', placeContent: 'center', height: '100vh'
        }}>
          <div className="loader"></div>
        </div>
      ) : <div className="viewCart">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              cart?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div>
                      <div className="product-info" onClick={() => { navigate(`/product/${item.id}`) }}>
                        <img src={item.image} alt={item.title} />
                        <div className="productDetails">
                          <p className="productTitle">{String(item.title).slice(0, 40)}</p>
                          <p>Color: <span>{item.color}</span></p>
                          <p>Category: <span>{item.category}</span></p>
                        </div>
                      </div>
                      <div className="action-buttons">
                        <button className="edit-btn"><FiEdit /></button>
                        <button className="delete-btn" onClick={() => handleRemove(item.id)}><RiDeleteBinLine /></button>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className='price'>
                      <del>Rs.{(item.price * 5).toFixed(2)}</del>
                      <p>Rs.{item.price.toFixed(2)}</p>
                    </div>
                  </td>
                  <td>
                    <div className="quantityOption">
                      <button onClick={()=>handleDecrease(item.id,item.quantity-1)}><FaMinus /></button>
                      <input
                        type="text"
                        readOnly
                        value={item.quantity}
                      />
                      <button onClick={()=>handleIncrease(item.id,item.quantity+1)}><FaPlus /></button>
                    </div>
                  </td>
                  <td>
                    <p className='finalPrice'>Rs.{(item.price * item.quantity).toFixed(2)}</p>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className='help-order-section'>
          <div className="help-section">
            <h3>Add Order Note</h3>
            <textarea name="help" placeholder="How Can I Help You?"></textarea>
            <h3>Coupon</h3>
            <p>Coupon code will work on checkout page</p>
            <input type="text" placeholder="Coupon Code" />
          </div>
          <div className="finaliseOrder">
            <p className='subtotal'>SUBTOTAL: <span>RS. {totalPrice.toFixed(2)}</span> </p>
            <p>Tax included and shipping calculated at checkout</p>
            <label>
              <input type="checkbox" onChange={(e) => setCheckbox(e.target.checked)}/>
              I agree with the <span className="terms-text" >terms and conditions</span>.
            </label>
            <button onClick={() => handleCheckout()}>Place Order</button>
          </div>

        </div>
        {showCheckout && (
          <Checkout onClose={() => handleCloseCheckout()} />
        )}
      </div>}
    </>
  );
};

export default ViewCart;
