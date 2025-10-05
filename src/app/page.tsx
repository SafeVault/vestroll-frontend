// import VestRollAccountSelection from '@/components/accountType';
import { redirect } from 'next/navigation';
import CreatePassword from '@/components/reset-password/CreatePassword';

export default function Home() {
  return (
    <div>
      <CreatePassword />
      {/* redirect("/onboarding"); */}
    </div>
  );
}
