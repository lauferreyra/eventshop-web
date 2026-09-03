'use client';

import Link from 'next/link';
import styled from 'styled-components';

import type { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
}

export function EventCard({
  event,
}: EventCardProps) {
  const isSoldOut = event.stock <= 0;

  return (
    <Card $soldOut={isSoldOut}>
      <Top>
        <Category>LIVE EVENT</Category>

        {isSoldOut && (
          <SoldOut>AGOTADO</SoldOut>
        )}
      </Top>

      <Title>{event.name}</Title>

      <Divider />

      <Info>
        <InfoItem>
          <Label>PRECIO</Label>

          <Price>
            $
            {event.unitPrice.toLocaleString(
              'es-AR',
            )}
          </Price>
        </InfoItem>

        <InfoItem>
          <Label>ENTRADAS</Label>

          <Stock>
            {event.stock > 0
              ? `${event.stock} disponibles`
              : 'Sin stock'}
          </Stock>
        </InfoItem>
      </Info>

      {isSoldOut ? (
        <DisabledButton>
          Agotado
        </DisabledButton>
      ) : (
        <StyledLink
          href={`/events/${encodeURIComponent(
            event.name,
          )}`}
        >
          Ver evento
          <Arrow>→</Arrow>
        </StyledLink>
      )}
    </Card>
  );
}

const Card = styled.article<{
  $soldOut: boolean;
}>`
  padding: 28px;

  border: 1px solid #292929;
  border-radius: 16px;

  background: #141414;

  opacity: ${({ $soldOut }) =>
    $soldOut ? 0.65 : 1};

  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: ${({ $soldOut }) =>
      $soldOut
        ? 'none'
        : 'translateY(-6px)'};

    border-color: ${({ $soldOut }) =>
      $soldOut
        ? '#292929'
        : '#d4af37'};
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Category = styled.span`
  color: #d4af37;

  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
`;

const SoldOut = styled.span`
  padding: 5px 8px;

  border-radius: 4px;

  background: #292929;
  color: #a0a0a0;

  font-size: 0.65rem;
  font-weight: 700;
`;

const Title = styled.h3`
  min-height: 72px;

  margin-top: 24px;

  color: #ffffff;

  font-size: 1.5rem;
  line-height: 1.25;
`;

const Divider = styled.div`
  height: 1px;

  margin: 24px 0;

  background: #292929;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 28px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Label = styled.span`
  color: #737373;

  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
`;

const Price = styled.strong`
  color: #ffffff;

  font-size: 1.2rem;
`;

const Stock = styled.span`
  color: #a0a0a0;

  font-size: 0.85rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 14px 16px;

  border-radius: 6px;

  background: #d4af37;
  color: #000000;

  font-size: 0.9rem;
  font-weight: 700;

  transition: background 0.2s ease;

  &:hover {
    background: #e5c04a;
  }
`;

const Arrow = styled.span`
  font-size: 1.2rem;
`;

const DisabledButton = styled.div`
  padding: 14px 16px;

  border-radius: 6px;

  background: #292929;
  color: #737373;

  text-align: center;

  font-size: 0.9rem;
  font-weight: 700;
`;