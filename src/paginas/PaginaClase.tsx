import { Link, useNavigate, useParams } from 'react-router-dom';
import { Cargando } from '../componentes/Cargando.tsx';
import { MensajeError } from '../componentes/MensajeError.tsx';
import { useClase } from '../hooks/useClase.ts';
import { urlImagen } from '../servicios/api.ts';

export function PaginaClase() {
  const { id } = useParams<{ id: string }>();
  const { clase, cargando, error, reintentar } = useClase(id);
  const navigate = useNavigate();

  if (cargando) return <Cargando />;
  if (error || !clase) {
    return (
      <MensajeError
        mensaje={error ?? 'No se pudo cargar la clase.'}
        onReintentar={reintentar}
      />
    );
  }

  return (
    <>
      <Link to="/clases" className="detalle__volver">← Todas las clases</Link>

      <article className="detalle">
        <img className="detalle__imagen" src={urlImagen(clase.imagen)} alt={clase.nombre} />
        <div className="detalle__datos">
          <span className={`etiqueta etiqueta--${clase.categoria}`}>{clase.categoria}</span>
          <h1>{clase.nombre}</h1>
          <p className="pagina__bajada">
            {clase.descripcion} · {clase.duracionMin} min
          </p>

          <h2>Horarios</h2>
          {clase.horarios.length === 0 ? (
            <p className="aviso aviso--info">Todavía no hay horarios para esta clase.</p>
          ) : (
            <ul className="horarios">
              {clase.horarios.map((horario) => (
                <li className="horario" key={horario.id}>
                  <div>
                    <div className="horario__dia">
                      {horario.dia} · {horario.horaInicio}
                    </div>
                    <div className="horario__meta">
                      {horario.entrenador} · {horario.disponibles} de {horario.cupoMaximo} lugares disponibles
                    </div>
                  </div>
                  {horario.disponibles > 0 ? (
                    <button className="boton boton--chico" onClick={() => navigate('/entrar')}>
                      Inscribirme
                    </button>
                  ) : (
                    <span className="horario__lleno" aria-label="Horario lleno">Lleno</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </>
  );
}
