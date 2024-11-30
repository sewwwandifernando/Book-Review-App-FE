// ForbiddenPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <p className="text-2xl mt-4">Access Forbidden</p>
      <p className="mt-2">You do not have permission to view this page.</p>
      <Link to="/" className="mt-4 text-blue-600 underline">
        Go back to home
      </Link>
    </div>
  );
};

export default ForbiddenPage;
