'use client';

import styled from 'styled-components';

import { EventCard } from '@/components/events/EventCard';
import { useEvents } from '@/hooks/useEvents';

export default function HomePage() {
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useEvents();

  return (
    <Page>
      <Hero>
        <Container>
          <Eyebrow>EVENTSHOP</Eyebrow>

          <Title>
            Viví el evento.
            <br />
            <Highlight>
              Nosotros hacemos el resto.
            </Highlight>
          </Title>

          <Description>
            Descubrí eventos, elegí tus entradas y
            reservá tu lugar de forma simple y segura.
          </Description>
        </Container>
      </Hero>

      <EventsSection>
        <Container>
          <SectionHeader>
            <SectionEyebrow>
              PRÓXIMOS EVENTOS
            </SectionEyebrow>

            <SectionTitle>
              Encontrá tu próximo evento
            </SectionTitle>
          </SectionHeader>

          {isLoading && (
            <State>Cargando eventos...</State>
          )}

          {isError && (
            <State>
              {error instanceof Error
                ? error.message
                : 'No se pudieron cargar los eventos.'}
            </State>
          )}

          {!isLoading &&
            !isError &&
            events?.length === 0 && (
              <State>
                No hay eventos disponibles.
              </State>
            )}

          {events && events.length > 0 && (
            <EventsGrid>
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}
            </EventsGrid>
          )}
        </Container>
      </EventsSection>
    </Page>
  );
}

const Page = styled.main`
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
`;

const Container = styled.div`
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
`;

const Hero = styled.section`
  min-height: 65vh;

  display: flex;
  align-items: center;

  border-bottom: 1px solid #292929;

  background:
    radial-gradient(
      circle at 75% 40%,
      rgba(212, 175, 55, 0.12),
      transparent 35%
    ),
    #0a0a0a;

  @media (max-width: 768px) {
    min-height: 55vh;
  }
`;

const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 24px;

  color: #d4af37;

  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.25rem;
`;

const Title = styled.h1`
  max-width: 900px;

  font-size: clamp(3rem, 7vw, 6rem);
  line-height: 0.95;
  letter-spacing: -0.04em;

  @media (max-width: 768px) {
    font-size: 3.2rem;
  }
`;

const Highlight = styled.span`
  color: #d4af37;
`;

const Description = styled.p`
  max-width: 600px;
  margin-top: 32px;

  color: #a0a0a0;

  font-size: 1.1rem;
  line-height: 1.7;
`;

const EventsSection = styled.section`
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 70px 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 48px;
`;

const SectionEyebrow = styled.span`
  color: #d4af37;

  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
`;

const SectionTitle = styled.h2`
  margin-top: 12px;

  font-size: clamp(2rem, 4vw, 3rem);
`;

const EventsGrid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(280px, 1fr)
    );

  gap: 24px;
`;

const State = styled.p`
  padding: 40px 0;

  color: #a0a0a0;
`;