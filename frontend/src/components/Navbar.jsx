import React, { useState } from 'react';
import { User, Search, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const Navbar = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Search query:', searchQuery);
            // Implement search functionality here
        }
    };

    const handleProfileClick = () => {

        console.log('Navigate to profile');
    };

    const navigate = useNavigate();
    const token = localStorage.getItem('token');


    return (
        <nav className="bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0">
                        <div className="flex items-center cursor-pointer">
                            <div
                            onClick={() => navigate("/")}
                            className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                                <Flame size={24} className="text-white font-bold text-lg" />
                            </div>
                        </div>
                    </div>


                    <div className="flex items-center space-x-4">
                        {!token ? (
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 cursor-pointer border border-gray-400"
                            >
                                Login
                            </button>
                        ) : (



                            <div className="relative flex gap-2 items-center">

                                <div className="flex-1 max-w-lg mx-8">
                                    <form onSubmit={handleSearch} className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search size={20} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500"
                                        />
                                    </form>
                                </div>

                                <button
                                    onClick={handleProfileClick}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                                >
                                    <div className="w-10 h-10 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200">
                                        <User size={18} className="text-gray-600" />
                                    </div>
                                    {/* <span className="text-sm font-medium hidden sm:block">Profile</span> */}
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;