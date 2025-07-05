import React, { useState } from 'react';
import { Heart, MessageCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PostCard = ({ post }) => {
    const [isLiked, setIsLiked] = useState(post?.isLiked || false);
    const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
    const [showFullCaption, setShowFullCaption] = useState(false);
    const navigate = useNavigate();

    const defaultPost = {
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
    };

    const currentPost = post || defaultPost;
    const maxCaptionLength = 150;

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleComment = () => {
        console.log('Open comments for post:', currentPost.id);
    };


    const shouldShowMore = currentPost.caption.length > maxCaptionLength;
    const displayCaption = showFullCaption || !shouldShowMore
        ? currentPost.caption
        : currentPost.caption.substring(0, maxCaptionLength) + '...';

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm max-w-3xl mx-auto overflow-hidden">

            <div className="p-4">
                <p className="text-gray-900 text-sm leading-relaxed">
                    {displayCaption}
                </p>
                {shouldShowMore && !showFullCaption && (
                    <button
                        onClick={() => navigate(`/post/${currentPost.id}`)}
                        className="text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors duration-200 mt-2 cursor-pointer"
                    >
                        Show more
                    </button>
                )}
            </div>


            {currentPost.image && (
                <div className="relative">
                    <img
                        src={currentPost.image}
                        alt="Post content"
                        className="w-full h-80 object-cover"
                    />
                </div>
            )}


            <div className="p-4">

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                            {currentPost.user.avatar ? (
                                <img
                                    src={currentPost.user.avatar}
                                    alt={currentPost.user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <User size={20} className="text-gray-500" />
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {currentPost.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                2 hours ago
                            </p>
                        </div>
                    </div>
                </div>


                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={handleLike}
                            className={`flex items-center space-x-2 transition-colors duration-200 ${isLiked
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
                            <span className="text-sm font-medium">{currentPost.commentCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
