import { createContext, useState } from "react";

export const MyContext = createContext(null);

const GlobalContext = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <MyContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </MyContext.Provider>
  );
};

export default GlobalContext;
