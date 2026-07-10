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

export async function deployApp(
  projectName: string, 
  deploymentType: string, 
  envVars: string, 
  token: string | null,
  file?: File | null,
  gitUrl?: string,
  dockerImage?: string,
  subdomain?: string,
  port?: string
): Promise<any> {
  const formData = new FormData();
  formData.append('projectName', projectName);
  formData.append('deploymentType', deploymentType);
  formData.append('envVars', envVars);
  
  if (file) formData.append('file', file);
  if (gitUrl) formData.append('gitUrl', gitUrl);
  if (dockerImage) formData.append('dockerImage', dockerImage);
  if (subdomain) formData.append('subdomain', subdomain);
  if (port) formData.append('port', port);

  const res = await authFetch('/api/deployments/deploy', token, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Deployment failed');
  }
  return res.json();
}

export async function stopDeployment(id: string, token: string | null): Promise<any> {
  const res = await authFetch(`/api/deployments/${id}/stop`, token, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to stop deployment');
  return res.json();
}

export async function startDeployment(id: string, token: string | null): Promise<any> {
  const res = await authFetch(`/api/deployments/${id}/start`, token, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to start deployment');
  return res.json();
}

export async function restartDeployment(id: string, token: string | null): Promise<any> {
  const res = await authFetch(`/api/deployments/${id}/restart`, token, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to restart deployment');
  return res.json();
}

export async function deleteDeployment(id: string, token: string | null): Promise<any> {
  const res = await authFetch(`/api/deployments/${id}`, token, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete deployment');
  return res.json();
}
