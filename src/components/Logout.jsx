import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogout = () => {
        logOut(); // Call the logOut function from AuthProvider to handle logout
        alert("Sign-out successful!");
        navigate(from, { replace: true }); // Optionally navigate to the previous or home page
    };

    return (
        <div className='h-screen bg-teal-100 flex items-center justify-center'>
            <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Logout;
