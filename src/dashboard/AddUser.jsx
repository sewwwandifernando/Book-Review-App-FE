import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'

const AddUser = () => {
    const { createUser } = useContext(AuthContext);

    const [error, setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/"


    const handleSignUp = async (event) => {
        
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const username = form.username.value;
        const password = form.password.value;

        try {
            await createUser(name, email, username, password);
            navigate(from, { replace: true });
        } catch (error) {
            setError('Sign-up failed. Please try again.');
        }
    };

  return (
    <div className='w-full'>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold">Add New Admin User</h1>
                        <form onSubmit={handleSignUp} className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input id="name" name="name" type="text" className="peer h-10 w-full border-b-2 border-gray-300" placeholder="Full Name" required />
                                </div>
                                <div className="relative">
                                    <input id="email" name="email" type="email" className="peer h-10 w-full border-b-2 border-gray-300" placeholder="Email Address" required />
                                </div>
                                <div className="relative">
                                    <input id="username" name="username" type="text" className="peer h-10 w-full border-b-2 border-gray-300" placeholder="Username" required />
                                </div>
                                <div className="relative">
                                    <input id="password" name="password" type="password" className="peer h-10 w-full border-b-2 border-gray-300" placeholder="Password" required />
                                </div>
                                {error && <p className="text-red-500">{error}</p>}
                                <div className="relative">
                                    <button type="submit" className="bg-blue-500 text-white rounded-md px-6 py-2">Create User</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
  )
}

export default AddUser