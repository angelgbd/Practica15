# Gimnasio Titanes · Práctica 15

Frontend React + TypeScript con rutas para el catálogo y detalle de clases. La estructura visual de las páginas parte del HTML del código base.

## Ejecutar

1. Arranca el backend del gimnasio en `http://localhost:3000`.
2. Instala dependencias y levanta Vite:

   ```bash
   npm install
   npm run dev
   ```

La API debe responder con el sobre `{ data, meta }`. `GET /clases` regresa la lista; `GET /clases/:id` regresa la clase con sus horarios, incluyendo entrenador, cupo máximo y lugares disponibles. Las imágenes se resuelven desde la misma API.

## Rutas

- `/` redirige a `/clases`.
- `/clases` muestra el catálogo.
- `/clases/:id` muestra la clase y sus horarios.
- `/entrar` recibe la navegación del botón «Inscribirme».
- Cualquier otra ruta muestra la página 404.

## Respuestas

- El 404 conserva encabezado y pie porque es una ruta hija del layout. El layout se renderiza para todas sus rutas hijas y `<Outlet />` solo cambia el contenido central.
- `Link` cambia la URL con el router y conserva la aplicación montada. Un `<a href>` navega como documento: el navegador solicita otra vez la página HTML y vuelve a iniciar la aplicación. En Red, `Link` no crea una petición de tipo documento al navegar; `<a href>` sí.
- `useParams()` entrega el `id` como texto, por ejemplo `"1"`. Se convierte a número antes de llamar el servicio tipado y para compararlo con IDs numéricos; sin convertir, comparaciones como `1 === "1"` fallan.
- El efecto de `useClase` depende de `id`. Si se omite esa dependencia, ir de `/clases/1` a `/clases/2` mantiene el componente montado y el efecto no solicita la nueva clase; la vista conserva los datos anteriores.
