import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    ChevronLeft, ChevronRight, Settings, LogOut, Heart, MessageCircle,
    Share, MoreHorizontal, MapPin, Calendar, ExternalLink
} from 'lucide-react';
import { PostCard } from './PostCard';
import { formatDate } from '../utils/getDate';
import { checkIsCurrentUser } from '../utils/checkCurrentUser';

const ProfilePage = () => {
    const { username } = useParams();
    const [activeTab, setActiveTab] = useState('Posts');
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPersonalCard, setIsPersonalCard] = useState(false);

    const tabs = ['Posts', 'Media', 'Likes', 'About'];


    useEffect(() => {
        

        const fetchUser = async () => {
            setLoading(true);
            setError('');

            setIsPersonalCard(await checkIsCurrentUser(username));
            try {
                const res = await fetch(`http://localhost:3000/api/users/${username}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to fetch user');

                setUser(data.user);
                setPosts(data.user?.posts || []);

                console.log(data.user.posts);

            } catch (err) {
                setError(err.message);
                setUser(null);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        fetchUser();
    }, [username]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        alert('Logged out');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                <div className="text-lg">Loading profile...</div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                <div className="text-lg font-semibold">{error || 'User not found'}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-600">
                                    {user.username?.slice(0, 2).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
                                <p className="text-gray-600">@{user.username}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <MapPin size={14} />
                                        <span>{user.location || 'Unknown'}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Calendar size={14} />
                                        <span>Joined {formatDate(user.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            {isLoggedIn && (
                                <>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 cursor-pointer px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition duration-200"
                                    >
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-gray-700 mb-3">{user.bio || "This user hasn't added a bio."}</p>
                        {user.website && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                                <ExternalLink size={14} />
                                <a href={user.website} className="text-blue-600 hover:underline">{user.website}</a>
                            </div>
                        )}
                        <div className="flex items-center space-x-6 text-sm">
                            <div><span className="font-semibold">{user.following || 0}</span> Following</div>
                            <div><span className="font-semibold">{user.followers || 0}</span> Followers</div>
                            <div><span className="font-semibold">{posts.length}</span> Posts</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${activeTab === tab
                                        ? 'border-gray-900 text-gray-900'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            <div className="max-w-3xl mx-auto px-4 py-6">
                {activeTab === 'Posts' && isLoggedIn && (
                    <div className="space-y-6">
                        {posts.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                No posts found.
                            </div>
                        ) : (
                            posts.map((post) => (
                                (!loading && (<PostCard key={post.id} post={post} currentUser={user} isPersonalCard={isPersonalCard} />))
                            ))
                        )}
                    </div>
                )}


            </div>
        </div>
    );
};

export default ProfilePage;
