import AppShell from "../../components/app-shell";

export default function AppScopedLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}


