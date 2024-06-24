import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { Toaster, toast } from "sonner";
import {
  RouterProvider,
  createRouter,

} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";



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

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
    
  }
}

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
