'use client';

import { FormEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useCreateOrder } from '@/hooks/useCreateOrder';

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const eventName =
    searchParams.get('event') ?? '';

  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(1);

  const createOrderMutation =
    useCreateOrder();

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    createOrderMutation.mutate({
      eventName,
      email,
      quantity,
    });
  }

  if (!eventName) {
    return (
      <main>
        <h1>Evento no seleccionado</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Finalizar compra</h1>

      <p>
        Evento: <strong>{eventName}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="quantity">
            Cantidad
          </label>

          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(event) =>
              setQuantity(
                Number(event.target.value),
              )
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={createOrderMutation.isPending}
        >
          {createOrderMutation.isPending
            ? 'Procesando...'
            : 'Confirmar compra'}
        </button>
      </form>

      {createOrderMutation.isSuccess && (
        <section>
          <h2>Orden creada correctamente</h2>

          <p>
            ID:{' '}
            {createOrderMutation.data?.id}
          </p>

          <p>
            La orden está siendo procesada.
          </p>
        </section>
      )}

      {createOrderMutation.isError && (
        <p>
          {createOrderMutation.error instanceof Error
            ? createOrderMutation.error.message
            : 'No se pudo crear la orden'}
        </p>
      )}
    </main>
  );
}