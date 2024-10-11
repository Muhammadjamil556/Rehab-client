import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLoader from "../components/ui/apploader";

// Lazy loading the pages
const NotFoundPage = lazy(() => import("../pages/404"));
const LoginPage = lazy(() => import("../pages/login"));
const RegisterPage = lazy(() => import("../pages/register"));

const PublicRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          {["/", "/login"].map((path, index) => (
            <Route path={path} key={index} element={<LoginPage />} />
          ))}
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default PublicRoutes;
