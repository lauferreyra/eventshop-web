const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL is not configured',
  );
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    },
  );

  if (!response.ok) {
    const errorBody =
      await response.json().catch(() => null);

    throw new Error(
      errorBody?.message ??
        `Request failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
}