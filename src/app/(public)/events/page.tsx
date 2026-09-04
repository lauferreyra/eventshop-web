'use client';

import Link from 'next/link';

import { useEvents } from '@/hooks/useEvents';

import styles from './page.module.scss';

export default function EventsPage() {
  const {
    data: events,
    isLoading,
    isError,
  } = useEvents();

  if (isLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1>Eventos</h1>
          <p>Cargando eventos...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1>Eventos</h1>
          <p>No pudimos cargar los eventos.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            EVENTSHOP
          </span>

          <h1>Todos los eventos</h1>

          <p>
            Encontrá tu próximo evento y asegurá tus
            entradas.
          </p>
        </div>

        <section className={styles.grid}>
          {events?.map((event) => (
            <Link
              key={event.name}
              href={`/events/${encodeURIComponent(
                event.name,
              )}`}
              className={styles.card}
            >
              <span className={styles.cardLabel}>
                EVENTO
              </span>

              <h2>{event.name}</h2>

              <div className={styles.info}>
                <span>
                  Stock: {event.stock}
                </span>

                <span>
                  ${event.unitPrice}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}