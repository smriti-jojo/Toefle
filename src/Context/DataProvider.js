import {  createContext, useState } from "react";

export const DataContext = createContext(null);

const DataContextProvider = ({children}) => {
  const [iconss, setIconsToggle] = useState(false);

  return (
    <DataContext.Provider
      value={{
        iconss,
        setIconsToggle,
      }}>
        {children}
    </DataContext.Provider>
  );
};


export default DataContextProvider;