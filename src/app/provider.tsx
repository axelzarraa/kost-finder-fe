"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster} from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#fff",
            color: "#333",
          },
            success: { 
                duration: 3000,
                iconTheme: {
                    primary: 'green',
                    secondary: 'black',
                },
            },
            error: {
                duration: 8000,
                iconTheme: {
                    primary: 'red',
                    secondary: 'black',
                },
            },
            loading: {
                iconTheme: {
                    primary: 'blue',
                    secondary: 'black',
                },
            },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
  