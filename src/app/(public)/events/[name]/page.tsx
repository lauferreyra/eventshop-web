'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useEvent } from '@/hooks/useEvent';

export default function EventDetailPage() {
  const params = useParams();

  const name = decodeURIComponent(
    params.name as string,
  );

  const {
    data: event,
    isLoading,
    isError,
  } = useEvent(name);

  if (isLoading) {
    return <main>Cargando evento...</main>;
  }

  if (isError || !event) {
    return (
      <main>
        <h1>Evento no encontrado</h1>

        <Link href="/">
          Volver a eventos
        </Link>
      </main>
    );
  }

  return (
    <main>
      <Link href="/">
        ← Volver
      </Link>

      <section>
        <h1>{event.name}</h1>

        <p>
          Precio: $
          {event.unitPrice.toLocaleString('es-AR')}
        </p>

        <p>
          Entradas disponibles: {event.stock}
        </p>

        <Link
          href={`/checkout?event=${encodeURIComponent(
            event.name,
          )}`}
        >
          Comprar entrada
        </Link>
      </section>
    </main>
  );
}