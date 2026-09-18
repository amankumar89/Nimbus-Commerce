"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: {
          background: "var(--color-surface)",
          color: "var(--color-text)",
          border: "1px solid var(--color-border)",
        },
        success: {
          iconTheme: {
            primary: "var(--color-success)",
            secondary: "var(--color-surface)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--color-danger)",
            secondary: "var(--color-surface)",
          },
        },
      }}
    />
  );
}