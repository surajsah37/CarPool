
import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between">

      <h1 className="text-xl font-bold">CarPool</h1>

      <div className="flex gap-5">
        <Link to="/">Home</Link>
        <Link to="/search">Find Ride</Link>

        {/* ✅ ONLY ADMIN CAN SEE */}
        {user?.role === "admin" && (
          <Link to="/offer">Offer Ride</Link>
        )}

        <Link to="/login">Login</Link>
      </div>

    </div>
  );
}

export default Navbar;