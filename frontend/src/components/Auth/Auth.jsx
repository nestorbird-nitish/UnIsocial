import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Flame, User2 } from 'lucide-react';

const Auth = () => {
    const [currentPage, setCurrentPage] = useState('login'); // 'login' or 'signup'
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Login form state
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Signup form state
    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Login data:', loginData);
            alert('Login successful!');
            setIsLoading(false);
        }, 1500);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (signupData.password !== signupData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Signup data:', signupData);
            alert('Account created successfully!');
            setIsLoading(false);
        }, 1500);
    };

    const LoginPage = () => (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User2 size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
                        </div>

                        
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                Forgot password?
                            </button>
                        </div>

                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            onClick={handleLogin}
                            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                    </div>

                    
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button
                                onClick={() => setCurrentPage('signup')}
                                className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const SignupPage = () => (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
                    <p className="text-gray-600 mt-2">Join us and start sharing</p>
                </div>

                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={signupData.fullName}
                                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={signupData.email}
                                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={signupData.password}
                                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={signupData.confirmPassword}
                                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
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
                        </div>

                        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                required
                                className="mr-2 w-4 h-4 bg-gray-400 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                            />
                            <label className="text-sm text-gray-600">
                                I agree to the{' '}
                                <button type="button" className="text-gray-900 hover:text-gray-700 transition-colors duration-200">
                                    Terms of Service
                                </button>
                                {' '}and{' '}
                                <button type="button" className="text-gray-900 hover:text-gray-700 transition-colors duration-200">
                                    Privacy Policy
                                </button>
                            </label>
                        </div>

                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            onClick={handleSignup}
                            className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    Creating account...
                                </>
                            ) : (
                                'Create account'
                            )}
                        </button>
                    </div>

                    {/* Switch to Login */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => setCurrentPage('login')}
                                className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200 cursor-pointer"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div className="relative">
            {currentPage === 'login' ? <LoginPage /> : <SignupPage />}
        </div>
    );
};

export default Auth;