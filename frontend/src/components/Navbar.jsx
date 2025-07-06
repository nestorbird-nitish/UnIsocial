import React, { useState, useEffect } from 'react';
import { User, Search, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    
    useEffect(() => {
        if (!searchQuery.startsWith('@') || searchQuery.length < 2) {
            setUsers([]);
            setShowDropdown(false);
            return;
        }

        const controller = new AbortController();
        const query = searchQuery.slice(1); // remove '@'

        const timeout = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:3000/api/users/search?query=${query}`, {
                    signal: controller.signal,
                });
                const data = await res.json();
                setUsers(data.users || []);
                setShowDropdown(true);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error("Search failed:", err.message);
                }
            } finally {
                setLoading(false);
            }
        }, 400); 

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [searchQuery]);

    const handleUserClick = (username) => {
        setSearchQuery('');
        setUsers([]);
        setShowDropdown(false);
        navigate(`/user/${username}`);
    };


    return (
        <nav className="bg-white px-4 sm:px-6 lg:px-8 z-50 relative">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0">
                        <div className="flex items-center cursor-pointer">
                            <div
                                onClick={() => navigate("/")}
                                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center"
                            >
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
                            <div className="relative flex gap-2 items-center w-full">
                                <div className="flex-1 max-w-lg mx-8 relative w-full">
                                    <form className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search size={20} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search @username..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500"
                                        />
                                    </form>

                                    {showDropdown && users.length > 0 && (
                                        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded shadow max-h-64 overflow-auto">
                                            {users.map((user) => (
                                                <li
                                                    key={user.id}
                                                    onClick={() => handleUserClick(user.username)}
                                                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <img
                                                        src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                                                        alt="avatar"
                                                        className="w-8 h-8 rounded-full mr-3"
                                                    />
                                                    <span>@{user.username}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <button
                                    onClick={() => navigate(`/user/${username}`)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                                >
                                    <div className="w-10 h-10 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200">
                                        <User size={18} className="text-gray-600" />
                                    </div>
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
