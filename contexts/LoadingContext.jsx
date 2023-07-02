import { createContext, useState, useContext } from "react";

export const LoaderContext = createContext({});

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const setLoadingState = (state) => {
    setLoading(state);
  };

  return (
    <LoaderContext.Provider value={{ loading, setLoadingState }}>
      {children}
    </LoaderContext.Provider>
  );
};
