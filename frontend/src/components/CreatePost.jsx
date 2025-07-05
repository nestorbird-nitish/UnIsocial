import React, { useState, useRef } from 'react';
import { Upload, Image, Sparkles, X, Send } from 'lucide-react';

const CreatePost = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [showAIModal, setShowAIModal] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleGenerateAI = async () => {
        if (!aiPrompt.trim()) return;

        setIsGenerating(true);

        // Simulate AI generation (replace with actual AI API call)
        setTimeout(() => {
            const generatedPost = `Based on your prompt "${aiPrompt}", here's a generated post:

✨ ${aiPrompt.charAt(0).toUpperCase() + aiPrompt.slice(1)} ✨

This is an AI-generated post that captures the essence of your idea. Feel free to edit and customize it to match your voice and style!

#AIGenerated #Creative #PostIdea`;

            setCaption(generatedPost);
            setIsGenerating(false);
            setShowAIModal(false);
            setAiPrompt('');
        }, 2000);
    };

    const handleCreatePost = () => {
        if (!image && !caption.trim()) {
            alert('Please add an image or caption to create a post');
            return;
        }

        console.log('Creating post:', { image, caption });
        alert('Post created successfully!');

        // Reset form
        setImage(null);
        setCaption('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">

                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900">What's New </h2>
                    <p className="text-gray-600 mt-1">share with others</p>
                </div>


                <div className="p-6 space-y-6">
                    
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
                            className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                        >
                            Post
                        </button>
                        <button
                            onClick={() => {
                                setImage(null);
                                setCaption('');
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }   
                            }}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
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