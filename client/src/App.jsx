// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Body from './components/Body';
import HomeHeader from './components/HomeHeader';
import TemplateSelection from './components/TemplateSelection';
import { Home, Login, Profile, Signup, ProfileCard } from '../src/pages';
import ProtectedRoute from './utils/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <Router>
      <div className="min-h-screen">
        <HomeHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/sign-up" element={<Signup />} /> */}
          <Route path="/about" element={<About />} />
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/profile-card" element={<ProfileCard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resume-builder" element={<Body />} />
            <Route path="/templates" element={<TemplateSelection />} />
          {/* </Route> */}
        </Routes>
        <ToastContainer theme={'dark'} autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
