// import { useState } from "react";
// import API from "../services/api";

// function Register() {

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const res = await API.post("/auth/register", user);

//       alert("Registration Successful");

//       console.log(res.data);

//     } catch (error) {

//       console.log(error);
//       alert("Registration Failed");

//     }
//   };

//   return (

//     <div className="flex justify-center items-center h-screen bg-gray-100">

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-80"
//       >

//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Register
//         </h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           onChange={handleChange}
//           className="w-full border p-2 mb-3"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full border p-2 mb-3"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full border p-2 mb-3"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded"
//         >
//           Register
//         </button>

//       </form>

//     </div>

//   );
// }

// export default Register;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

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

      await API.post("/auth/register", user);

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);
      alert("Registration Failed");

    }

  };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
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
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;