import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import Forms from "./components/Reg/Forms";
import ContactUs from "./components/ContactUs/ContactUs";
import NoPage from "./components/NoPage";
import Lessons from "./components/LessonsPlan/Lessons";
import Profile from "./components/Profiles/Profile";
import Payment from "./components/Payment/Payment";
import Instructions from "./components/Instructions/Instructions";
import { UserContext } from "./contexts/UserContext";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import Plans from "./components/LessonsPlan/Plans";
function App() {
  const { user, auth } = useContext(UserContext);

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
        {auth && (user.role_id === "2" || user.role_id === "3") && (
          <>
            <Header />
            <ScrollToTop />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Home />} />
              <Route exact path="/plan/:id" element={<Lessons />} />
              <Route exact path="/plan" element={<Lessons />} />
              <Route exact path="/contact" element={<ContactUs />} />
              <Route exact path="/profile/:id" element={<Profile />} />
              <Route exact path="/payment" element={<Payment />} />
              <Route exact path="/plans/:id" element={<Plans />} />
              <Route exact path="/instructions" element={<Instructions />} />
              <Route exact path="*" element={<NoPage />} />
            </Routes>
            <Footer />
          </>
        )}
        {!auth && (
          <>
            <Header />
            <ScrollToTop />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Forms />} />
              <Route exact path="/contact" element={<ContactUs />} />
              <Route exact path="/profile/:id" element={<Forms />} />
              <Route exact path="/plan/:id" element={<Home />} />
              <Route exact path="/plan" element={<Home />} />
              <Route exact path="/payment" element={<Forms />} />
              <Route exact path="/instructions" element={<Instructions />} />
              <Route exact path="*" element={<NoPage />} />
            </Routes>
            <Footer />
          </>
        )}
        {auth && user.role_id === "1" && (
          <Routes>
            <Route exact path="/profile/:id" element={<Profile />} />
            <Route exact path="*" element={<Profile />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
