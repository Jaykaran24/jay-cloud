async function authFetch(url: string, token: string | null, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options.headers as Record<string, string>) ?? {}),
    },
  });
}

export async function getDeployments(token: string | null): Promise<any[]> {
  const res = await authFetch('/api/deployments', token);
  if (!res.ok) throw new Error('Failed to fetch deployments');
  return res.json();
}

export async function uploadDeployment(projectName: string, file: File, envVars: string, token: string | null): Promise<any> {
  const formData = new FormData();
  formData.append('projectName', projectName);
  formData.append('file', file);
  formData.append('envVars', envVars);

  const res = await authFetch('/api/deployments/upload', token, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Deployment failed');
  }
  return res.json();
}
