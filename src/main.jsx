import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store/store';
import './index.css';
import Sale from './components/Sale';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import ImageSection from './components/ImageSection';
import ImageSection2 from './components/ImageSection2';
import ProductPage from './components/ProductPage';
import HomeCollection from './components/HomeCollection';
import Collection from './components/Collection';
import Footer from './components/Footer';
import ViewCart from './components/viewCart';
import CommonRating from './components/commonRating';
import About from './components/about';
import ScrollToTop from './components/ScrollToTop';
import Signup from './components/Signup';
import Login from './components/Login';
import Confirm from './components/confirm';
import Home from './pages/Home';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <Router>
      {/* <ScrollToTop/> */}
      <Sale /> 
      <Navbar />
      <div className="content-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home/>
              </>
            }
          />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/viewcart" element={<ViewCart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirm" element={<Confirm />} />
          

        </Routes>
      </div>
      <Footer />
    </Router>
  </Provider>
);
