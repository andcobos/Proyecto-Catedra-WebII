import React from 'react';

const CompanyAdminNavbar = () => {
    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
            <Logo />
            <NavLinks />
            <div className="flex items-center space-x-4">
                <ProfileIcon />
                <LogoutButton />
            </div>
        </nav>
    );
};

export function Logo() {
    return (
        <div className="flex items-center space-x-2">
            <span role="img" aria-label="ticket">🎟️</span>
            <h1 className="text-xl font-bold">CUPONERA</h1>
        </div>
    );
}

export function NavLinks() {
    return (
        <div className="space-x-20">
            <a href="/company-admin/LandingPage" className="hover:underline">Inicio</a>
            <a href="/company-admin/OffersPage" className="hover:underline">Ofertas</a>
            <a href="/company-admin/EmployeesPage" className="hover:underline">Empleados</a>
        </div>
    );
}

export function ProfileIcon() {
    return (
        <div className="rounded-full bg-white text-blue-500 p-2 cursor-pointer">
            <span role="img" aria-label="user">👤</span>
        </div>
    );
}

export function LogoutButton() {
    return (
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
        </button>
    );
}

export default CompanyAdminNavbar;
