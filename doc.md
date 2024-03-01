# Documentación WeatherHub

## Índice

1. Introducción y expectativas/objetivos: Desarrollo de la idea inicial, de las tecnologías a utilizar
2. Descripción del resultado obtenido: funcionalidades y organización
3. Vídeo presentación mostrando el funcionamiento de la página
4. Instalación y preparación
5. Guía de estilos y prototipadouso, diagramas de flujo...etc. Es preferible usar el estándar UML.
6. Desarrollo: Secuencia de desarrollo, dificultades encontradas y decisiones afrontadas
7. Despliegue: Tecnología de despliegue y descripción del proceso
8. Manual de uso de la aplicación
9. Conclusiones: Comparación del resultado con la idea inicial y mejoras futuras

## 1- Introducción y expectativas/objetivos: Desarrollo de la idea inicial, de las tecnologías a utilizar

### Introducción

WeatherHub propone ofrecer información meteorológica y horaria en tiempo real para usuarios de todo el mundo, facilitando la planificación diaria y las actividades cotidianas.

### Expectativas/Objetivos

El objetivo principal del proyecto es desarrollar una plataforma funcional y accesible desde cualquier navegador, utilizando tecnologías modernas como Vue.js para el frontend y Laravel para el backend. Se espera ofrecer una interfaz intuitiva, funcionalidades clave como la visualización detallada del tiempo y la hora en cualquier ciudad, y un sistema de guardado del historial de búsqueda.

## 2- Descripción del resultado obtenido: funcionalidades y organización

### Descripción del resultado con sus funcionalidades

- En el **menú de navegación** de la página estarán las rutas disponibles, esto variará en función de si tienes una sesión iniciada o no, en el mismo menú de navegación se encontrará un botón que nos llevará al formulario tanto de inicio de sesión como de registro, una ves registrados podremos cerrar la sesión con el mismo botón que ahora habrá cambiado y nos cerrará la sesión.

- **Página principal:** Puedes buscar el tiempo en las siguientes ciudades(Cádiz, Jerez, Pamplona, Londres, Buenos Aires, Frankfurt, Sevilla, Florencia, Málaga y Madrid), obteniendo su tiempo y más información, y en la parte inferior se podrá iniciar sesión o crear una cuenta.

- **World Time:** Puedes buscar la hora actual en las distintas ciudades mencionadas anteriormente.

- **Compare Weathers:** The permite buscar el tiempo de dos ciudades distintas simultáneamente para comparar su tiempo de forma más simplificada.

- **Search History:** Con una sesión activa se podrá acceder a esta página, cada vez que busques el tiempo de una ciudad en la página principal aparecerá al poco tiempo en la esquina inferior derecha que se ha guardado la ciudad, eso significará que se te mostrará en esta página para así acceder de forma más sencilla del tiempo que ya has buscado alguna vez.

- **Página de contacto:** Podrás enviar un mensaje para cualquier duda, sugerencia, etc...

## 3- Vídeo presentación mostrando el funcionamiento de la página

[Vídeo presentación](https://drive.google.com/file/d/1DrWEkoIqICftx8_fMnLsHfsBif2lgWSz/view?usp=sharing)

## 4- Instalación y preparación

Todo lo necesario para hacer funcionar el proyecto y cómo se instala. Edición de los archivos de configuración, creación y puesta en funcionamiento del control de versiones en github.

Para la instalación del proyecto y su ejecución en local hay que seguir los siguientes pasos:

- Clonar este proyecto:
https://github.com/juanrabaro/P6_BaroLopezJuanRamon_DWEC_maquetacion_desarrollo_vue.git

- Ejecutar este comando para instalar las dependencias necesarias
```npm install```

- Ejecutar este comando para ejecutar el proyecto en local en el puerto 5173
```npm run dev```

## 5- Guía de estilos y prototipado

Se incluye tanto la guía de estilos como los wireframe o mockups de la aplicación de uso.

- La tipografía que he utilizado es **Lato**, una fuente de texto simple y sans serif.

- En cuanto a los colores he usado una combinación de azules y blanco para crear esa apariencia sencilla. Los rgb de los colores que he usado son los siguientes:

1. rgb(103, 145, 179)
2. rgb(42, 59, 130)
3. rgb(229, 242, 253)
4. rgb(5, 20, 88)
5. rgb(255, 255, 255)

- Wireframe: [enlace drive ver wireframe](https://drive.google.com/file/d/1XmHsm7thdZ6unjx45YurcDPrynUWfCYQ/view?usp=sharing)

## 6- Desarrollo: Secuencia de desarrollo, dificultades encontradas y decisiones afrontadas

- Las mayores dificultades del proyecto han sido las peticiones http al servidor, controlar su respuesta y el cors, pero usando la librería  **axios** ha sido más sencillo.

- Las variables globales también supusieron un reto para ello usé **pinia**.

- Controlar los props entre componentes con los emits también es algo nuevo que no había tenido que afrontar en el anterior proyecto usando **react**.

- Me he centrado en hacer la página lo más simple, sencilla y con una experiencia de usuario fácil de llevar para que el usuario se sienta lo más cómodo posible, es decir algo simple e intuitivo.

## 7- Despliegue: Tecnología de despliegue y descripción del proceso

Para el despliegue del frontend he usado **Netlify**, está página ofrece un despliegue muy sencillo así que me he decantado por esta opción

Para poder desplegar mi página ahí he tenido que ejecutar el comando ```npm run build``` para que me genere la carpeta **dist** la cual es la carpeta que tendré que pasar a Netlify para que haga el despliegue.

## 8- Manual de uso de la aplicación

Claro, aquí tienes una versión reescrita:

- **Explorador de Tiempo:** En esta sección principal, puedes buscar el clima en varias ciudades como Cádiz, Jerez, Pamplona, Londres, Buenos Aires, Frankfurt, Sevilla, Florencia, Málaga y Madrid. Obtendrás información detallada del clima en cada lugar. Además, encontrarás la opción de iniciar sesión o crear una cuenta en la parte inferior de la página.

- **Hora Mundial:** Aquí puedes encontrar la hora actual en las ciudades mencionadas anteriormente. Es útil para aquellos que necesitan conocer la hora en diferentes partes del mundo de manera rápida y conveniente.

- **Comparador de Climas:** Esta herramienta te permite buscar el clima de dos ciudades diferentes al mismo tiempo, facilitando la comparación de las condiciones climáticas de manera simplificada.

- **Historial de Búsquedas:** Si tienes una sesión activa, podrás acceder a esta página. Cada vez que busques el clima de una ciudad en la página principal, se guardará automáticamente en tu historial. Esto te permite acceder fácilmente a las ciudades que has buscado anteriormente para consultar su clima nuevamente.

- **Página de Contacto:** Aquí tendrás la opción de enviar mensajes para cualquier pregunta, sugerencia o comentario que tengas. Es una forma directa de comunicarte con nosotros y compartir tus pensamientos sobre la aplicación.

## 9- Conclusiones: Comparación del resultado con la idea inicial y mejoras futuras

Comparando el objetivo inicial con el resultado obtenido creo que puedo decir que he seguido lo planeado practicamente en todo y ha resultado como esperaba.

Posibles mejoras futuras podrían ser la posibilidad de quitar ciudades del historial, hacer un control del usuario más extendido, es decir una página propia y añadir la opción de borrar la cuenta.

Otra mejora sería mejorar algo el diseño que por falta de tiempo no se ha podido retocar como es debido y se podría haber hecho más para rellenar ciertos huecos en la interfaz y mejorar algo el responsive.
