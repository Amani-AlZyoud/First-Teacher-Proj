import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Forms from "./components/Reg/Forms";
import ContactUs from "./components/ContactUs/ContactUs";
import NoPage from "./components/NoPage";
import Lessons from "./components/LessonsPlan/Lessons";
import Profile from "./components/Profiles/Profile";
import Payment from './components/Payment/Payment';
import Instructions from "./components/Instructions/Instructions";
import { AuthContextProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function App() {


  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <>

      <BrowserRouter>
      <ScrollToTop />
        <AuthContextProvider>
          <UserProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/login' element={<Forms/>}/>
          <Route exact path='/plan/:id' element={<Lessons/>}/>
          <Route exact path='/contact' element={<ContactUs/>}/>
          <Route exact path='/profile/:id' element={<Profile/>}/>
          <Route exact path='/payment' element={<Payment/>}/>
          <Route exact path='/instructions' element={<Instructions/>}/>
          <Route exact path="*" element={<NoPage />} />
        </Routes>
        <Footer />
        </UserProvider>
        </AuthContextProvider>
      </BrowserRouter>

    </>
  );
}

export default App;
