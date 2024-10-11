import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLoader from "../components/ui/apploader";
import HomePage from "../pages/homepage";

// Lazy loading the components
const NotFoundPage = lazy(() => import("../pages/404"));

const ProtectedRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          {["/", "/home"].map((path, index) => (
            <Route path={path} key={index} element={<HomePage />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default ProtectedRoutes;
