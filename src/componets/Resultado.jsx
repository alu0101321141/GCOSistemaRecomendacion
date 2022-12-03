import { useContext} from "react";
import {DataContext} from "../context/DataContext"

export function Resultado() {

  const value = useContext(DataContext);

  // Mostrar los pares de cosenos
  const cosenos = value.cosenos.map((cadena) => 
    <p>{cadena}<br/></p>
    );

  const tablas = value.resultado.map((documento, index) =>
    <>
      <p className="pt-8 pb-4">Documento {index + 1}<br></br></p>
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <td className= "py-4 px-6 text-xl">Índice</td>
        <td className= "py-4 px-6 text-xl">Término</td>
        <td className= "py-4 px-6 text-xl">TF</td>
        <td className= "py-4 px-6 text-xl">IDF</td>
        <td className= "py-4 px-6 text-xl">TF-IDF</td>
      </tr>
        {documento.map((fila) =>
          <>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            {fila.map((elemento) =>
              <td className= "py-4 px-6">
              {elemento}
              </td>
            )}
            </tr>
          </>
        )}
      </table>
    </>
  );


  // Si todo los datos están bien.
  if (value.cosenos.length > 0  && value.resultado.length > 0) {
    return (
      <>
        <div className="mb-20 bg-white text-center text-black rounded-3xl">
        <div className="p-5">
          <div className="max-w-3xl  max-h-screen overflow-x-auto sm:rounded-lg">
            {tablas}
          </div>
          <hr className="my-8 h-1 bg-gray-200 rounded border-0 dark:bg-gray-700 grid"/>
          <p className="font-mono font-bold text-xl"><br/>Similaridad coseno entre cada par de documentos</p>
          <p>{cosenos}</p>
        </div>
      </div>
      </>
    );
  }

  // Si hay algun dato mal y se ha hecho el calculo
  else if (value.evaluacion) {
    return (
      <>
         <p className="mb-10 text-center text-red-400 rounded-md">
          Porfavor, revise los datos introducidos e intentelo de nuevo.
          </p>
      </>
    );
  }
}
