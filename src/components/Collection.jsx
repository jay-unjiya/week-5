import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/reducers';
import '../scss/Collection.scss';
import '../scss/loader.scss'
import wishlist from '../assets/wishlist.png';
import quickview from '../assets/quickview.png';
import compare from '../assets/compare.png';
import { openCart } from './Navbar';
import { addToCart } from '../store/reducers';
import Footer from './Footer';

const Collection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let data = useSelector((state) => state.products.products);
  let Cartdata = useSelector((state) => state.products.cart);
  const loading = useSelector((state) => state.products.loading);
  const errors = useSelector((state) => state.products.errors);
  console.log(Cartdata)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
    <div style={{display:'grid', placeContent:'center', height:'100vh'}}>
      {
        loading ? (
          <div className="loader"></div>
        ) : errors ? (
          <div>Failed to load products. Please try again later.</div>
        ) : (
          <div className="collection" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <div className="content">
              <span>Explore Your Style</span>
            </div>
            <div className="collection-items">
              {data && data[0]?.products.map((item, index) => (
                <div key={index} className="collection-card">
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
                    <button className="collection-btn" onClick={() => { dispatch(addToCart({ ...item, ['quantity']: 1 })); openCart() }}>Add To Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
    </>
  );
};

export default Collection;
