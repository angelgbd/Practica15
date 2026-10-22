espuestas

- El 404 conserva encabezado y pie porque es una ruta hija del layout. El layout se renderiza para todas sus rutas hijas y `<Outlet />` solo cambia el contenido central.
- `Link` cambia la URL con el router y conserva la aplicación montada. Un `<a href>` navega como documento: el navegador solicita otra vez la página HTML y vuelve a iniciar la aplicación. En Red, `Link` no crea una petición de tipo documento al navegar; `<a href>` sí.
- `useParams()` entrega el `id` como texto, por ejemplo `"1"`. Se convierte a número antes de llamar el servicio tipado y para compararlo con IDs numéricos; sin convertir, comparaciones como `1 === "1"` fallan.
- El efecto de `useClase` depende de `id`. Si se omite esa dependencia, ir de `/clases/1` a `/clases/2` mantiene el componente montado y el efecto no solicita la nueva clase; la vista conserva los datos anteriores.
