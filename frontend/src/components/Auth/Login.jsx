import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Lock, User2, AlertCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError('');
        setIsLoading(true);

        if (!loginData.username || !loginData.password) {
            const newErrors = {};
            if (!loginData.username) newErrors.username = 'Username is required';
            if (!loginData.password) newErrors.password = 'Password is required';
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        console.log("Hello");


        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error) {
            setGeneralError(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const ErrorText = ({ message }) => (
        <div className="flex items-center mt-1 text-red-600 text-sm">
            <AlertCircle size={14} className="mr-1" />
            {message}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <form className="space-y-4" onSubmit={handleLogin}>
                        {/* General Error */}
                        {generalError && (
                            <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                                <div className="flex items-center">
                                    <AlertCircle size={18} className="mr-2 text-red-600" />
                                    {generalError}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setGeneralError('')}
                                    className="text-red-400 hover:text-red-600"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <User2 size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={loginData.username}
                                    onChange={(e) =>
                                        setLoginData({ ...loginData, username: e.target.value })
                                    }
                                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${errors.email
                                        ? 'border-red-300 bg-red-50 focus:ring-red-300'
                                        : 'border-gray-300 focus:ring-gray-500'
                                        }`}
                                    placeholder="Enter your username"
                                />
                            </div>
                            {errors.username && <ErrorText message={errors.username} />}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={loginData.password}
                                    onChange={(e) =>
                                        setLoginData({ ...loginData, password: e.target.value })
                                    }
                                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${errors.password
                                        ? 'border-red-300 bg-red-50 focus:ring-red-300'
                                        : 'border-gray-300 focus:ring-gray-500'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {errors.password && <ErrorText message={errors.password} />}
                        </div>

                        {/* Forgot password */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-sm text-gray-600 hover:text-gray-900 transition duration-200"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    Signing in...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>


                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don&apos;t have an account?{' '}
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-gray-900 font-medium hover:text-gray-700 transition"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
