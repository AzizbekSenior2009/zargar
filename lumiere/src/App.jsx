import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import TopBar from './components/TopBar/TopBar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Collections from './pages/Collections/Collections';
import About from './pages/About/About';
import Journal from './pages/Journal/Journal';
import BlogArticle from './pages/BlogArticle/BlogArticle';
import Contact from './pages/Contact/Contact';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Wishlist from './pages/Wishlist/Wishlist';
import Account from './pages/Account/Account';
import TrackOrder from './pages/TrackOrder/TrackOrder';
import SearchResults from './pages/SearchResults/SearchResults';
import NotFound from './pages/NotFound/NotFound';
import Privacy from './pages/Privacy/Privacy';

function App() {
  return (
    <>
      <ScrollToTop />
      <TopBar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<BlogArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<Account />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
