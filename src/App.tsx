import "@/styles/global.css";

import { RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { router } from "./routes/routes";
import { Toaster } from "sonner";

import { ThemeProvider } from "./common/components/theme/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryCLient } from "./lib/react-query";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="papavizza-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | papa.vizza" />
        <Toaster richColors />
        <QueryClientProvider client={queryCLient}>
          <RouterProvider router={router} />

        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
