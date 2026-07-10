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

async function handleResponse(res: Response, defaultMessage: string) {
  if (!res.ok) {
    let errorMsg = defaultMessage;
    try {
      const errorData = await res.json();
      if (errorData.message) errorMsg = errorData.message;
    } catch (e) {}
    throw new Error(errorMsg);
  }
  return res.json();
}

export async function getMongoDatabases(token: string | null): Promise<any[]> {
  const res = await authFetch('/api/mongo/dbs', token);
  return handleResponse(res, 'Failed to fetch databases');
}

export async function getMongoCollections(dbName: string, token: string | null): Promise<any[]> {
  const res = await authFetch(`/api/mongo/dbs/${encodeURIComponent(dbName)}/collections`, token);
  return handleResponse(res, 'Failed to fetch collections');
}

export async function getMongoDocuments(dbName: string, colName: string, token: string | null): Promise<any[]> {
  const res = await authFetch(`/api/mongo/dbs/${encodeURIComponent(dbName)}/collections/${encodeURIComponent(colName)}/docs`, token);
  return handleResponse(res, 'Failed to fetch documents');
}
