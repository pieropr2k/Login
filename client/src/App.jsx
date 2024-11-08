import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ForAllPage } from "./pages/ForAllPage";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route element={<ProtectedRoute allowedRoles={['S01', 'A01']} />}>
                <Route path="/protected-dashboard" element={<DashboardPage/>} />
              </Route>
              
              <Route element={<ProtectedRoute />}>
                <Route path="/forall" element={<ForAllPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
              
            </Routes>
          </main>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
