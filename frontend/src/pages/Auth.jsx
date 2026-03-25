import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Auth() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (isLogin) {

        const res = await API.post("/auth/login", {
          email: user.email,
          password: user.password
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login successful");

        navigate("/");

      } else {

        await API.post("/auth/register", user);

        alert("Registration successful");

        setIsLogin(true);

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-lg p-8 w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">

          {isLogin ? "Login" : "Register"}

        </h2>

        <form onSubmit={handleSubmit}>

          {!isLogin && (

            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full border p-2 mb-4 rounded"
            />

          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-2 mb-4 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <p className="text-center mt-4">

          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 ml-2"
          >
            {isLogin ? "Register" : "Login"}
          </button>

        </p>

      </div>

    </div>

  );

}

export default Auth;