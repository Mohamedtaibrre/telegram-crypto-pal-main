
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import TelegramAutoLogin from "./components/TelegramAutoLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Send from "./pages/Send";
import Receive from "./pages/Receive";
import Swap from "./pages/Swap";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Rewards from "./pages/Rewards";
import AdminPanel from "./pages/admin/AdminPanel";
import VirtualCard from "./pages/VirtualCard";
import History from "./pages/History";
import CardManagement from "./pages/admin/CardManagement";
import Login from './pages/admin/Login';
import Cards from './pages/admin/Cards';
import Transactions from './pages/admin/Transactions';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FirebaseProvider>
        <AuthProvider>
          <TelegramAutoLogin />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/send" element={<ProtectedRoute><Send /></ProtectedRoute>} />
              <Route path="/receive" element={<ProtectedRoute><Receive /></ProtectedRoute>} />
              <Route path="/swap" element={<ProtectedRoute><Swap /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
              <Route path="/admin/cards" element={<ProtectedRoute adminOnly><Cards /></ProtectedRoute>} />
              <Route path="/admin/transactions" element={<ProtectedRoute adminOnly><Transactions /></ProtectedRoute>} />
              {/* Feature routes */}
              <Route path="/card" element={<ProtectedRoute><VirtualCard /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/admin/cards" element={<ProtectedRoute adminOnly><CardManagement /></ProtectedRoute>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </FirebaseProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
