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

export async function getMongoDatabases(token: string | null): Promise<any[]> {
  const res = await authFetch('/api/mongo/dbs', token);
  if (!res.ok) throw new Error('Failed to fetch databases');
  return res.json();
}

export async function getMongoCollections(dbName: string, token: string | null): Promise<any[]> {
  const res = await authFetch(`/api/mongo/dbs/${encodeURIComponent(dbName)}/collections`, token);
  if (!res.ok) throw new Error('Failed to fetch collections');
  return res.json();
}

export async function getMongoDocuments(dbName: string, colName: string, token: string | null): Promise<any[]> {
  const res = await authFetch(`/api/mongo/dbs/${encodeURIComponent(dbName)}/collections/${encodeURIComponent(colName)}/docs`, token);
  if (!res.ok) throw new Error('Failed to fetch documents');
  return res.json();
}
