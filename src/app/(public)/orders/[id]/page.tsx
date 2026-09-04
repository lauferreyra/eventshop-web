'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useOrder } from '@/hooks/use-orders';

import styles from './page.module.scss';

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const orderId = params.id;

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useOrder(orderId);

  if (isLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner} />

            <h1>Procesando tu orden</h1>

            <p>
              Estamos procesando tu reserva. Esto puede
              tardar unos segundos.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.iconError}>!</div>

            <h1>No pudimos cargar la orden</h1>

            <p>
            {error instanceof Error
                ? error.message
                : JSON.stringify(error)}
            </p>

            <Link
              href="/events"
              className={styles.button}
            >
              Volver a eventos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <h1>Orden no encontrada</h1>

            <p>
              No encontramos una orden con el identificador
              solicitado.
            </p>

            <Link
              href="/events"
              className={styles.button}
            >
              Volver a eventos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isCompleted = order.status === 'COMPLETED';
  const isFailed = order.status === 'FAILED';

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            EVENTSHOP
          </span>

          <h1>Estado de tu orden</h1>

          <p>
            Orden #{order.id}
          </p>
        </div>

        <section className={styles.card}>
          <div
            className={`${styles.statusIcon} ${
              isCompleted
                ? styles.success
                : isFailed
                  ? styles.failed
                  : styles.pending
            }`}
          >
            {isCompleted
              ? '✓'
              : isFailed
                ? '!'
                : '...'}
          </div>

          <div className={styles.status}>
            <h2>
              {isCompleted
                ? '¡Compra confirmada!'
                : isFailed
                  ? 'Compra rechazada'
                  : 'Procesando tu compra'}
            </h2>

            <p>
              {isCompleted
                ? 'Tu pago fue aprobado y tus entradas están confirmadas.'
                : isFailed
                  ? 'No pudimos completar el pago de tu compra.'
                  : order.status === 'RESERVED'
                    ? 'Tus entradas fueron reservadas. Estamos procesando el pago.'
                    : 'Estamos preparando tu reserva.'}
            </p>
          </div>

          <div className={styles.divider} />

          <div className={styles.details}>
            <div className={styles.detail}>
              <span>Evento</span>

              <strong>{order.eventName}</strong>
            </div>

            <div className={styles.detail}>
              <span>Cantidad</span>

              <strong>
                {order.quantity}{' '}
                {order.quantity === 1
                  ? 'entrada'
                  : 'entradas'}
              </strong>
            </div>

            <div className={styles.detail}>
              <span>Email</span>

              <strong>{order.email}</strong>
            </div>

            <div className={styles.detail}>
              <span>Estado</span>

              <strong>{order.status}</strong>
            </div>
          </div>

          {(isCompleted || isFailed) && (
            <>
              <div className={styles.divider} />

              <Link
                href="/events"
                className={styles.button}
              >
                {isCompleted
                  ? 'Ver más eventos'
                  : 'Volver a eventos'}
              </Link>
            </>
          )}
        </section>
      </div>
    </main>
  );
}