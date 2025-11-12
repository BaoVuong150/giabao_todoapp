import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <div className="font-mono">
      <Toaster richColors/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
