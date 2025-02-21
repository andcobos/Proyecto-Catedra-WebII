// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Import your providers
import {FirebaseContext, FirebaseProvider} from "./context/FirebaseContext";
import { EmployeesProvider } from "./context/EmployeesContext";
import { OffersProvider } from "./context/OffersContext";

// Import components for different sections
import ClientNavbar from "./components/ClientNavbar.jsx";
import CompanyAdminNavbar from "./components/CompanyAdminNavbar";
import AdminNavbar from "./components/AdminNavbar";

//Import paginas Cliente
import Home from "./pages/cliente/Home";
import Ofertas from "./pages/cliente/Oferta";


//import paginas Empresa
import AdminLayout from "./pages/empresa/AdminLayout";
import LandingPage from "./pages/empresa/LandingPage";
import CreateOffer from "./pages/empresa/CreateOffer.jsx";
import CreateEmployee from "./pages/empresa/CreateEmployee.jsx";
import EmployeesPage from "./pages/empresa/EmployessPage.jsx";
import OffersPage from "./pages/empresa/OffersPage.jsx";

//import pages Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Clientes from "./pages/admin/Clientes";
import Empresas from "./pages/admin/Empresas";
import Rubros from "./pages/admin/Rubros";

//Import Login
import Login from "./components/Login";
import Register from "./components/Register";
import {useContext} from "react";
//Import Error



function App() {
    return (
        <FirebaseProvider>
            <EmployeesProvider>
                <OffersProvider>
                    <Router>
                        <Routes>
                            {/* Rutas del cliente!!!! */}
                            {/* You rendered descendant <Routes> (or called `useRoutes()`) at "/" (under <Route path="/">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.*/}
                            <Route path="*" element={
                                <>
                                    <ClientNavbar />
                                    <div className="container mx-auto p-4">
                                        <Routes>
                                            <Route index element={<Home />} />
                                            <Route path="ofertas" element={<Ofertas />} />
                                            <Route path='login' element={<Login />} />
                                            <Route path='register' element={<Register />} />

                                            {/* AGREGAR MAS RUTAS PARA CLIENTE AQUI ARRIBA!!!!! */}
                                        </Routes>
                                    </div>
                                </>
                            } />

                            {/* Rutas protegidas para las empresas */}
                            <Route path="/empresa/*" element={

                                <RequireAuth userType="empresa">
                                    <CompanyAdminNavbar />
                                    <div className="container mx-auto p-4">
                                        <Routes>
                                            <Route index element={<AdminLayout />} />
                                            <Route path="landing-page" element={<LandingPage />} />
                                            <Route path="crear-oferta" element={<CreateOffer />} />
                                            <Route path="crear-empleado" element={<CreateEmployee />} />
                                            <Route path="empleados" element={<EmployeesPage />} />
                                            <Route path="ofertas" element={<OffersPage />} />
                                            {/* RUTAS EMPRESA AQUI ARRIBA */}
                                        </Routes>
                                    </div>
                                </RequireAuth>
                            } />

                            {/* Rutas protegidas para el admin */}
                            <Route path="/admin/*" element={
                                <RequireAuth userType="admin">
                                    <AdminNavbar/>
                                    <div className="container mx-auto p-4">
                                        <Routes>
                                            <Route index element={<AdminDashboard />} />
                                            <Route path="clientes" element={<Clientes />} />
                                            <Route path="empresas" element={<Empresas />} />
                                            <Route path="rubros" element={<Rubros />} />
                                            {/* RUTAS ADMIN AQUI ARRIBA */}
                                        </Routes>
                                    </div>
                                </RequireAuth>
                            } />
                        </Routes>
                    </Router>
                </OffersProvider>
            </EmployeesProvider>
        </FirebaseProvider>
    );
}

// Protection component for authenticated routes
function RequireAuth({ children, userType }) {
    const { user, loading } = useContext(FirebaseContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default App;