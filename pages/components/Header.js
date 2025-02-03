import React from 'react';

import { useRouter } from 'next/router';


const Header = () => {

  const router = useRouter();

  const username = localStorage.getItem('username');

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">User Management</h1>
      {username && (
        <div className="flex items-center">
          <span className="mr-4">Welcome, {username}</span>
        </div>
      )}
    </header>
  );
};


export default Header;