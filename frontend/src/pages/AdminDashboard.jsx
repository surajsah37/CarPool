import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-4">

        <Link
          to="/admin/rides"
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Manage Rides
        </Link>

        <Link
          to="/admin/bookings"
          className="bg-green-500 text-white px-6 py-3 rounded"
        >
          View Bookings
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;