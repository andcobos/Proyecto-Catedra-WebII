const adminReducer = (state, action) => {
    switch (action.type) {
      case "SET_EMPRESAS":
        return { ...state, empresas: action.payload };
      case "SET_RUBROS":
        return { ...state, rubros: action.payload };
      case "SET_CLIENTES":
        return { ...state, clientes: action.payload };
      case "ADD_EMPRESA":
        return { ...state, empresas: [...state.empresas, action.payload] };
      case "DELETE_EMPRESA":
        return { ...state, empresas: state.empresas.filter(empresa => empresa.id !== action.payload) };
      default:
        return state;
    }
  };
  
  export default adminReducer;
  