# MyInvestor Challenge

This project was created with Vite.
Require: Node ^24.14.0

## Start the SERVER (API server provided by MyInvestor)

1. Install dependencies:

   npm install

2. Start development server port 3000:

   npm run start


## Start the APP  

1. Install dependencies:

   npm install

2. Start development server:

   npm run dev


## NOTAS para Alex:

- Funcionalidades implementadas:<br/>
 -- Home page como introducción. <br/>
 -- Página listado de fondos / detalles y sus acciones correspondientes. <br/>
 -- Página cartera con mis fondos y sus acciones correspondientes. <br/>
 -- Página cartera con el historial de ordenes efectuadas. <br/>

- Decisiones técnicas tomadas: <br/>
He creado una estructura tipo FSD con separacion por features y algunos directorios comunes (sep. capas técnicas) para tener todo lo compartido alli. Asi no se duplica código. Luego cada feature tiene sus propias dependencias al mismo nivel, esto evita conflictos si cada uno desarrola en su propia feature. 
Lo malo que a la larga puede duplicarse código si no se lleva adecuadamente el sharing mentality...
La verdad que me gustaria darle otra vuelta ya que ahora al final he entendido mejor la idea de la app y creo que otra estructura seria mas mantenible a largo plazo. Pero como MVP esto me ha valido. En cuanto a librerias externas (como material ui table), obviamente la he implementado por falta de tiempo y creo que es bueno reutilizar cosas que funcionan bien, y eso que perdi tiempo probando varias jeje... 

- Cosas que me han faltado por implementar (falta de tiempo) <br/>
 -- En la sección de mi cartera, el slider de acciones para móvil. <br/>
 -- Algunos componentes cross como generic-dialog deberian de estar en la carpeta común. <br/>
 -- En el dialogo he metido un componente input con la divisa pero no formatea realmente pero si valida.<br/>
 -- La seccion optional de Ordenes, le ha hecho usando localStorage, pero estaria bien sincronizarlo con backend (no he visto el endpoint)<br/>
 -- He intentado meter los test unitarios pero ~~me fallaba continuamente vitest~~, no he llegado nisiquiera a pasar un test simple y lo deje (te los paso en otro repo dentro de un rato).
 
Espero que te guste, <br/>
Un saludo Alex!
