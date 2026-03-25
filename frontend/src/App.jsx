import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import OfferRide from "./pages/OfferRide";
import SearchRide from "./pages/SearchRide";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import DriverRoute from "./components/DriverRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminRides from "./pages/AdminRides";

function App() {

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

  };

  return (
    <BrowserRouter>

      {/* Navbar */}

      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">

        <h1 className="text-xl font-bold">
          CarPool
        </h1>

        <div className="flex gap-6 items-center">

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

          {!token ? (
            <>
              <Link to="/register" className="hover:text-gray-200">
                Register
              </Link>

              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}

        </div>

      </nav>

      {/* Routes */}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/offer" element={<OfferRide />} />

        <Route path="/search" element={<SearchRide />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/mybookings" element={<MyBookings />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/bookings" element={<AdminBookings />} />
<Route path="/admin/rides" element={<AdminRides />} />
       <Route
  path="/offer"
  element={
    <DriverRoute>
      <OfferRide />
    </DriverRoute>
  }
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;