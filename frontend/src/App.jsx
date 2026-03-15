
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import OfferRide from "./pages/OfferRide";
import SearchRide from "./pages/SearchRide";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar */}

      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">

        <h1 className="text-xl font-bold">
          CarPool
        </h1>

        <div className="flex gap-6">

          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          
         

          <Link to="/offer" className="hover:text-gray-200">
            Offer Ride
          </Link>

          <Link to="/search" className="hover:text-gray-200">
            Search Ride
          </Link>
          
           <Link to="/mybookings" className="hover:text-gray-200">
           My Bookings
           </Link>

          <Link to="/register" className="hover:text-gray-200">
            Register
          </Link>

          <Link to="/login" className="hover:text-gray-200">
            Login
          </Link>
           
          
        </div>

      </nav>

      {/* Pages */}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/offer" element={<OfferRide />} />

        <Route path="/search" element={<SearchRide />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/mybookings" element={<MyBookings />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;