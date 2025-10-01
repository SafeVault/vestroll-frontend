'use client';

import ForgotPasswordPage from '@/components/forgot-password-page';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
  

function handleForgotPassword(){
    console.log('Forgot password clicked');
    // Implement forgot password logic here
    router.push("/forgotpassword")

}

  const handleBackToLogin= () => {
    console.log('Forgot password clicked');
    // Implement forgot password logic here
    router.push("/login")

  };

  return (
    <div data-theme="light">
      <ForgotPasswordPage
        onBackToLogin={handleBackToLogin}
        
      />
    </div>
  );
}
