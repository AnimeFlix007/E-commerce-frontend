import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CartMenu from "./scenes/global/CartMenu";
import Navbar from "./scenes/global/Navbar";
import Home from "./scenes/Home/Home";
import ItemDetails from "./scenes/ItemDetails/ItemDetails";
import Footer from "./scenes/global/Footer";
import WishListMenu from "./scenes/global/WishListMenu";
import { ToastContainer } from "react-toastify";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:itemId" element={<ItemDetails />} />
        </Routes>
        <Footer />
        <CartMenu />
        <WishListMenu />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
