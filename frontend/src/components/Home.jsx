import React from 'react';
import { PostCard } from './PostCard';
import { FilterButtons } from './FilterButton';

const Home = () => {
    const samplePosts = [
        {
            id: 1,
            caption: "Just finished an amazing workout session! 💪 The gym was packed today but managed to get through my entire routine. There's something so satisfying about pushing your limits and feeling that burn. Remember, consistency is key - small steps every day lead to big changes over time. What's your favorite way to stay motivated during workouts?",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            user: {
                name: "John Doe",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            },
            likeCount: 24,
            commentCount: 8,
            isLiked: false
        },
        {
            id: 2,
            caption: "Beautiful sunset today! 🌅",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            user: {
                name: "Jane Smith",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            },
            likeCount: 12,
            commentCount: 3,
            isLiked: true
        },
        {
            id: 3,
            caption: "Coffee and coding - the perfect combination for a productive morning! ☕️💻 Working on some exciting new features for our app. The energy from this espresso is exactly what I needed to tackle these complex algorithms.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            user: {
                name: "Alex Johnson",
                avatar: null
            },
            likeCount: 18,
            commentCount: 5,
            isLiked: false
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <FilterButtons/>
            <div className="max-w-5xl mx-auto space-y-6">
                {samplePosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default Home