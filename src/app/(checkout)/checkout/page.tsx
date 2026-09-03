'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import { useCreateOrder } from '@/hooks/useCreateOrder';

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const eventName =
    searchParams.get('event') ?? '';

  const initialQuantity = Number(
    searchParams.get('quantity') ?? 1,
  );

  const [email, setEmail] = useState('');
  const [quantity] = useState(
    Math.max(1, initialQuantity),
  );

  const mutation = useCreateOrder();

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    mutation.mutate({
      eventName,
      email,
      quantity,
    });
  }

  if (!eventName) {
    return (
      <Page>
        <Container>
          <h1>Evento no seleccionado</h1>

          <BackLink href="/">
            ← Volver a eventos
          </BackLink>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container>
        <BackLink href="/">
          ← Volver a eventos
        </BackLink>

        <Content>
          <Header>
            <Eyebrow>CHECKOUT</Eyebrow>

            <Title>
              Finalizá tu compra
            </Title>

            <Description>
              Completá tus datos para reservar
              tus entradas.
            </Description>
          </Header>

          <FormCard>
            <EventSummary>
              <Label>EVENTO</Label>

              <EventName>
                {eventName}
              </EventName>

              <Quantity>
                {quantity}{' '}
                {quantity === 1
                  ? 'entrada'
                  : 'entradas'}
              </Quantity>
            </EventSummary>

            <Form onSubmit={handleSubmit}>
              <Field>
                <Label htmlFor="email">
                  EMAIL
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />
              </Field>

              <SubmitButton
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? 'Procesando...'
                  : 'Confirmar compra'}
              </SubmitButton>
            </Form>

            {mutation.isError && (
              <Error>
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : 'No se pudo crear la orden.'}
              </Error>
            )}

            {mutation.isSuccess && (
              <Success>
                <SuccessTitle>
                  Orden creada
                </SuccessTitle>

                <SuccessText>
                  Tu orden fue creada correctamente.
                  Estamos procesando el pago.
                </SuccessText>

                <OrderId>
                  ID: {mutation.data.id}
                </OrderId>

                <StatusLink
                  href={`/orders/${mutation.data.id}`}
                >
                  Ver estado de la compra →
                </StatusLink>
              </Success>
            )}
          </FormCard>
        </Content>
      </Container>
    </Page>
  );
}

const Page = styled.main`
  min-height: calc(100vh - 73px);
  padding: 60px 0 100px;

  background: #0a0a0a;
  color: #ffffff;
`;

const Container = styled.div`
  width: min(700px, calc(100% - 40px));
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 60px;

  color: #a0a0a0;

  &:hover {
    color: #d4af37;
  }
`;

const Content = styled.div``;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Eyebrow = styled.span`
  color: #d4af37;

  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
`;

const Title = styled.h1`
  margin-top: 15px;

  font-size: clamp(2.5rem, 6vw, 4rem);
  line-height: 1;
`;

const Description = styled.p`
  margin-top: 20px;

  color: #a0a0a0;
`;

const FormCard = styled.div`
  padding: 32px;

  border: 1px solid #292929;
  border-radius: 16px;

  background: #141414;
`;

const EventSummary = styled.div`
  padding-bottom: 25px;

  border-bottom: 1px solid #292929;
`;

const Label = styled.label`
  display: block;

  color: #737373;

  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
`;

const EventName = styled.h2`
  margin-top: 10px;

  font-size: 1.3rem;
`;

const Quantity = styled.p`
  margin-top: 8px;

  color: #a0a0a0;
`;

const Form = styled.form`
  margin-top: 30px;
`;

const Field = styled.div``;

const Input = styled.input`
  width: 100%;

  margin-top: 10px;
  padding: 14px 16px;

  border: 1px solid #292929;
  border-radius: 6px;

  outline: none;

  background: #0a0a0a;
  color: #ffffff;

  &:focus {
    border-color: #d4af37;
  }
`;

const SubmitButton = styled.button`
  width: 100%;

  margin-top: 25px;
  padding: 15px;

  border: 0;
  border-radius: 6px;

  background: #d4af37;
  color: #000000;

  font-weight: 700;

  &:hover:not(:disabled) {
    background: #e5c04a;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;

const Error = styled.p`
  margin-top: 20px;

  color: #ff6b6b;
`;

const Success = styled.div`
  margin-top: 30px;
  padding: 25px;

  border: 1px solid #2d4a2d;
  border-radius: 8px;

  background: #101810;
`;

const SuccessTitle = styled.h3`
  color: #8fce8f;
`;

const SuccessText = styled.p`
  margin-top: 10px;

  color: #a0a0a0;
`;

const OrderId = styled.p`
  margin-top: 15px;

  color: #ffffff;

  font-size: 0.85rem;
  word-break: break-all;
`;

const StatusLink = styled(Link)`
  display: inline-block;

  margin-top: 20px;

  color: #d4af37;
  font-weight: 700;
`;