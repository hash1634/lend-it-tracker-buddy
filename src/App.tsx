
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Budget from "./pages/Budget";
import NotFound from "./pages/NotFound";
import PageSwitcher from "./components/PageSwitcher";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <PageSwitcher />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
