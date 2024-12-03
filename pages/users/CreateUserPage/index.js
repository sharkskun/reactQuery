import { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '/constant/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateUser() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    status: true,
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/api/users`, {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        password: formData.password,
      });

      toast.success('User berhasil dibuat!');
      setFormData({
        username: '',
        name: '',
        email: '',
        phone: '',
        status: true,
        password: '',
      });
    } catch (error) {
      toast.error(
        `Gagal membuat user: ${
          error.response?.data?.message || 'Terjadi kesalahan'
        }`
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">
          Create User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-black">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"required/>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"required/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"required/>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"required/>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-600">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
              className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"required>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"required/>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none">
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
