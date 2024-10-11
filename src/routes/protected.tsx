import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLoader from "../components/ui/apploader";
import HomePage from "../pages/homepage";
import AllMedicines from "../pages/medicines/all-medicines";
import MedicineDetails from "../pages/medicines/medicine-details";

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

          <Route path="/all-medicines" element={<AllMedicines />} />
          <Route path="/all-medicines/:id" element={<MedicineDetails />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default ProtectedRoutes;
