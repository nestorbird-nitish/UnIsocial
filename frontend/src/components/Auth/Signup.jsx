import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (field, value) => {
        setSignupData({ ...signupData, [field]: value });
        setErrors((prev) => ({ ...prev, [field]: '' }));
        setGeneralError('');
    };

    const validateFields = () => {
        const newErrors = {};
        const { username, email, password, confirmPassword } = signupData;

        if (!username.trim()) newErrors.username = 'Username is required';
        else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters';

        if (!email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = 'Please enter a valid email address';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 8)
            newErrors.password = 'Password must be at least 8 characters long';

        if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (confirmPassword !== password)
            newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setSuccess(false);

        if (!validateFields()) return;

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: signupData.username,
                    email: signupData.email,
                    password: signupData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data?.field && data?.message) {
                    setErrors({ [data.field]: data.message });
                } else {
                    setGeneralError(data.message || 'Signup failed');
                }
                return;
            }

            setSuccess(true);
            setSignupData({ username: '', email: '', password: '', confirmPassword: '' });

            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setGeneralError('Something went wrong. Please try again.');
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
                    <p className="text-gray-600 mt-2">Join us and start sharing</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <form onSubmit={handleSignup} className="space-y-4">

                        {success && (
                            <div className="flex items-center bg-green-50 border border-green-200 p-3 rounded text-sm text-green-700">
                                <CheckCircle size={18} className="mr-2 text-green-600" />
                                Account created successfully! Redirecting...
                            </div>
                        )}

                        {generalError && (
                            <div className="flex items-center bg-red-50 border border-red-200 p-3 rounded text-sm text-red-700 justify-between">
                                <div className="flex items-center">
                                    <AlertCircle size={18} className="mr-2 text-red-600" />
                                    {generalError}
                                </div>
                                <button onClick={() => setGeneralError('')}>
                                    <X size={16} className="text-red-400 hover:text-red-600" />
                                </button>
                            </div>
                        )}

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <User size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={signupData.username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${errors.username ? 'border-red-300 bg-red-50 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-500'}`}
                                    placeholder="Enter your username"
                                />
                            </div>
                            {errors.username && <ErrorText message={errors.username} />}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <Mail size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={signupData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${errors.email ? 'border-red-300 bg-red-50 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-500'}`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && <ErrorText message={errors.email} />}
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
                                    value={signupData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${errors.password ? 'border-red-300 bg-red-50 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-500'}`}
                                    placeholder="Create a password"
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

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={signupData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${errors.confirmPassword ? 'border-red-300 bg-red-50 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-500'}`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && <ErrorText message={errors.confirmPassword} />}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || success}
                            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    Creating account...
                                </>
                            ) : success ? (
                                <>
                                    <CheckCircle size={18} className="mr-2" />
                                    Account created!
                                </>
                            ) : (
                                'Create account'
                            )}
                        </button>
                    </form>
                </div>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
