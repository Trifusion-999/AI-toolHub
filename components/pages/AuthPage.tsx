import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, User, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  general?: string;
}

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const { login, register, verifyCode, user } = useAuth();

  // Validation rules
  const passwordRules: ValidationRule[] = [
    {
      test: (password) => password.length >= 8,
      message: 'At least 8 characters'
    },
    {
      test: (password) => /[A-Z]/.test(password),
      message: 'One uppercase letter'
    },
    {
      test: (password) => /[a-z]/.test(password),
      message: 'One lowercase letter'
    },
    {
      test: (password) => /\d/.test(password),
      message: 'One number'
    },
    {
      test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
      message: 'One special character'
    }
  ];

  // Validation functions
  const validateUsername = (username: string): string | null => {
    if (!username.trim()) {
      return 'Username is required';
    }
    if (username.length < 3) {
      return 'Username must be at least 3 characters';
    }
    if (username.length > 20) {
      return 'Username must be less than 20 characters';
    }
    if (!/^[a-zA-Z0-9_@.-]+$/.test(username)) {
      return 'Username can only contain letters, numbers, and @._- characters';
    }
    return null;
  };

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const validatePassword = (password: string, isSignup: boolean = false): string | null => {
    if (!password) {
      return 'Password is required';
    }
    
    if (!isSignup) {
      // For login, just check if password is provided
      return null;
    }

    // For signup, apply all validation rules
    const failedRules = passwordRules.filter(rule => !rule.test(password));
    if (failedRules.length > 0) {
      return `Password must contain: ${failedRules.map(rule => rule.message.toLowerCase()).join(', ')}`;
    }
    
    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate username
    const usernameError = validateUsername(formData.username);
    if (usernameError) {
      newErrors.username = usernameError;
    }

    // Validate email (only for signup)
    if (!isLogin) {
      const emailError = validateEmail(formData.email);
      if (emailError) {
        newErrors.email = emailError;
      }
    }

    // Validate password
    const passwordError = validatePassword(formData.password, !isLogin);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      if (isLogin) {
        const success = await login(formData.username, formData.password);
        if (success) {
          setShowVerification(true);
        } else {
          setErrors({ general: 'Invalid username or password' });
        }
      } else {
        const success = await register(formData.username, formData.email, formData.password);
        if (success) {
          setShowVerification(true);
        } else {
          setErrors({ general: 'Registration failed. Username or email may already exist.' });
        }
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      return;
    }

    if (verificationCode.length !== 6) {
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await verifyCode(verificationCode);
      if (success) {
        setShowVerification(false);
      }
    } catch (error) {
      // Handle verification error
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Clear general error when user starts typing
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: undefined
      }));
    }
  };

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    const passedRules = passwordRules.filter(rule => rule.test(password));
    return {
      score: passedRules.length,
      total: passwordRules.length,
      rules: passwordRules.map(rule => ({
        ...rule,
        passed: rule.test(password)
      }))
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (showVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900"
              >
                <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                Verify Your Account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                We've sent a 6-digit verification code to your account
              </p>
              {user?.verificationCode && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Demo Code:</strong> {user.verificationCode}
                  </p>
                </div>
              )}
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleVerification}>
              <div>
                <label htmlFor="verification-code" className="sr-only">
                  Verification Code
                </label>
                <input
                  id="verification-code"
                  name="verification-code"
                  type="text"
                  maxLength={6}
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-center text-2xl font-mono tracking-widest"
                  placeholder="000000"
                />
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || verificationCode.length !== 6}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Verify Account'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <span className="text-white font-bold text-2xl">AI</span>
            </motion.div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={handleModeSwitch}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Display general error */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2"
            >
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-700 dark:text-red-300">{errors.general}</span>
            </motion.div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Username field */}
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
                      errors.username 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    } placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700`}
                    placeholder="Username"
                  />
                </div>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.username}</span>
                  </motion.p>
                )}
              </div>

              {/* Email field (signup only) */}
              {!isLogin && (
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required={!isLogin}
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
                        errors.email 
                          ? 'border-red-300 dark:border-red-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      } placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700`}
                      placeholder="Email address"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.email}</span>
                    </motion.p>
                  )}
                </div>
              )}

              {/* Password field */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`appearance-none relative block w-full pl-10 pr-10 py-3 border ${
                      errors.password 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    } placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.password}</span>
                  </motion.p>
                )}

                {/* Password strength indicator (signup only) */}
                {!isLogin && formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Password Strength
                      </span>
                      <span className={`text-xs font-medium ${
                        passwordStrength.score === passwordStrength.total 
                          ? 'text-green-600 dark:text-green-400' 
                          : passwordStrength.score >= 3 
                          ? 'text-yellow-600 dark:text-yellow-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {passwordStrength.score}/{passwordStrength.total}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {passwordStrength.rules.map((rule, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          {rule.passed ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <div className="h-3 w-3 rounded-full border border-gray-300 dark:border-gray-500" />
                          )}
                          <span className={rule.passed ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                            {rule.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>{isLogin ? 'Signing in...' : 'Signing up...'}</span>
                  </div>
                ) : (
                  <span>{isLogin ? 'Sign in' : 'Sign up'}</span>
                )}
              </motion.button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Demo Credentials:</h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div><strong>User:</strong> aman@example.com / Aman@123</div>
              <div><strong>Admin:</strong> avinash@example.com / Avinash@123</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;