import { createContext, useState} from "react";

export const DataContext = createContext();

export function DataContextProvider(props) {

  const [resultado, setResultado] = useState([]);
  const [cosenos, setCosenos] = useState([]);


  return( <DataContext.Provider value={{
    resultado,
    setResultado,
    cosenos,
    setCosenos
  }}> {props.children} </DataContext.Provider>);
}