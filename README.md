# Gestión del conocimiento en las organizaciones
## Sistemas de recomendación. Métodos de Filtrado Colaborativo
---
### Despliegue de la aplicación web:
En el siguiente enlace se puede ver la aplicación desarrolla desplegada utilizando Vercel.
[Despliegue de la web](https://gco-deploy.vercel.app/)

---
### Autores:
* Alejandro Lugo Fumero         | alu0101329185
* Vlatko Jesús Marchán Sekulic  | alu0101321141
* Nicolas Vegas Rodriguez       | alu0101321745

---

### Introducción

En la práctica se nos propone implementar un sistema de recomendación siguiendo modelos basados en el conocimiento. 

Para ello se desarolló una aplicación web en la que tendremos los siguientes elementos

* Tendremos 3 ficheros a tener en cuenta: El archivo de documentos a analizar, el archivo de palabras de paradas y el de lematizacion.
* Se normalizaran los daatos del fichero de documentos a analizar, convirtiendo todas las palabras en minúsculas y quitando signos de puntuación.
* Una vez que tenemos el formato correcto procederemos con las transformaciones correspondientes, eliminando las palabras de parada y lematizando el texto.

---

### Herramientas 

Para el desarrollo de la práctica se utilizaron las siguientes herramientas:

* __Vscode__: editor de código fuente desarrollado por Microsoft para Windows, Linux, macOS y Web.

* __Visual Studio Live Share__: extensión del visual estudio code para el desarrollo colaborativo de código en tiempo real.

* __Git__: software de control de versiones.

* __React__: biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página.

* __Vite__: Herramienta de frontend que para crear proyectos de forma agnóstica (sin atarte a ningún framework concreto) y que su desarrollo y construcción final sea lo más sencilla y cómoda posible.

* __Tailwind CSS__: Tailwind CSS es un framework de CSS de código abierto​ para el diseño de páginas web.

---

### Explicación del código.

* __index.html:__ Estructura HTML del projecto donde se definirán las dependencias de React y tailwind CSS así como los elementos básicos de html como el `head` , `body` y `footer`.

* __main.jsx:__ Se corresponde con nuestro fichero principal donde llamaremos a nuestros componentes en el orden apropiado para generar nuestra página web con una estructura determinada.

* __DataContext.jsx:__ Declaramos las variables globales que se compartirán con el resto de la aplicación. Podemos destacar el uso del hook `useState()` para el tracking de dichas variables a lo largo de la ejercución del programa.

* __Datos.jsx:__ En este fichero estarán todos nuestros componentes en lo referente a la toma inicial de datos, un ejemplo sería:

```js
        <input
          type="file"
          className="..."
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

```

Además, en este componente procesaremos los datos asociados, realizando las transformaciones indicadas en la traducción y calculando:

* Frecuencia ponderada del término: `function TF (matriz)`
* Inversa de la frecuencia. `function IDF (matriz)`
* TF-IDF: `function IDF (matriz)`
* Similaridad coseno entre cada par de documentos: `function similaridadCoseno(documento1, documento2)`


* __Resultado.jsx:__  En este componente nos centramos en la muestra de resultados después del cálculo realizado. A continuación se pueden ver algunas imágenes de la visualización de dichos resultados:

---

### Ejemplo de uso
En la siguiente imagen se puede ver la aplicación web nada más acceder a ella.

![Imagen web inicio](/img/inicio.png)

Una vez se ejecuta correctamente tenemos el siguiente reultado:

![Imagen web datos](/img/datos.png)
