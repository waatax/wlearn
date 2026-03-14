import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { TagTranslationProvider } from "./contexts/TagTranslationContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Authors from "./pages/Authors";
import AuthorDetail from "./pages/AuthorDetail";

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <TagTranslationProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter basename="/wlearn">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/author/:id" element={<AuthorDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </TagTranslationProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
