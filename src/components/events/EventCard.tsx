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
  return (
    <Card>
      <Content>
        <Label>EVENTO</Label>

        <Title>{event.name}</Title>

        <Info>
          <InfoItem>
            <InfoLabel>Precio</InfoLabel>

            <InfoValue>
              $
              {event.unitPrice.toLocaleString(
                'es-AR',
              )}
            </InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Disponibles</InfoLabel>

            <InfoValue>
              {event.stock}
            </InfoValue>
          </InfoItem>
        </Info>

        <StyledLink
          href={`/events/${encodeURIComponent(
            event.name,
          )}`}
        >
          Ver evento
        </StyledLink>
      </Content>
    </Card>
  );
}

const Card = styled.article`
  overflow: hidden;

  border: 1px solid #292929;
  border-radius: 16px;

  background: #141414;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: #d4af37;

    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.35);
  }
`;

const Content = styled.div`
  padding: 32px;
`;

const Label = styled.span`
  color: #d4af37;

  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18rem;
`;

const Title = styled.h3`
  min-height: 70px;
  margin-top: 16px;

  color: #ffffff;

  font-size: 1.5rem;
  line-height: 1.2;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 32px 0;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InfoLabel = styled.span`
  color: #8f8f8f;
  font-size: 0.8rem;
`;

const InfoValue = styled.strong`
  color: #ffffff;
  font-size: 1.1rem;
`;

const StyledLink = styled(Link)`
  display: block;

  padding: 14px;

  border-radius: 6px;

  background: #d4af37;
  color: #000000;

  text-align: center;
  font-weight: 700;

  transition: background 0.2s ease;

  &:hover {
    background: #e5c04a;
  }
`;