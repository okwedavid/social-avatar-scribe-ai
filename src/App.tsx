
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ContentPage from "./pages/ContentPage";
import SocialPage from "./pages/SocialPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SchedulePage from "./pages/SchedulePage";
import AccountPage from "./pages/AccountPage";
import ApiKeysPage from "./pages/ApiKeysPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/api" element={<ApiKeysPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
