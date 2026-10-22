import { useEffect, useState } from 'react';
import { mensajeDeError } from '../servicios/api.ts';
import { traerClase } from '../servicios/gimnasio.ts';
import type { ClaseConHorarios } from '../tipos.ts';

export function useClase(id: string | undefined) {
  const [clase, setClase] = useState<ClaseConHorarios | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let vigente = true;
    const idNumerico = Number(id);

    setClase(null);
    setCargando(true);
    setError(null);

    if (!id || !Number.isInteger(idNumerico) || idNumerico < 1) {
      setError('No existe una clase con ese identificador.');
      setCargando(false);
      return () => {
        vigente = false;
      };
    }

    traerClase(idNumerico)
      .then((resultado) => {
        if (vigente) setClase(resultado);
      })
      .catch((e: unknown) => {
        if (vigente) setError(mensajeDeError(e, 'No se pudo cargar la clase.'));
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [id, intento]);

  function reintentar() {
    setError(null);
    setCargando(true);
    setIntento((actual) => actual + 1);
  }

  return { clase, cargando, error, reintentar };
}
