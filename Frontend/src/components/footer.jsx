import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <img src="/placeholder.svg" alt="YoMeEncargo Logo" width={32} height={32} />
          <span className="text-xl font-bold">YoMe<span className="text-purple-400">Encargo</span></span>
        </div>
        <div className="text-center text-sm text-gray-400">© 2024 Brand, Inc. - Privacy - Terms</div>
      </div>
    </footer>
  );
}

export default Footer;
