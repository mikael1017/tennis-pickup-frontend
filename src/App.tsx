import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import Search from './pages/search';
import Details from './pages/details';

import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/search/*" element={<Search />} />
          <Route path="/details/*" element={<Details />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/profile/*" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
