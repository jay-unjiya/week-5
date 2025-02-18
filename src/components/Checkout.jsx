import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes, FaShoppingCart, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { TfiAngleUp, TfiAngleDown } from "react-icons/tfi";
import { FaArrowRightLong } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import logo from '../assets/logo2.png';
import '../scss/Checkout.scss';
import { emptyCart } from '../store/reducers';
const Checkout = ({ product, onClose }) => {
  const [step, setStep] = useState('mobile');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('home');
  const [showSummary, setShowSummary] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const calculateTotal = () => {
      let price = 0;
      let discount = 0;

      if (cart.length > 0) {
        price = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        discount = cart.reduce((acc, item) => acc + (item.price * 5 - item.price) * item.quantity, 0);
      } else {
        price = product.price * product.quantity;
        discount = (product.price * 5 - product.price) * product.quantity;
      }

      setTotalPrice(price.toFixed(2));
      setTotalDiscount(discount.toFixed(2));
    };

    calculateTotal();
  }, [cart, product]);

  const handleCheckOut = () => {
    dispatch(emptyCart())
    navigate('/confirm')
    onClose()
  }
  const handleContinue = () => {
    if (step === 'mobile' && mobile.length === 10) {
      setStep('address');
    } else if (step === 'address') {
      setStep('pay');
    } else if (step === 'pay') {
      handleCheckOut();
    }
  };

  const handleMobile = () => {
    if(mobile.length === 0)
    {
      setError(' Mobile number is require');
    }
    else if (mobile.length !== 10 || isNaN(mobile)) {
      setError('Enter a valid 10-digit Mobile number');
    }
    else {
      setError('');
      handleContinue();
    }
  };


  const validationSchema = Yup.object({
    pincode: Yup.string().required('Pincode is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    fullname: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    address: Yup.string().required('Full Address is required'),
  });

  const formik = useFormik({
    initialValues: {
      pincode: '',
      city: '',
      state: '',
      fullname: '',
      email: '',
      address: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleContinue();
    },
  });



  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  const orderSummary = (
    <div className="order-summary">
      <div className="order-summary-header" onClick={toggleSummary}>
        <div className='order-summary-title'>
          <BsCart2 className="order-summary-icon1" />
          <p>Order Summary</p>
          {showSummary ? <TfiAngleUp className="order-summary-icon2" /> : <TfiAngleDown className="order-summary-icon2" />}
        </div>
        <h2 className='FinalPrice'>₹{totalPrice}</h2>
      </div>
      {showSummary && (
        <div className="order-summary-content">
          {cart.length > 0 ? cart.map((item, index) => (
            <div key={index} className="product-summary">
              <img src={item.image} alt={String(item.title).slice(0, 20)} />
              <div className="product-details">
                <p>{String(item.title).slice(0, 40)}</p>
                <div className='prices'>
                Price:
                  <del>₹{(item.price * 5).toFixed(2)}</del>
                  <p><span>  ₹{item.price.toFixed(2)}</span></p>
                </div>
                <p>Quantity: {item.quantity}</p>
              </div>
              <hr />
            </div>
          )) : (
            <div className="product-summary">
              <img src={product.image} alt={String(product.title).slice(0, 20)} />
              {console.log(product)}
              <div className="product-details">
                <p>{(product.title)}</p>
                <p>Price: Rs. <span className='price'>{product.price}</span> </p>
                <del>Rs. {product.price * 5}</del>
                <p>Quantity: {product.quantity}</p>
              </div>
              <hr />
            </div>
          )}
          <div className="price-details">
            <div>
              <p>MRP Total : </p>
              <p>₹{(cart.length > 0 ? cart.reduce((acc, item) => acc + item.price * 5 * item.quantity, 0) : product.price * 5 * product.quantity).toFixed(2)}</p>
            </div>
            <div>
              <p>Discount on MRP :</p>
              <p>{totalDiscount}</p>
            </div>
            <div>
              <p>Subtotal :</p>
              <p>₹{totalPrice}</p>
            </div>
            <div>
              <p>Shipping :</p>
              <p>To be calculated </p>
            </div>
            <hr />
            <div className='FinalPrice'>
              <p>To Pay :</p>
              <p>₹{totalPrice}</p>
            </div>


          </div>
        </div>
      )}

    </div>
  );

  return (
    <div className="checkout-popup">
      <div className="checkout-content">
        <div className="checkout-header">
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
          <img src={logo} alt="Logo" className="checkout-logo" />
          <ul className="checkout-steps">
            <li className={step === 'mobile' ? 'active' : ''}>Mobile</li>
            <li className={step === 'address' ? 'active' : ''}>Address</li>
            <li className={step === 'pay' ? 'active' : ''}>Pay</li>
          </ul>
        </div>
        {orderSummary}
        {step === 'mobile' && (
          <div className="checkout-step">
            <div className='mobile'>
              <input
                type="text"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                name="mobile"
                style={{ borderColor: formik.errors.mobile ? 'red' : 'black' }}
              />
             {error && <div className='Error'>{error}</div>}
            </div>
            <div className='button-section' style={{backgroundColor:'#909090'}} onClick={handleMobile}>
              <button >Continue</button>
              <FaArrowRightLong />
            </div>
          </div>
        )}

        {step === 'address' && (
          <div className="checkout-step">
            <form onSubmit={formik.handleSubmit}>
              <div className='form-details'>
              <div className="pincode">
                <input
                  type="text"
                  placeholder="Enter your Pincode"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                  name="pincode"
                />
                {formik.touched.pincode && formik.errors.pincode && <div className='Error'>{formik.errors.pincode}</div>}

              </div>
              <div className="city-state">
                <div className='city'>
                  <input
                    type="text"
                    placeholder="City"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    name="city"
                  />
                  {formik.touched.city && formik.errors.city && <div className='Error'>{formik.errors.city}</div>}
                </div>
                <div className='state'>
                  <input
                    type="text"
                    placeholder="State"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    name="state"
                  />

                  {formik.touched.state && formik.errors.state && <div className='Error'>{formik.errors.state}</div>}
                </div>
              </div>

              <div className="fullname"> <input
                type="text"
                placeholder="Full Name"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                name="fullname"
              />
                {formik.touched.fullname && formik.errors.fullname && <div className='Error'>{formik.errors.fullname}</div>}
              </div>

              <div className="email">
                <input
                  type="text"
                  placeholder="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                />
                {formik.touched.email && formik.errors.email && <div className='Error'>{formik.errors.email}</div>}
              </div>
              <div className="address">
                <textarea
                  className='checkout-textarea'
                  placeholder="Full Address (House no., Area, etc) *"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  name="address"
                />
                {formik.touched.address && formik.errors.address && <div className='Error'>{formik.errors.address}</div>}

              </div>
              <p>Address Type</p>
              <div className='address-type'>
                <label  className={type === 'home' ? 'active' : ''}>
                  <input type="radio" name="type" id="home" value="home" onClick={(e) => setType(e.target.value)} />
                  Home
                </label >
                <label  className={type === 'work' ? 'active' : ''}>
                  <input type="radio" name="type" id="work" value="work" onClick={(e) => setType(e.target.value)} />
                  Work
                </label>
              </div>
              </div>

              <button  type='submit' className='button-section'>
                <button >Continue</button>
                <FaArrowRightLong />
              </button>
            </form>
          </div>
        )}

        {step === 'pay' && (
          <div className="checkout-step">
            <div className='button-section' onClick={handleContinue}>
              <button >Pay</button>
              <FaArrowRightLong />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Checkout;
