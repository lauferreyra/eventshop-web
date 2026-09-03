'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import { useEvent } from '@/hooks/useEvent';

export default function EventDetailPage() {
  const params = useParams();
  const name = decodeURIComponent(params.name as string);

  const { data: event, isLoading, isError } =
    useEvent(name);

  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <Page>
        <Container>
          <State>Cargando evento...</State>
        </Container>
      </Page>
    );
  }

  if (isError || !event) {
    return (
      <Page>
        <Container>
          <State>
            <h1>Evento no encontrado</h1>

            <BackLink href="/">
              ← Volver a eventos
            </BackLink>
          </State>
        </Container>
      </Page>
    );
  }

  const total = event.unitPrice * quantity;
  const maxQuantity = Math.min(event.stock, 10);

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1),
    );
  }

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(maxQuantity, current + 1),
    );
  }

  const isSoldOut = event.stock <= 0;

  return (
    <Page>
      <Container>
        <BackLink href="/">
          ← Volver a eventos
        </BackLink>

        <Content>
          <Left>
            <Eyebrow>LIVE EVENT</Eyebrow>

            <Title>{event.name}</Title>

            <Description>
              Asegurá tu lugar y disfrutá una
              experiencia inolvidable.
            </Description>

            <InfoGrid>
              <InfoBox>
                <Label>PRECIO POR ENTRADA</Label>

                <Value>
                  $
                  {event.unitPrice.toLocaleString(
                    'es-AR',
                  )}
                </Value>
              </InfoBox>

              <InfoBox>
                <Label>ENTRADAS DISPONIBLES</Label>

                <Value>{event.stock}</Value>
              </InfoBox>
            </InfoGrid>
          </Left>

          <PurchaseCard>
            <CardTitle>
              Reservá tus entradas
            </CardTitle>

            <QuantitySection>
              <Label>CANTIDAD</Label>

              <QuantitySelector>
                <QuantityButton
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  −
                </QuantityButton>

                <Quantity>
                  {quantity}
                </Quantity>

                <QuantityButton
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    quantity >= maxQuantity
                  }
                >
                  +
                </QuantityButton>
              </QuantitySelector>

              {event.stock > 10 && (
                <Hint>
                  Máximo 10 entradas por compra
                </Hint>
              )}
            </QuantitySection>

            <Total>
              <TotalLabel>TOTAL</TotalLabel>

              <TotalValue>
                $
                {total.toLocaleString('es-AR')}
              </TotalValue>
            </Total>

            {isSoldOut ? (
              <DisabledButton>
                Evento agotado
              </DisabledButton>
            ) : (
              <BuyLink
                href={`/checkout?event=${encodeURIComponent(
                  event.name,
                )}&quantity=${quantity}`}
              >
                Continuar con la compra →
              </BuyLink>
            )}
          </PurchaseCard>
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
  width: min(1100px, calc(100% - 40px));
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 60px;

  color: #a0a0a0;

  font-size: 0.9rem;

  &:hover {
    color: #d4af37;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 80px;
  align-items: start;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const Left = styled.div`
  padding-top: 20px;
`;

const Eyebrow = styled.span`
  color: #d4af37;

  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
`;

const Title = styled.h1`
  max-width: 700px;
  margin-top: 20px;

  font-size: clamp(2.8rem, 6vw, 5rem);
  line-height: 1;
  letter-spacing: -0.04em;
`;

const Description = styled.p`
  max-width: 600px;
  margin-top: 30px;

  color: #a0a0a0;

  font-size: 1.1rem;
  line-height: 1.7;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  margin-top: 60px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBox = styled.div`
  padding: 24px;

  border: 1px solid #292929;
  border-radius: 10px;

  background: #141414;
`;

const Label = styled.span`
  display: block;

  color: #737373;

  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
`;

const Value = styled.strong`
  display: block;
  margin-top: 10px;

  font-size: 1.3rem;
`;

const PurchaseCard = styled.aside`
  padding: 32px;

  border: 1px solid #292929;
  border-radius: 16px;

  background: #141414;

  @media (max-width: 500px) {
    padding: 24px;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.3rem;
`;

const QuantitySection = styled.div`
  margin-top: 35px;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;

  width: fit-content;

  margin-top: 14px;

  border: 1px solid #292929;
  border-radius: 8px;

  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 48px;
  height: 48px;

  border: 0;

  background: #1e1e1e;
  color: #ffffff;

  font-size: 1.4rem;

  &:hover:not(:disabled) {
    background: #292929;
  }

  &:disabled {
    cursor: not-allowed;
    color: #555555;
  }
`;

const Quantity = styled.span`
  width: 55px;

  text-align: center;
  font-weight: 700;
`;

const Hint = styled.p`
  margin-top: 10px;

  color: #737373;

  font-size: 0.75rem;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 35px;
  padding-top: 25px;

  border-top: 1px solid #292929;
`;

const TotalLabel = styled.span`
  color: #a0a0a0;

  font-size: 0.8rem;
  font-weight: 700;
`;

const TotalValue = styled.strong`
  color: #d4af37;

  font-size: 1.5rem;
`;

const BuyLink = styled(Link)`
  display: block;

  margin-top: 25px;
  padding: 15px;

  border-radius: 6px;

  background: #d4af37;
  color: #000000;

  text-align: center;
  font-weight: 700;

  &:hover {
    background: #e5c04a;
  }
`;

const DisabledButton = styled.div`
  margin-top: 25px;
  padding: 15px;

  border-radius: 6px;

  background: #292929;
  color: #737373;

  text-align: center;
  font-weight: 700;
`;

const State = styled.div`
  padding: 100px 0;

  color: #a0a0a0;

  h1 {
    margin-bottom: 30px;
    color: #ffffff;
  }
`;