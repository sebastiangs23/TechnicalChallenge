import React, { useState } from "react";
const api = import.meta.env.VITE_API_LOCAL;
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../style/index.css";

import Notification from "../../../global/Notification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    last_name: "",
    email: "",
    password: "",
  });

  /*__________________
  |   VALIDATIONS   */
  const validateForm = () => {
    let valid = true;
    let errors = {
      username: "",
      last_name: "",
      email: "",
      password: "",
    };

    if (form.username.length < 2 || form.username.length > 50) {
      errors.username = "Name must be between 2 and 50 characters";
      valid = false;
    }

    if (form.last_name.length < 2 || form.last_name.length > 50) {
      errors.last_name = "Last name must be between 2 and 50 characters";
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      errors.email = "Invalid email format";
      valid = false;
    }

    if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      valid = false;
    } else if (!/[A-Z]/.test(form.password)) {
      errors.password = "Password must contain at least one uppercase letter";
      valid = false;
    } else if (!/[a-z]/.test(form.password)) {
      errors.password = "Password must contain at least one lowercase letter";
      valid = false;
    } else if (!/[0-9]/.test(form.password)) {
      errors.password = "Password must contain at least one number";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  /*____________________________
  |   REQUEST TO THE SERVER   */
  async function sendForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:2337/server/functions/createUser`,
        { objectData: form },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Parse-Application-Id": "000",
            "X-Parse-REST-API-Key": "Yzhl06W5O7Vhf8iwlYBQCxs6hY8Fs2PQewNGjsl0",
          },
        }
      );
      console.log('response: ', response.data);
      
      if (response.data.result.status === "success") {
        const notify = () =>
          toast.success('success', {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
          });

        navigate("/home");
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("id_user", response.data.user._id);
        notify();

        clearForm();
      } else {
        const notify = () =>
          toast.error('Error', {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
          });

        notify();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*________________
  |   FUNCTIONS   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  function clearForm() {
    setForm({
      username: "",
      last_name: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={sendForm}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
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
            {errors.last_name && (
              <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
            )}
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
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
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

      <ToastContainer />
    </div>
  );
};

export default SignUp;
