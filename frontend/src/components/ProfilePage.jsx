import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, LogOut, Heart, MessageCircle, Share, MoreHorizontal, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { PostCard } from './PostCard';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('Posts');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const tabs = ['Posts', 'Media', 'Likes', 'About'];

    const filters = [
        'All',
        'Technology',
        'Music',
        'Gaming',
        'Sports',
        'News',
        'Entertainment',
        'Education',
        'Travel',
        'Food'
    ];

    const userPosts = [
        {
            id: 1,
            content: "Just finished building an amazing React component library! The satisfaction of clean, reusable code never gets old. 🚀 #ReactJS #WebDev",
            timestamp: "2 hours ago",
            likes: 24,
            comments: 8,
            shares: 3,
            category: "Technology",
            hasImage: true
        },
        {
            id: 2,
            content: "Beautiful sunset from my morning run today. Sometimes the best inspiration comes from stepping away from the screen. 🌅 #Running #Nature",
            timestamp: "1 day ago",
            likes: 42,
            comments: 12,
            shares: 7,
            category: "Sports",
            hasImage: true
        },
        {
            id: 3,
            content: "Discovered this amazing jazz café downtown. The acoustics are incredible and the coffee is even better! Any other jazz lovers here? 🎵",
            timestamp: "3 days ago",
            likes: 18,
            comments: 5,
            shares: 2,
            category: "Music",
            hasImage: false
        },
        {
            id: 4,
            content: "Working on a new machine learning project that analyzes user behavior patterns. The preliminary results are fascinating! Can't wait to share more details soon.",
            timestamp: "1 week ago",
            likes: 67,
            comments: 23,
            shares: 15,
            category: "Technology",
            hasImage: false
        },
        {
            id: 5,
            content: "Tried making homemade pasta for the first time today. It's messier than I expected but so worth it! 🍝 #Cooking #Homemade",
            timestamp: "1 week ago",
            likes: 31,
            comments: 9,
            shares: 4,
            category: "Food",
            hasImage: true
        }
    ];

    const handleLogout = () => {
        console.log('Logging out...');
        // Add logout logic here
        alert('Logged out successfully!');
    };

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    

    const filteredPosts = selectedFilter === 'All'
        ? userPosts
        : userPosts.filter(post => post.category === selectedFilter);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-gray-600">JD</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                                <p className="text-gray-600">@johndoe</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <MapPin size={14} />
                                        <span>San Francisco, CA</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Calendar size={14} />
                                        <span>Joined March 2020</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
                                <Settings size={20} />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200"
                            >
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Bio and Stats */}
                    <div className="mt-4">
                        <p className="text-gray-700 mb-3">
                            Full-stack developer passionate about creating amazing user experiences.
                            Love coffee, jazz music, and clean code. Always learning something new! ☕️
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                            <ExternalLink size={14} />
                            <a href="#" className="text-blue-600 hover:underline">johndoe.dev</a>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                            <div>
                                <span className="font-semibold text-gray-900">1,234</span>
                                <span className="text-gray-600 ml-1">Following</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-900">5,678</span>
                                <span className="text-gray-600 ml-1">Followers</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-900">342</span>
                                <span className="text-gray-600 ml-1">Posts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 px-1 text-sm font-medium transition-colors duration-200 border-b-2 ${activeTab === tab
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

            {/* Filter Bar - Only show for Posts tab */}
            {activeTab === 'Posts' && (
                <div className="bg-white py-3">
                    <div className="max-w-3xl mx-auto px-4 rounded-lg">
                        <div className="relative">

                            {/* Filter buttons container */}
                            <div
                                id="filter-container"
                                className="flex space-x-3 overflow-x-auto scrollbar-hide scroll-smooth rounded-lg"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => handleFilterClick(filter)}
                                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedFilter === filter
                                                ? 'bg-gray-900 text-white shadow-sm'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>

                           
                        </div>
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="max-w-3xl mx-auto px-4 py-6">
                {activeTab === 'Posts' && (
                    <div className="space-y-6">
                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No posts found for "{selectedFilter}" category.</p>
                            </div>
                        ) : (
                            filteredPosts.map((post) => (
                                <PostCard/>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'Media' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">Media {item}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'Likes' && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Your liked posts will appear here.</p>
                    </div>
                )}

                {activeTab === 'About' && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">About John</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                I'm a passionate full-stack developer with over 5 years of experience building
                                web applications. I love creating clean, efficient code and amazing user experiences.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring new jazz clubs, going for runs,
                                or experimenting with new recipes in the kitchen. I believe in continuous learning
                                and always staying curious about new technologies.
                            </p>
                            <div className="pt-4 border-t border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-2">Skills & Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning', 'Jazz Music', 'Running', 'Cooking'].map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;