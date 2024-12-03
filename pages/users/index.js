import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useTable } from 'react-table';
import { useRouter } from 'next/router';
import axios from 'axios';
import { apiUrl } from '@/constant/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchUsers = async ({ queryKey }) => {
  const [, { limit, page }] = queryKey;
  const { data } = await axios.get(`${apiUrl}/api/users`, {
    params: { limit, page },
  });

  return data;
};

const deleteUser = async (id) => {
  await axios.delete(`${apiUrl}/api/users/${id}`);
};

const UserTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5; // limit pada tabel
  const page = currentPage;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery(
    ['users', { limit, page }],
    fetchUsers,
    {
      keepPreviousData: true,
    }
  );

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      toast.success('User Berhasil Dihapus');
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
      { Header: 'Profile Image', accessor: 'profileImage' },
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
    data: data || [],
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleDelete = (id) => {
    if (window.confirm('Yakin Ingin Menghapus User?')) {
      deleteMutation.mutate(id);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (data?.length === limit) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <button
            onClick={() => router.push('/users/CreateUserPage')}
            className="bg-green-500 text-white px-4 py-2 rounded">
            Tambah User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="table-auto w-full border-collapse bg-white rounded-lg shadow-md">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="bg-blue-100">
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-6 text-gray-500">
                    No data available.
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="even:bg-gray-50 hover:bg-gray-100">
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-4 py-2 text-gray-600 border-b">
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50">
            Previous
          </button>
          <div className="text-sm text-gray-700">
            Page {currentPage}
          </div>
          <button
            onClick={handleNextPage}
            disabled={data?.length < limit}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
