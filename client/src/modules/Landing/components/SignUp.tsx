import React, { useState } from "react";
const api = import.meta.env.VITE_API_LOCAL;
import axios from "axios";
import "../../../style/index.css";

import Notification from "../../../global/Notification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    age: 0,
    password: "null",
  });

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function sendForm(e: React.FormEvent<HTMLFormElement>) {
    try {
        console.log('sending the forrm...')
      e.preventDefault();
      const response = await axios.post(`${api}/users`, {form: form});

      console.log(response.data);

      const notify = () =>
        toast.warning("message", {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        });

      notify();
    } catch (error) {
      console.log(error);
    }
  }

  /*________________
  |   FUNCTIONS   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    console.log("looks this --> ", id, value);
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>

        <form onSubmit={sendForm} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Names
            </label>
            <input
              type="text"
              id="name"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Lastnames
            </label>
            <input
              type="text"
              id="last_name"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your lastnames"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      {/* <Notification /> */}
    </div>
  );
};

export default SignUp;
