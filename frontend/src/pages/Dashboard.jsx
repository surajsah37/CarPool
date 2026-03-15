import { Link } from "react-router-dom";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Welcome {user?.name}
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <Link
          to="/mybookings"
          className="bg-white shadow-lg p-6 rounded hover:bg-gray-100"
        >
          <h2 className="text-xl font-bold">My Bookings</h2>
          <p>View rides you booked</p>
        </Link>

        <Link
          to="/offer"
          className="bg-white shadow-lg p-6 rounded hover:bg-gray-100"
        >
          <h2 className="text-xl font-bold">Offer Ride</h2>
          <p>Create a new ride</p>
        </Link>

        <Link
          to="/search"
          className="bg-white shadow-lg p-6 rounded hover:bg-gray-100"
        >
          <h2 className="text-xl font-bold">Search Ride</h2>
          <p>Find available rides</p>
        </Link>

        <button
          onClick={()=>{
            localStorage.clear();
            window.location.href="/login";
          }}
          className="bg-red-500 text-white p-6 rounded"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Dashboard;