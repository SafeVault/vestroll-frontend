import { ReactNode } from "react";

export interface BtnProp {
  variant: "primary" | "secondary" | "outline"; // add button type here
  onclick?: () => void;
  text: string;
}
export interface AuthLayoutProps {
  children: ReactNode;
}
