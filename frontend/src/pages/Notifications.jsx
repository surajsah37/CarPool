import { useEffect, useState } from "react";
import API from "../services/api";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await API.get("/notifications");
    setNotifications(res.data);
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n) => (
          <div key={n._id} className="bg-white p-3 mb-3 shadow rounded">
            <p>{n.message}</p>
            <p className="text-sm text-gray-400">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default Notifications;