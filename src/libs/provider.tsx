"use client";

import { Provider } from "react-redux";
import { Store } from "./store";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  const store = Store();
  
  return <Provider store={store}>{children}</Provider>;
}