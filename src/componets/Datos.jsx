import { useContext, useState } from "react";
import {DataContext} from "../context/DataContext"

export function Datos() {

  const [archivoDocumentos, setarchivoDocumentos] = useState();
  const [archivoPalabrasParada, setarchivoPalabrasParada] = useState();
  const [archivoLematizacion, setarchivoLematizacion] = useState();

  const [errorArchivo, setErrorArchivo] = useState("");

  const value = useContext(DataContext);

  return (
    <div>
      {/*Titulo*/}
      <div className="grid place-content-center">
        <p className="font-mono font-bold text-white text-4xl p-8">
        Métodos de Filtrado Colaborativo.
        </p>
      </div>
      <div className="grid place-content-center">
        <p className="font-mono font-bold text-white text-xl p-4 grid place-content-center">
        Documento.
        </p>
      {/*Lectura del archivo*/}
        <input
          type="file"
          className="
          file:bg-gradient-to-b file:from-blue-500 file:to-blue-600
          file:px-6 file:py-3 file:m-5
          file:border-none
          file:rounded-full
          file:text-white
          file:cursor-pointer
          file:shadow-lg file:shadown-blue600/50
          
          text-medium font-mono;
          bg-gradient-to-br from-gray-600 to-gray-700
          text-white/80
          rounded-full
          cursor-pointer
          shadow-xl shadow-gray-700/60
          "
          accept=".txt"
          onChange={(e) => {
            let file = new FileReader();
            file.onload = () => {
              setarchivoDocumentos(file.result);
            };
            if (e.target.files[0]) file.readAsText(e.target.files[0]);
            else setarchivoDocumentos(undefined);
          }}
        />
        <p className="font-mono font-bold text-white text-xl p-4 grid place-content-center">
        Stop-words.
        </p>
        <input
          type="file"
          className="
            file:bg-gradient-to-b file:from-blue-500 file:to-blue-600
            file:px-6 file:py-3 file:m-5
            file:border-none
            file:rounded-full
            file:text-white
            file:cursor-pointer
            file:shadow-lg file:shadown-blue600/50
            
            text-medium font-mono
            bg-gradient-to-br from-gray-600 to-gray-700
            text-white/80
            rounded-full
            cursor-pointer
            shadow-xl shadow-gray-700/60
            "
          accept=".txt"
          onChange={(e) => {
            let file = new FileReader();
            file.onload = () => {
              setarchivoPalabrasParada(file.result);
            };
            if (e.target.files[0]) file.readAsText(e.target.files[0]);
            else setarchivoPalabrasParada(undefined);
          }}
        />
        <p className="font-mono font-bold text-white text-xl p-4 grid place-content-center">
        Corpus.
        </p>
        <input
          type="file"
          className="
            file:bg-gradient-to-b file:from-blue-500 file:to-blue-600
            file:px-6 file:py-3 file:m-5
            file:border-none
            file:rounded-full
            file:text-white
            file:cursor-pointer
            file:shadow-lg file:shadown-blue600/50
            
            text-medium font-mono
            bg-gradient-to-br from-gray-600 to-gray-700
            text-white/80
            rounded-full
            cursor-pointer
            shadow-xl shadow-gray-700/60
            "
          accept=".txt"
          onChange={(e) => {
            let file = new FileReader();
            file.onload = () => {
              setarchivoLematizacion(file.result);
            };
            if (e.target.files[0]) file.readAsText(e.target.files[0]);
            else setarchivoLematizacion(undefined);
          }}
        />
      </div>
      <div>
        {/*Mostrar errores */}
        <p className="
        text-center text-red-400 rounded-md">
        <br/> {errorArchivo} <br/>
        </p>
      </div>
      <div className="grid place-content-center">
      <button
          className="
          bg-gradient-to-b from-blue-500 to-blue-600
          px-6 py-6 m-5
          border-none
          rounded-full
          font-mono font-bold text-white text-xl
          cursor-pointer
          shadow-lg shadown-blue600/50     
          "
          onClick={() => {
            if (!archivoDocumentos || !archivoPalabrasParada || !archivoLematizacion) {
              setErrorArchivo(
                `Error, hay que seleccionar los 3 archivos correspondientes, compruebebe que todo está bien.`
              );
            } else {
              let palabrasParada = archivoPalabrasParada.replaceAll('\r',"").split("\n");
              let lematizacion = JSON.parse(archivoLematizacion);
              let documentoSinPalabrasParada = EliminarPalabrasParada(archivoDocumentos, palabrasParada);
              let documentoFiltrado = Lematizar(documentoSinPalabrasParada, lematizacion);
              
              let datos = MatrizTerminoDocumento(documentoFiltrado);
              
              let tf = TF(datos.matriz);
              let idf = IDF(datos.matriz);
              let tfIdf = TFIDF(tf, idf);

              let palabraDocumento = PalabrasPorDocumento(datos.matriz)

              value.setCosenos(GenerarParesCoseno(tfIdf))

              let resultado = Resultado(palabraDocumento, datos.terminos, tf, idf, tfIdf)
              console.log(resultado)

              value.setResultado(resultado)
            }
          }}
        >
        Mostrar
        </button>
      </div>
    </div>
  );
}


function EliminarPalabrasParada(documentos, palabrasParada) {
  // Añadimos un \n al final del documento en caso de que no lo tenga para que funcionen los replaceAll correctamente.
  documentos = " " + documentos;
  if (documentos[documentos.length - 1] !== "\n") 
    documentos = documentos + "\n";  
  // Eliminamos , . : y ;
  documentos = documentos.replaceAll(",", "");
  documentos = documentos.replaceAll(".", "");
  documentos = documentos.replaceAll(";", "");
  documentos = documentos.replaceAll(":", "");
  // Normalizando todas las palabras a minúsculas.
  documentos = documentos.toLowerCase()
  // Eliminamos las Stop-words.
  palabrasParada.forEach((palabras) => {
    documentos = documentos.replaceAll('\n'+ palabras + " ", "\n");
    documentos = documentos.replaceAll(" " + palabras + " ", " ");
    documentos = documentos.replaceAll(" " + palabras + "\n", "\n");
  });

  return documentos
}

function Lematizar(documentos, lematizacion) {
  for (let x in lematizacion) {
    documentos = documentos.replaceAll('\n'+ x + " ", "\n" + lematizacion[x] + " ");
    documentos = documentos.replaceAll(" " + x + " ", " " + lematizacion[x] + " ");
    documentos = documentos.replaceAll(" " + x + "\n", " " + lematizacion[x] + "\n");
  }
  return documentos
}

// Creamos una matriz que en las columnas se encuentren las palabras de los
// documentos y en las filas los documentos.
function MatrizTerminoDocumento(documentoFiltrado) {
  
  // Sacamos todas las palabras.
  let terminos = documentoFiltrado.replaceAll("\n", " ").split(" ")
  // Eliminamos las repetidas
  let conjunto = new Set(terminos)
  // Creamos de nuevo el array.
  terminos = [...conjunto]
  // Eliminamos el primer elemento, es un espacio.
  terminos.shift()
  let matriz = [];
  documentoFiltrado = documentoFiltrado.split('\n');
  documentoFiltrado.pop();
  let contador = 0;
  // Construimos la Matriz termino-documentos.
  for (let i = 0; i < documentoFiltrado.length; i++) {
    let auxDocumento = documentoFiltrado[i].replaceAll("\n", " ").split(" ");
    let auxMatriz = [];
    for (let j = 0; j < terminos.length; j++) {
      for (let k = 0; k < auxDocumento.length; k++) {
        if (auxDocumento[k] === terminos[j]) {
          contador ++;
        }
      }
      auxMatriz.push(contador);
      contador = 0;
    }
    matriz.push(auxMatriz);
  }

  return {terminos, matriz}
}


function TF (matriz) {
  let matrizTF = [];
  
  for (let i = 0; i < matriz.length; i++) {
    let auxMatrizTF = [];
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] !== 0)
        auxMatrizTF.push(1 + Math.log10(matriz[i][j]));
      else
        auxMatrizTF.push(0);
    }
    matrizTF.push(auxMatrizTF);
  }

  return matrizTF
}


function IDF (matriz) {
  const N = matriz.length;
  let vectorIDF = [];

  for (let j = 0; j < matriz[0].length; j++) {
    let contador = 0
    for (let i = 0; i < matriz.length; i++) {
      if (matriz[i][j] > 0)
        contador ++
    }
    vectorIDF.push(Math.log10(N/contador));
  }
  return vectorIDF;
}


function TFIDF (matrizTF, vectorIDF) {
  let matrizTFIDF = [];
  
  for (let i = 0; i < matrizTF.length; i++) {
    let aux = []
    for (let j = 0; j < matrizTF[i].length; j++) {
      aux.push(matrizTF[i][j] * vectorIDF[j]);
    }
    matrizTFIDF.push(aux);
  }

  return matrizTFIDF;
}


// Metrica distancia coseno
function distanciaCoseno(documento1, documento2) {
  let numerador = 0,
    denominador1 = 0,
    denominador2 = 0;

  for (let i = 0; i < documento1.length; i++) {
    numerador += documento1[i] * documento2[i];
    denominador1 += Math.pow(documento1[i], 2);
    denominador2 += Math.pow(documento2[i], 2);
  }

  return numerador / (Math.sqrt(denominador1) * Math.sqrt(denominador2));
}

// Calculamos los pares de Cosenos
function GenerarParesCoseno (TF_IDF) {
  let paresCoseno = []
  for(let i = 0; i < TF_IDF.length; i++) {
    for (let j = i + 1; j < TF_IDF.length; j++) {
      paresCoseno.push("Par " + (i + 1).toString() + "-" + (j + 1).toString() + ": " + distanciaCoseno(TF_IDF[i], TF_IDF[j]));
    }
  }
  return paresCoseno
}

// Para cada documento sacamos el indice de las palabras que lo forman
function PalabrasPorDocumento (matriz) {
  let palabrasDocumento = []

  for (let i = 0; i < matriz.length; i++) {
    let aux = []
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] > 0) {
        aux.push(j)
      }
    }
    palabrasDocumento.push(aux);
  }

  return palabrasDocumento
}

// generamos lo que se va a imprimir
function Resultado(palabrasDocumento, terminos, tf, idf, tf_idf) {
  let resultado = []

  for (let i = 0; i < palabrasDocumento.length; i++) {
    let documento = []
    for (let j = 0; j < palabrasDocumento[i].length; j++) {
      let aux = []
      aux.push(j + 1)
      aux.push(terminos[palabrasDocumento[i][j]])
      aux.push(tf[i][palabrasDocumento[i][j]])
      aux.push(idf[palabrasDocumento[i][j]])
      aux.push(tf_idf[i][palabrasDocumento[i][j]])

      documento.push(aux)
    }
    resultado.push(documento);
  }
  return resultado
}