import AuthHeader from "@/components/auth/AuthHeader";
import AuthLayer from "@/components/auth/AuthLayer";
import OtpForm from "@/components/auth/OtpForm";
import Stepper from "@/components/auth/Stepper";
import Btn from "@/components/ui/Btn";
import Link from "next/link";

function VerifyEmailPage() {
  return (
    <AuthLayer>
      <div className="max-w-md mx-auto  space-y-12">
        <Stepper totalSteps={5} currentStep={3} />
        <AuthHeader
          title="Verify your email address"
          description="Please enter the verification code sent to 
your email account za**ab@gmail.com"
        />
        <OtpForm />

        <div className="space-y-8">
          <Btn variant="primary" text="Verify" />
          <div className="flex items-center justify-center">
            <Link
              href={""}
              className="text-primary-500 text-base font-medium text-center"
            >
              Didn’t get the code?
            </Link>
          </div>
        </div>
      </div>
    </AuthLayer>
  );
}
export default VerifyEmailPage;
