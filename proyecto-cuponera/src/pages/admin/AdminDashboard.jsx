//Vista de Inicio o Dashboard del Admin

import { useContext } from "react";
import { AdminContext } from "../../context/adminContext";

function AdminDashboard() {
  const { empresas, rubros, clientes } = useContext(AdminContext);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="bg-slate-700 text-white text-xl font-semibold p-4 rounded-t-lg">
            Gestión de Empresas
          </h2>
          <div className="p-6">
            <ul className="text-gray-600">
              {empresas.length > 0 ? (
                empresas.map((empresa) => (
                  <li key={empresa.id} className="border-b py-2">
                    {empresa.nombre} ({empresa.codigo}) - {empresa.rubro}
                  </li>
                ))
              ) : (
                <p>No hay empresas registradas</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
