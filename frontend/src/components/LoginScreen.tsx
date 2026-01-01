import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import imgLogo from "figma:asset/c7331baf757474afb91e9105f759afebcb9348c1.png";
import imgDecoration from "figma:asset/be073e5aa3e2ca42e0dd11c29ef94997023107e0.png";
import { UserRole } from '../App';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  onNavigateToRegister?: () => void;
}

export default function LoginScreen({ onLogin, onNavigateToRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Simple demo login - in production would validate credentials
    onLogin('student');
  };

  const handleDemoLogin = (role: UserRole) => {
    onLogin(role);
  };

  return (
    <div className="min-h-full bg-white overflow-y-auto scrollbar-hide relative">
      {/* Decorative Background */}
      <div className="absolute h-[529px] left-[-80px] top-[-96px] w-[298px] pointer-events-none">
        <img 
          alt="" 
          className="w-full h-full object-cover" 
          src={imgDecoration} 
        />
      </div>

      {/* Content */}
      <div className="relative px-6 pt-16 pb-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-6">
          <img 
            src={imgLogo} 
            alt="SILab Suite Logo" 
            className="w-20 h-20 mb-4"
          />
          <h1 className="mb-2" style={{ fontSize: '18px', fontWeight: 700 }}>
            Welcome back
          </h1>
          <p className="text-[var(--text-secondary)]" style={{ fontSize: '16px' }}>
            Sign in to continue to SILab Suite
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white border border-[#E8E8E8] rounded-[16px] p-6 mb-6">
          {/* Email Input */}
          <div className="mb-4">
            <label className="block mb-2" style={{ fontSize: '16px', color: '#6B6B6B' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@itb.ac.id"
              className="w-full h-12 px-4 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#0F2A71] placeholder:text-[rgba(17,17,17,0.5)]"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <label className="block mb-2" style={{ fontSize: '16px', color: '#6B6B6B' }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 px-4 pr-12 bg-white border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#0F2A71] placeholder:text-[rgba(17,17,17,0.5)]"
                style={{ fontSize: '16px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mb-6">
            <button className="text-[#0F2A71]" style={{ fontSize: '16px' }}>
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full h-12 bg-[#0F2A71] text-white rounded-[12px] hover:opacity-90 transition-opacity mb-6"
            style={{ fontSize: '16px' }}
          >
            Log in
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#E8E8E8]" />
            <span style={{ fontSize: '16px', color: '#6B6B6B' }}>or</span>
            <div className="flex-1 h-px bg-[#E8E8E8]" />
          </div>

          {/* Google Sign In */}
          <button className="w-full h-12 bg-white border border-[#E8E8E8] rounded-[12px] flex items-center justify-center gap-3 hover:bg-[#F5F5F5] transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.8 10.2273C19.8 9.51819 19.7364 8.83637 19.6182 8.18182H10.2V12.05H15.6109C15.3727 13.3 14.6582 14.3591 13.5864 15.0682V17.5773H16.8182C18.7091 15.8364 19.8 13.2727 19.8 10.2273Z" fill="#4285F4"/>
              <path d="M10.2 20C12.9 20 15.1636 19.1045 16.8182 17.5773L13.5864 15.0682C12.6864 15.6682 11.5409 16.0227 10.2 16.0227C7.59545 16.0227 5.38182 14.2636 4.58636 11.9H1.25455V14.4909C2.90909 17.7591 6.31364 20 10.2 20Z" fill="#34A853"/>
              <path d="M4.58636 11.9C4.38636 11.3 4.27273 10.6591 4.27273 10C4.27273 9.34091 4.38636 8.7 4.58636 8.1V5.50909H1.25455C0.572727 6.85909 0.2 8.38636 0.2 10C0.2 11.6136 0.572727 13.1409 1.25455 14.4909L4.58636 11.9Z" fill="#FBBC04"/>
              <path d="M10.2 3.97727C11.6682 3.97727 12.9818 4.48182 14.0091 5.47273L16.8727 2.60909C15.1591 0.990909 12.8955 0 10.2 0C6.31364 0 2.90909 2.24091 1.25455 5.50909L4.58636 8.1C5.38182 5.73636 7.59545 3.97727 10.2 3.97727Z" fill="#EA4335"/>
            </svg>
            <span style={{ fontSize: '16px', color: '#111' }}>Sign in with Google</span>
          </button>
        </div>

        {/* Demo Buttons */}
        <div className="bg-[#F3F3F3] rounded-[12px] p-4 mb-4">
          <p className="text-center mb-3" style={{ fontSize: '16px', color: '#6B6B6B' }}>
            Quick Demo Access
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleDemoLogin('student')}
              className="flex-1 h-10 bg-white border border-[#E8E8E8] rounded-[8px] text-[#0F2A71] hover:bg-[#0F2A71] hover:text-white transition-colors"
              style={{ fontSize: '16px' }}
            >
              Student
            </button>
            <button
              onClick={() => handleDemoLogin('assistant')}
              className="flex-1 h-10 bg-white border border-[#E8E8E8] rounded-[8px] text-[#0F2A71] hover:bg-[#0F2A71] hover:text-white transition-colors"
              style={{ fontSize: '16px' }}
            >
              Assistant
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="flex-1 h-10 bg-white border border-[#E8E8E8] rounded-[8px] text-[#0F2A71] hover:bg-[#0F2A71] hover:text-white transition-colors"
              style={{ fontSize: '16px' }}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p style={{ fontSize: '12px', color: '#6B6B6B' }}>
            Don't have an account?{' '}
            <button 
              onClick={onNavigateToRegister}
              className="text-[#0F2A71]"
              style={{ fontSize: '12px', fontWeight: 600 }}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}