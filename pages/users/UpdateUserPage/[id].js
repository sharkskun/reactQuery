import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { apiUrl } from '@/constant/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const fetchUser = async (id) => {
  const { data } = await axios.get(`${apiUrl}/api/users/${id}`);
  return data;
};

const updateUser = async ({ id, put }) => {
  await axios.put(`${apiUrl}/api/users/${id}`, put);
};

const UpdateUserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery(
    ['users', id],
    () => fetchUser(id),
    {
      enabled: !!id,
    }
  );

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    status: '',
  });

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users', id]);
      toast.success('User berhasil diperbarui');

      setTimeout(() => {
        router.push('/users');
      }, 2000);
    },
    onError: () => {
      toast.error('Gagal memperbarui user');
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      status: formData.status === 'Active',
    };
    mutation.mutate({ id, put: updatedData });
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Error: {error.message}</p>;

  if (data && !formData.username) {
    setFormData({
      username: data.username,
      name: data.name,
      email: data.email,
      phone: data.phone,
      status: data.status ? 'Active' : 'Inactive',
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ToastContainer />
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-black"required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-black"required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-black"required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-black"required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-black"required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPage;
