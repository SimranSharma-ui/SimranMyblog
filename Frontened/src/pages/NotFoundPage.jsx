import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-semibold text-red-600">404</h1>
            <p className="mt-2 text-lg text-gray-700">Page Not Found</p>
        </div>
    </div>
  );
}

export default NotFoundPage;
