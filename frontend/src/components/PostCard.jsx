import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, User, Trash2, X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/getDate';

export const PostCard = ({ post, user, isPersonalCard }) => {
    const navigate = useNavigate();

    const {
        id,
        caption = '',
        image = '',
        likeCount: initialLikes = 0,
        commentCount: initialComments = 0,
        createdAt,
    } = post || {};

    const [isLiked, setIsLiked] = useState(post?.isLiked || false);
    const [likeCount, setLikeCount] = useState(initialLikes);
    const [commentCount, setCommentCount] = useState(initialComments);
    const [showFullCaption, setShowFullCaption] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [showCommentDialog, setShowCommentDialog] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);

    const maxCaptionLength = 150;


    useEffect(() => {
        const fetchLikeCount = async (postId) => {
            try {
                const res = await fetch(`http://localhost:3000/api/posts/${postId}/likes`);
                const data = await res.json();

                console.log(data);
                
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch like count');
                }

                setLikeCount(data.likeCount);
            } catch (err) {
                console.error("Error fetching like count:", err.message);
            }
        };

        fetchLikeCount(post.id);
    }, [post])

    const handleLike = async () => {
        if (isLiking) return;

        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please login to like posts');
            return;
        }


        const wasLiked = isLiked;
        setIsLiked(!wasLiked);
        setLikeCount(prev => wasLiked ? prev - 1 : prev + 1);
        setIsLiking(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:3000/api/posts/${id}/like`, {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to toggle like');
            }


            setIsLiked(data.isLiked);
            setLikeCount(data.likeCount);
        } catch (error) {
            console.error("Toggle like error:", error.message);

            // Revert 
            setIsLiked(wasLiked);
            setLikeCount(prev => wasLiked ? prev + 1 : prev - 1);
            setError('Failed to update like. Try again.');
        } finally {
            setIsLiking(false);
        }
    };

    const handleComment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please login to comment on posts');
            return;
        }

        setShowCommentDialog(true);
        setError('');
    };

    const handleSubmitComment = async () => {
        if (!commentText.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        const token = localStorage.getItem('token');
        setIsCommenting(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:3000/api/posts/${id}/comment`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: commentText.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add comment');
            }

            setCommentCount(prev => prev + 1);
            setSuccess('Comment added successfully!');
            setCommentText('');
            setShowCommentDialog(false);


            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            console.error("Error adding comment:", error.message);
            setError('Failed to add comment. Please try again.');
        } finally {
            setIsCommenting(false);
        }
    };

    const handleCloseCommentDialog = () => {
        setShowCommentDialog(false);
        setCommentText('');
        setError('');
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please login to delete posts');
            return;
        }

        if (!window.confirm("Are you sure you want to delete this post?")) return;

        setIsDeleting(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            console.log(data);


            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete post');
            }

            setSuccess('Post deleted successfully!');


            setTimeout(() => {
                setIsDeleted(true);
            }, 1500);
        } catch (err) {
            console.error("Error deleting post:", err.message);
            setError(err.message || 'Failed to delete post');
        } finally {
            setIsDeleting(false);
        }
    };

    const shouldShowMore = caption.length > maxCaptionLength;
    const displayCaption = showFullCaption || !shouldShowMore
        ? caption
        : `${caption.substring(0, maxCaptionLength)}...`;

        
    if (isDeleted) {
        return null;
    }

    console.log(isPersonalCard);


    return (
        <div className="relative bg-white rounded-lg border border-gray-200 shadow-sm max-w-3xl mx-auto overflow-hidden">

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-3 pr-12 mb-3">
                    <div className="flex items-center">
                        <div className="text-sm text-red-700 flex-1 mr-8">{error}</div>
                        <button
                            onClick={() => setError('')}
                            className="absolute right-3 top-3 text-red-400 hover:text-red-600"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border-l-4 border-green-400 p-3 pr-12 mb-3">
                    <div className="flex items-center">
                        <div className="text-sm text-green-700 flex-1 mr-8">{success}</div>
                        <button
                            onClick={() => setSuccess('')}
                            className="absolute right-3 top-3 text-green-400 hover:text-green-600"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}


            {isPersonalCard && !error && !success && (
                <div className="absolute top-3 right-3 z-10">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
                        title="Delete post"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )}

            <div className="p-3 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <User size={16} className="text-gray-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            {user?.username || 'Unknown User'}
                        </p>
                        <p className="text-xs text-gray-500">
                            {formatDate(createdAt)}
                        </p>
                    </div>
                </div>
            </div>


            {caption && (
                <div className="p-4 pb-2">
                    <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
                        {displayCaption}
                    </p>
                    {shouldShowMore && !showFullCaption && (
                        <button
                            onClick={() => setShowFullCaption(true)}
                            className="text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors duration-200 mt-1"
                        >
                            Show more
                        </button>
                    )}
                </div>
            )}


            {image && (
                <div className="relative w-full">
                    <img
                        src={image}
                        alt="Post content"
                        className="w-full max-h-96 object-contain bg-gray-50"
                        onError={(e) => {
                            console.error('Image failed to load:', image);
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}


            <div className="p-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={handleLike}
                            disabled={isLiking}
                            className={`flex items-center space-x-2 transition-all duration-200 disabled:opacity-50 ${isLiked
                                ? 'text-red-500 hover:text-red-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Heart
                                size={20}
                                className={isLiked ? 'fill-current' : ''}
                            />
                            <span className="text-sm font-medium">{likeCount}</span>
                        </button>

                        <button
                            onClick={handleComment}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                            <MessageCircle size={20} />
                            <span className="text-sm font-medium">{commentCount}</span>
                        </button>
                    </div>
                </div>
            </div>


            {showCommentDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Add Comment</h3>
                            <button
                                onClick={handleCloseCommentDialog}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write your comment..."
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="4"
                            maxLength="500"
                        />

                        <div className="flex items-center justify-between mt-4">
                            <span className="text-sm text-gray-500">
                                {commentText.length}/500
                            </span>
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleCloseCommentDialog}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitComment}
                                    disabled={isCommenting || !commentText.trim()}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <Send size={16} />
                                    <span>{isCommenting ? 'Posting...' : 'Post'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {isDeleting && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
                        <p className="text-sm text-gray-600 mt-2">Deleting post...</p>
                    </div>
                </div>
            )}
        </div>
    );
};