import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
<<<<<<< HEAD
import Landing from "./pages/Landing";
import Auth from "@/pages/Auth";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Processing from "./pages/Processing";
import ReviewQueue from "./pages/ReviewQueue";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Settings from "./pages/Settings";
import { AppLayout } from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";
import InvoiceDetails from "./pages/InvoiceDetails";

=======

import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Upload from "@/pages/Upload";
import Processing from "@/pages/Processing";
import ReviewQueue from "@/pages/ReviewQueue";
import Analytics from "@/pages/Analytics";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import InvoiceDetails from "@/pages/InvoiceDetails";
import NotFound from "@/pages/NotFound";

import { AppLayout } from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
>>>>>>> 3d71827076a3f84c7ee5ab935d066c5637f069c8

const queryClient = new QueryClient();

function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
<<<<<<< HEAD
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
=======

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

>>>>>>> 3d71827076a3f84c7ee5ab935d066c5637f069c8
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeInitializer>
        <Toaster />
        <Sonner />
<<<<<<< HEAD
        <BrowserRouter>
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/auth" element={<Auth />} />

    {/* Layout pages */}
    <Route element={<AppLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />

      {/* 🔥 ADD THIS FOR INVOICE DETAILS */}
      <Route path="/processing/inv/:invoiceId" element={<InvoiceDetails />} />
      
      <Route path="/processing" element={<Processing />} />
      <Route path="/review-queue" element={<ReviewQueue />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/history" element={<History />} />
      <Route path="/settings" element={<Settings />} />
    </Route>

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

=======

        <BrowserRouter>
          <Routes>
            {/* 🌍 Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />

            {/* 🔒 Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/processing" element={<Processing />} />
              <Route path="/processing/inv/:invoiceId" element={<InvoiceDetails />} />
              <Route path="/review-queue" element={<ReviewQueue />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* ❌ 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
>>>>>>> 3d71827076a3f84c7ee5ab935d066c5637f069c8
      </ThemeInitializer>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
