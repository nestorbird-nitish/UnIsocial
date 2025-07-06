// src/pages/PostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import { CommentCard } from '../components/CommentCard';
import { checkIsCurrentUser } from '../utils/checkCurrentUser';

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isPersonalCard, setIsPersonalCard] = useState(false);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/posts/${postId}`);
                const data = await res.json();

                if (res.ok) {
                    setPost(data.post);
                    setUser(data.user);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false)
            }
        };

        const fetchComments = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/posts/${postId}/comments`);
                const data = await res.json();

                if (res.ok) {
                    setComments(data.comments);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchPost();
        fetchComments();
        setLoading(false);
    }, [postId]);

    const username = localStorage.getItem('username');
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

            } catch (err) {
                setError(err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [username]);

    if (loading || !post || !user) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto py-6 space-y-8">
            <PostCard post={post} user={user} isPersonalCard={isPersonalCard} />

            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
                {comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
                ) : (
                    comments.map(comment => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))
                )}
            </div>
        </div>
    );
};

export default PostPage;
