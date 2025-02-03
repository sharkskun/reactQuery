import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useTable } from 'react-table';
import { apiUrl } from '@/constant/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import TableUser from '../components/TableUser';
import Footer from '../components/Footer';
import SideNavbar from '../components/SideNavbar';
import { Disclosure } from '@headlessui/react';

const fetchUsers = async ({ queryKey }) => {
  const [, { limit, page, search }] = queryKey;
  const { data } = await axios.get(`${apiUrl}/api/users`, {
    params: { limit, page, search },
  });
  return data;
};

const deleteUser = async (id) => {
  await axios.delete(`${apiUrl}/api/users/${id}`);
};

const UserTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 5; // limit pada tabel
  const page = currentPage;
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery(
    ['users', { limit, page, search }],
    fetchUsers,
    {
      keepPreviousData: true,
    }
  );

  const deleteMutation = useMutation(deleteUser , {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      toast.success('User  Berhasil Dihapus');
    },
    onError: (error) => {
      toast.error('Gagal Menghapus User');
    },
  });


  const columns = useMemo(

    () => [
      { Header: 'ID', accessor: '_id' },
      { Header: 'Username', accessor: 'username' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Phone', accessor: 'phone' },
      { Header: 'Status', accessor: 'status', Cell: ({ value }) => (value ? 'Active' : 'Inactive') },
      {
        Header: 'Profile Image',
        accessor: 'profileImage',
        Cell: ({ value }) => (
          <img src={value} alt="profile image" className="h-10 w-10 rounded-full" />
        ),
      },
      { Header: 'Access Token', accessor: 'generateAccessToken' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleDelete(row.original._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => router.push(`/users/UpdateUserPage/${row.original._id}`)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Update
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({
    columns,

    data : data?.users || [],
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const handleDelete = (id) => {
    if (window.confirm('Yakin Ingin Menghapus User?')) {
      deleteMutation.mutate(id);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    if (data?.users.length === limit) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="min-h-screen flex">
      <SideNavbar />
      <div className="flex-1 flex flex-col bg-black pl-0">
        <ToastContainer />
        <Header />
        <TableUser
          data={data?.users || []}
          columns={columns}
          handleDelete={handleDelete}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          limit={limit}
          search={search}
          setSearch={setSearch}
        />
        <Disclosure />
        <Footer/>
      </div>
    </div>
  );
};
export default UserTable;
