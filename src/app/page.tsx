// import VestRollAccountSelection from '@/components/accountType';
import TimesheetDetails from '@/components/dashboard/timesheet/TimesheetDetails';
import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <div>
      <TimesheetDetails />
      {/* redirect("/onboarding"); */}
    </div>
  );
}
