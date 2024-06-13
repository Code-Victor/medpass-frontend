import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { Toaster, toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error) {
        if (isAxiosError(error)) {
          // Extract error message from axios error
          const errMessage = (error as AxiosError<{ message: string }>).response
            ?.data.message;
          toast.error(errMessage, {});
        }
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
