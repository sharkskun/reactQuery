import { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '@/constant/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        toast.info("Your password do not match!");
        return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: true,
        password: formData.password
      });
      // console.log('Berhasil Registrasi:', response.data);
      toast.success(response.data.message);

    } catch (error) {
      // console.error('Error Registrasi:', error);
      toast.error("Register gagal ", error.response.data.message);
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
<ToastContainer/>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-black-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-black-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-black-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            </div>
            <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-black-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-red-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="confrimPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 text-red-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>

  );
}

// username, name, email, phone, password, confirmPassword