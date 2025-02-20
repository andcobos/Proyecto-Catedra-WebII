import { createContext, useReducer, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; 
import adminReducer from "./adminReducer";

export const AdminContext = createContext();

// Estado inicial
const initialState = {
  empresas: [],
  rubros: [],
  clientes: [],
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const empresasSnap = await getDocs(collection(db, "empresas"));
        const empresas = empresasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: "SET_EMPRESAS", payload: empresas });

        const rubrosSnap = await getDocs(collection(db, "rubros"));
        const rubros = rubrosSnap.docs.map(doc => doc.data().nombre);
        dispatch({ type: "SET_RUBROS", payload: rubros });

        const clientesSnap = await getDocs(collection(db, "clientes"));
        const clientes = clientesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: "SET_CLIENTES", payload: clientes });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  // Anadir empresa
  const addEmpresa = async (empresa) => {
    try {
      const docRef = await addDoc(collection(db, "empresas"), empresa);
      dispatch({ type: "ADD_EMPRESA", payload: { id: docRef.id, ...empresa } });
    } catch (error) {
      console.error("Error al agregar empresa:", error);
    }
  };

  // Eliminar empresa
  const deleteEmpresa = async (id) => {
    try {
      await deleteDoc(doc(db, "empresas", id));
      dispatch({ type: "DELETE_EMPRESA", payload: id });
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
    }
  };

  return (
    <AdminContext.Provider value={{ 
      empresas: state.empresas, 
      rubros: state.rubros, 
      clientes: state.clientes,
      addEmpresa,
      deleteEmpresa
    }}>
      {children}
    </AdminContext.Provider>
  );
};
