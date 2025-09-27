import VestRollAccountSelection from "@/components/accountType";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div>
      <VestRollAccountSelection />
<!--       redirect("/onboarding"); -->

    </div>
  );
}
