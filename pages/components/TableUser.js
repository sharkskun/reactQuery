import React, { useState } from "react";
import { useTable } from "react-table";

const TableUser = ({
  data,
  columns,
  handleDelete,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  limit,
  search,
  setSearch,
}) => {
  const [selectedRow, setSelectedRow] = useState(null); // State untuk menyimpan baris yang dipilih
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Fungsi untuk menangani klik pada baris
  const handleRowClick = (row) => {
    // Jika baris sudah dipilih, maka toggle visibility
    if (selectedRow === row.index) {
      setSelectedRow(null); // Sembunyikan detail jika baris yang sama diklik
    } else {
      setSelectedRow(row.index); // Tampilkan detail jika baris baru diklik
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-lg p-6 my-4 mx-4">
      {/* Search Section */}
      <div className="mb-4">
        <button
          onClick={() => router.push("/users/CreateUserPage")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Tambah User
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full text-black"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="table-auto w-full border-collapse bg-white rounded-lg shadow-md"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-blue-100"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b"
                  >
                    {column.render("Header")}
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
                  className="text-center py-6 text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <>
                    <tr
                      {...row.getRowProps()}
                      className="even:bg-gray-50 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleRowClick(row)}
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-4 py-2 text-gray-600 border-b"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                    {/* Jika baris dipilih, tampilkan detail */}
                    {selectedRow === row.index && (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="bg-gray-200 text-left p-4"
                        >
                          <div className="text-gray-700">
                            <strong>Details for {row.cells[0].value}:</strong>
                            <p>Additional information...</p>
                            {/* Tampilkan lebih banyak detail sesuai kebutuhan */}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div className="text-sm text-gray-700">Page {currentPage}</div>
        <button
          onClick={handleNextPage}
          disabled={data.length < limit}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableUser;
