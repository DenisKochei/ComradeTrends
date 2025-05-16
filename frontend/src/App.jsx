import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Contacts } from "./pages/contacts.jsx";
import { Dashboard } from "./pages/Dashboard";
import { Header } from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { PrivateRoute } from "./components/PrivateRoute";
import { OnlyAdminPrivateRoute } from "./components/OnlyAdminPrivateRoute copy";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import { PostPage } from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import { Search } from "./pages/search";
import { PolicyPage } from "./pages/PolicyPage.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import GoogleAnalytics from "./components/GoogleAnalytics.jsx";

export default function App() {
  return (
    <div className="min-h-screen max-w-[1500px] mx-auto">z
      <BrowserRouter>
        <GoogleAnalytics />
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/Contacts" element={<Contacts />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
          <Route path="/post/:postslug" element={<PostPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/privacy-policy" element={<PolicyPage />} />
          <Route path="api/auth/verify/*" element={<Signin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
