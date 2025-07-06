import React, { useEffect, useState } from 'react';
import { FilterButtons } from './FilterButton';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HomePostCard } from './HomePostCard';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/posts");
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to fetch posts");

                setPosts(data.posts);
            } catch (err) {
                console.error("Error fetching posts:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-4">
            <div className="max-w-3xl mx-auto space-y-6 flex justify-end">
                <button
                    onClick={() => navigate("/new-post")}
                    className="bg-white flex items-center gap-2 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 cursor-pointer border border-gray-400"
                >
                    <Plus size={20} className='opacity-60' />
                    <span>Add Post</span>
                </button>
            </div>

            <FilterButtons />

            <div className="max-w-3xl mx-auto space-y-6 mt-4">
                {loading ? (
                    <p className="text-center text-gray-500">Loading posts...</p>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-500">No posts available.</p>
                ) : (
                    posts.map((post) => (
                        <HomePostCard key={post.id} post={post} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
