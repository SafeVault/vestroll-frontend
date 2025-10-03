import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slice/modalSlice";

export const Store = () => {
  return configureStore({
    reducer: {
      modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // We intentionally store React nodes and functions inside modal state
        // for UI composition, so ignore serializability checks for this slice
        serializableCheck: {
          ignoredPaths: [
            "modal.modalProps",
          ],
          ignoredActions: [
            "modal/openModal",
            "modal/closeModal",
            "modal/resetModal",
          ],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof Store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
