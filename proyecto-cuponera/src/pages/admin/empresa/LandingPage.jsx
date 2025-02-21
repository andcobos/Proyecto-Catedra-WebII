import React, { useState } from "react";
import { useEmployees } from "../../../context/employeesContext";
import { useOffers } from "../../../context/offersContext";
import CreateEmployee from "./CreateEmployee";
import CreateOffer from "./CreateOffer";

const LandingPage = () => {
    const { addEmployee } = useEmployees();
    const { addOffer } = useOffers();

    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showOfferModal, setShowOfferModal] = useState(false);

    return (
        <div className="bg-white shadow-md p-6 rounded-md">
            <h1 className="text-2xl font-bold">¡Bienvenido!</h1>
            <p className="text-gray-600">Administra tus empleados y ofertas fácilmente.</p>

            <div className="mt-6 flex gap-4">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowEmployeeModal(true)}
                >
                    Crear Empleado
                </button>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setShowOfferModal(true)}
                >
                    Crear Oferta
                </button>
            </div>

            {/* Modal para Crear Empleado */}
            {showEmployeeModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
                        
                        <CreateEmployee
                            closeModal={() => setShowEmployeeModal(false)}
                            addEmployee={addEmployee}
                        />
                    </div>
                </div>
            )}

            {/* Modal para Crear Oferta */}
            {showOfferModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
                        
                        <CreateOffer
                            closeModal={() => setShowOfferModal(false)}
                            addOffer={addOffer}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
