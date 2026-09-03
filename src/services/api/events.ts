import { apiClient } from './client';
import type { Event } from '@/types/event';

export function getEvents() {
  return apiClient<Event[]>('/events');
}

export function getEvent(name: string) {
  return apiClient<Event>(
    `/events/${encodeURIComponent(name)}`,
  );
}