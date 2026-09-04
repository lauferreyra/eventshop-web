'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

import { useOrder } from '@/hooks/use-orders';

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
      <main>
        <h1>Procesando tu orden...</h1>
        <p>Estamos procesando tu reserva.</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <h1>No pudimos cargar la orden</h1>

        <p>
          {error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado.'}
        </p>

        <Link href="/events">
          Volver a eventos
        </Link>
      </main>
    );
  }

  if (!order) {
    return (
      <main>
        <h1>Orden no encontrada</h1>

        <Link href="/events">
          Volver a eventos
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Orden #{order.id}</h1>

      <p>
        Evento: <strong>{order.eventName}</strong>
      </p>

      <p>
        Cantidad: <strong>{order.quantity}</strong>
      </p>

      <p>
        Email: <strong>{order.email}</strong>
      </p>

      <p>
        Estado:{' '}
        <strong>{order.status}</strong>
      </p>

      {order.status === 'PENDING' && (
        <p>
          Estamos preparando tu reserva...
        </p>
      )}

      {order.status === 'RESERVED' && (
        <p>
          Entradas reservadas. Estamos procesando el
          pago...
        </p>
      )}

      {order.status === 'COMPLETED' && (
        <section>
          <h2>¡Compra confirmada! 🎉</h2>

          <p>
            Tu pago fue aprobado y tus entradas están
            confirmadas.
          </p>

          <Link href="/events">
            Ver más eventos
          </Link>
        </section>
      )}

      {order.status === 'FAILED' && (
        <section>
          <h2>No pudimos completar la compra</h2>

          <p>
            El pago fue rechazado o la reserva no pudo
            completarse.
          </p>

          <Link href="/events">
            Volver a eventos
          </Link>
        </section>
      )}
    </main>
  );
}