import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import Price from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./componets/CityList";
import CountiresList from "./componets/CountiresList";
import City from "./componets/City";
import Form from "./componets/Form";
import { CititesProvider } from "./Context/CitiesContext";
import { AuthProvider } from "./Context/FakeAuthContext";
import ProtectedRoutes from "./componets/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <CititesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="price" element={<Price />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="app"
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              {/* <Route path="cities" element={<p>City List </p>} /> */}
              <Route path="countires" element={<CountiresList />} />
              <Route path="form" element={<Form />} />
            </Route>{" "}
          </Routes>
        </BrowserRouter>
      </CititesProvider>
    </AuthProvider>
  );
}

export default App;
