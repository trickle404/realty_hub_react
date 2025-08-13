import LoginComponent from "./features/LoginForm";
import HomePage from "./component/public/HomePage";
import HouseDetails from "./component/public/HouseDetails";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FormBuildsComponent from "./features/FormBuildsComponent";
import PartnerPage from "./component/users/PartnerPage";
import FormUserComponent from "./features/FormUserComponent";
import FormCreateClient from "./features/FormCreateClient";
import BuildsList from "./component/users/BuildsList";
import LeafletMap from "./component/static/LeafletMap";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return element;
  }
};

const App = () => {
  return (
    <BrowserRouter>
      {/* <UserProvider> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/details/:id" element={<HouseDetails />} />
        <Route
          path="/partner_page"
          element={<ProtectedRoute element={<PartnerPage />} />}
        />
        <Route
          path="/create_build"
          element={<ProtectedRoute element={<FormBuildsComponent />} />}
        />
        <Route
          path="/create_user"
          element={<ProtectedRoute element={<FormUserComponent />} />}
        />
        <Route
          path="/create_client"
          element={<ProtectedRoute element={<FormCreateClient />} />}
        />
        <Route
          path="/all_builds"
          element={<ProtectedRoute element={<BuildsList />} />}
        />
        <Route
          path="/create_build/:id?"
          element={<ProtectedRoute element={<FormBuildsComponent />} />}
        />
        <Route
          path="/test_map"
          element={<LeafletMap geo={"51.505, -0.09"} />}
        />
      </Routes>
      {/* </UserProvider> */}
    </BrowserRouter>
  );
};

export default App;
