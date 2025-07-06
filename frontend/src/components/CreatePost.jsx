import React, { useState, useRef } from 'react';
import { Upload, Image, Sparkles, X, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [showAIModal, setShowAIModal] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;


        setError('');


        if (file.size > 10 * 1024 * 1024) {
            setError('Image size must be less than 10MB');
            return;
        }


        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }

        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unisocial");
        formData.append('cloud_name', 'dtt3xtujx');

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/dtt3xtujx/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await res.json();
            return data.secure_url;
        } catch (err) {
            console.error('Upload error:', err);
            throw new Error('Failed to upload image to Cloudinary');
        }
    };



    const sendBackendRequest = async (postData, token) => {
        try {

            const response = await fetch('http://localhost:3000/api/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || 'Failed to create post');
            }

            return data;
        } catch (err) {
            console.error('Backend request error:', err);
            throw new Error('Failed to create post');
        }
    };

    const removeImage = () => {
        setImage(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setError('');
    };

    const handleGenerateAI = async () => {
        if (!aiPrompt.trim()) return;

        setIsGenerating(true);

        try {
            const token = localStorage.getItem('token');
            console.log(token);
            
            const response = await fetch('http://localhost:3000/api/posts/getAiCaption', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ aiPrompt }),
            });

            const data = await response.json();

            console.log(data);            

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to get AI caption');
            }

            setCaption(data.aiCaption); 

        } catch (error) {
            console.error('Error generating AI caption:', error.message);
            setError(error.message || 'Something went wrong while generating the caption');
        } finally {
            setIsGenerating(false);
            setShowAIModal(false);
            setAiPrompt('');
        }
    };



    const handleCreatePost = async () => {

        if (!image && !caption.trim()) {
            setError('Please add an image or caption to create a post');
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Unauthorized user');
        }


        setIsCreatingPost(true);
        setError('');
        setSuccess('');

        try {
            let imageUrl = '';


            if (imageFile) {
                imageUrl = await uploadImageToCloudinary(imageFile);
            }


            const postData = {
                caption: caption.trim(),
                ...(imageUrl && { image: imageUrl }),
                category: "MUSIC"
            };


            await sendBackendRequest(postData, token);


            setSuccess('Post created successfully!');


            setImage(null);
            setImageFile(null);
            setCaption('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }


            setTimeout(() => {
                setSuccess('');
                navigate("/");
            }, 1500);

        } catch (err) {
            setError(err.message || 'Failed to create post. Please try again.');
        } finally {
            setIsCreatingPost(false);
        }
    };

    const clearMessages = () => {
        setError('');
        setSuccess('');
    };

    return (
        <div className="max-w-3xl mx-auto py-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900">What's New</h2>
                    <p className="text-gray-600 mt-1">share with others</p>
                </div>

                <div className="p-6 space-y-6">

                    {error && (
                        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertCircle size={16} className="text-red-600" />
                            <span className="text-sm text-red-600">{error}</span>
                            <button
                                onClick={clearMessages}
                                className="ml-auto text-red-600 hover:text-red-800"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}


                    {success && (
                        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle size={16} className="text-green-600" />
                            <span className="text-sm text-green-600">{success}</span>
                            <button
                                onClick={clearMessages}
                                className="ml-auto text-green-600 hover:text-green-800"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}


                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Caption
                            </label>
                            <button
                                onClick={() => setShowAIModal(true)}
                                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer duration-200"
                            >
                                <Sparkles size={16} />
                                <span>Generate with AI</span>
                            </button>
                        </div>

                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="What's on your mind?"
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                        />
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">
                                {caption.length} characters
                            </span>
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Add Image
                        </label>

                        {!image ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors duration-200"
                            >
                                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600 mb-2">Click to upload an image</p>
                                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        ) : (
                            <div className="relative">
                                <img
                                    src={image}
                                    alt="Upload preview"
                                    className="w-full h-auto object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                >
                                    <X size={16} className="text-gray-600" />
                                </button>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>


                    <div className="flex space-x-3 pt-4">
                        <button
                            onClick={handleCreatePost}
                            disabled={isCreatingPost}
                            className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                            {isCreatingPost ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    <span>Creating Post...</span>
                                </>
                            ) : (
                                <span>Post</span>
                            )}
                        </button>
                        <button
                            onClick={() => {
                                setImage(null);
                                setImageFile(null);
                                setCaption('');
                                setError('');
                                setSuccess('');
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }
                            }}
                            disabled={isCreatingPost}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>


            {showAIModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-neutral-700/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Generate Post with AI</h3>
                            <button
                                onClick={() => setShowAIModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Describe what you want to post about
                                </label>
                                <textarea
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    placeholder="e.g., A motivational post about starting a new week, a funny observation about coffee, tips for productivity..."
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                                />
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={handleGenerateAI}
                                    disabled={!aiPrompt.trim() || isGenerating}
                                    className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer space-x-2"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            <span>Generating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} />
                                            <span>Generate</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowAIModal(false)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePost;