export interface Container {
  id: string;
  name: string;
  image: string;
  status: string;
  state: string;
  ports: string[];
  created: string;
  uptime: string;
}

async function authFetch(url: string, token: string | null, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options.headers as Record<string, string>) ?? {}),
    },
  });
}

export async function getContainers(token: string | null): Promise<Container[]> {
  const res = await authFetch('/api/docker/containers', token);
  if (!res.ok) throw new Error('Failed to fetch containers');
  return res.json() as Promise<Container[]>;
}

export async function startContainer(id: string, token: string | null): Promise<void> {
  const res = await authFetch(`/api/docker/containers/${id}/start`, token, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to start container');
}

export async function stopContainer(id: string, token: string | null): Promise<void> {
  const res = await authFetch(`/api/docker/containers/${id}/stop`, token, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to stop container');
}

export async function restartContainer(id: string, token: string | null): Promise<void> {
  const res = await authFetch(`/api/docker/containers/${id}/restart`, token, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to restart container');
}
