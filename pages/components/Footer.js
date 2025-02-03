import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 fixed z-1 bottom-0 left-60 right-0">
      <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
</footer>
  );
};


export default Footer;

