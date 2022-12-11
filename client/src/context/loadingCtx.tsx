import React, { createContext, useContext, useState } from "react";

interface LoadingCtx {
  loading: boolean;
  // eslint-disable-next-line no-unused-vars
  setLoadingStatus: (param: boolean) => void;
}

const loadindDefault: LoadingCtx = {
  loading: false,
  setLoadingStatus: () => {},
};

const LoadingContext = createContext<LoadingCtx>(loadindDefault);

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const setLoadingStatus = (param: boolean) => {
    setLoading(param);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoadingStatus,
      }}
    >
      <span>{children}</span>
    </LoadingContext.Provider>
  );
};

const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) throw new Error("useLoading must be used inside a `LoadingProvider`");
  return context;
};

export { LoadingProvider, useLoading };
