'use client';

import LoginPage from '@/components/login-page';

export default function Login() {
  const handleLogin = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    console.log('Login data:', data);
    // Implement your login logic here
    // For example, make an API call to your authentication endpoint
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google OAuth logic here
  };

  const handleAppleLogin = () => {
    console.log('Apple login clicked');
    // Implement Apple OAuth logic here
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Implement forgot password logic here
  };

  return (
    <div data-theme="light">
      <LoginPage
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        onAppleLogin={handleAppleLogin}
        onForgotPassword={handleForgotPassword}
      />
    </div>
  );
}
