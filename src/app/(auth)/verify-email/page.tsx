'use client';
import AuthLayer from '@/components/auth/AuthLayer';
import Stepper from '@/components/auth/Stepper';
import EmailVerification from '@/components/emailVerificationModal';
import { useRouter } from 'next/navigation';

function VerifyEmailPage() {
  const router = useRouter();
  const mockEmail = 'zanab12ab@gmail.com';

  const handleVerify = async (otp: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const isValid = otp === '123456';

    if (isValid) {
      router.push('/onboarding/complete');
    }

    return isValid;
  };

  const handleResend = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Verification code resent!');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <AuthLayer>
      <div className="max-w-md mx-auto space-y-12">
        <Stepper totalSteps={5} currentStep={3} />
        <EmailVerification
          email={mockEmail}
          onVerify={handleVerify}
          onResend={handleResend}
          onGoBack={handleGoBack}
          resendCooldown={60}
          className="mt-8"
        />
      </div>
    </AuthLayer>
  );
}

export default VerifyEmailPage;
