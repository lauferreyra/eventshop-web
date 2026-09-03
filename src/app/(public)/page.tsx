'use client';

import Link from 'next/link';

import { useEvents } from '@/hooks/useEvents';

export default function HomePage() {
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useEvents();

  if (isLoading) {
    return (
      <main>
        <h1>Cargando eventos...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <h1>Error al cargar los eventos</h1>
        <p>
          {error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado'}
        </p>
      </main>
    );
  }

  return (
    <main>
      <section>
        <h1>EventShop</h1>

        <p>
          Encontrá tu próximo evento.
        </p>
      </section>

      <section>
        <h2>Eventos disponibles</h2>

        {events?.length === 0 ? (
          <p>No hay eventos disponibles.</p>
        ) : (
          <div>
            {events?.map((event) => (
              <article key={event.id}>
                <h3>{event.name}</h3>

                <p>
                  ${event.unitPrice.toLocaleString('es-AR')}
                </p>

                <p>
                  Stock disponible: {event.stock}
                </p>

                <Link
                  href={`/events/${encodeURIComponent(
                    event.name,
                  )}`}
                >
                  Ver evento
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}