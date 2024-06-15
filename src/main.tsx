import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { Toaster, toast } from "sonner";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "@/pages/index.tsx";
import AdminSignup from "@/pages/admin/signup.tsx";

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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    children: [
      {
        path: "signup",
        element: <AdminSignup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
