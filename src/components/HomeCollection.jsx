import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLimitedProducts } from '../store/reducers';
import '../scss/HomeCollection.scss';
import wishlist from '../assets/wishlist.png';
import quickview from '../assets/quickview.png';
import compare from '../assets/compare.png';
import { addToCart } from '../store/reducers';
import { openCart } from './Navbar';

const HomeCollection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let data = useSelector((state) => state.products.limitedProduct);
  const errors = useSelector((state) => state.products.errors);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchLimitedProducts(12));
  }, [dispatch]);
  console.log(data)

  return (
    <div className="home-collection">
      <div className="content">
        <span>Explore Your Style</span>
      </div>
      <div className="home-collection-items">
        {data && data[0]?.products.slice(4).map((item, index) => (
          <div key={index} className="home-collection-card">
            <div className="sale-tag">Sale</div>
            <div className="icon-container">
              <a href="#" className="icon-link"><img src={wishlist} alt="Wishlist" /></a>
              <a href="#" className="icon-link"><img src={quickview} alt="Quick View" /></a>
              <a href="#" className="icon-link"><img src={compare} alt="Compare" /></a>
            </div>
            <div onClick={() => navigate(`/product/${item.id}`)}>
              <img src={item.image} alt={item.title} />
            </div>
            <div className="product-info">
              <p className="product-title">{String(item.title).slice(0, 40)}...</p>
              <p>
                <span className="price">Rs. {item.price.toFixed(2)}</span>
                <del className="delPrice"> Rs. {(item.price * 5).toFixed(2)}</del>
              </p>
              <button className="home-collection-btn" onClick={() => { dispatch(addToCart({ ...item, ['quantity']: 1 })); openCart(); }}>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCollection;
