import { Link } from 'react-router-dom';

export function PaginaEntrar() {
  return (
    <section className="formulario">
      <h1>Inicia sesión</h1>
      <p className="pagina__bajada">
        El acceso para inscribirte estará disponible en la siguiente práctica.
      </p>
      <p className="formulario__pie">
        <Link to="/clases">Volver al catálogo</Link>
      </p>
    </section>
  );
}
