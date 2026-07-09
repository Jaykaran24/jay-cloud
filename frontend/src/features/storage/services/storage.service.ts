export interface StorageItem {
  name: string;
  type: 'file' | 'folder';
  size: number;
  updatedAt: string;
}

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

export async function getFiles(path: string, token: string | null): Promise<StorageItem[]> {
  const res = await authFetch(`/api/storage?path=${encodeURIComponent(path)}`, token);
  if (!res.ok) throw new Error('Failed to fetch files');
  return res.json() as Promise<StorageItem[]>;
}

export async function createFolder(path: string, name: string, token: string | null): Promise<void> {
  const res = await authFetch('/api/storage/folder', token, {
    method: 'POST',
    body: JSON.stringify({ path, name }),
  });
  if (!res.ok) throw new Error('Failed to create folder');
}

export async function uploadFile(path: string, file: File, relativePath: string, token: string | null): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);
  
  const query = new URLSearchParams({ path });
  if (relativePath) {
    query.append('relativePath', relativePath);
  }
  
  const res = await authFetch(`/api/storage/upload?${query.toString()}`, token, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to upload file');
}

export async function deleteItem(path: string, token: string | null): Promise<void> {
  const res = await authFetch(`/api/storage/:name?path=${encodeURIComponent(path)}`, token, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete item');
}

export async function deleteBatch(paths: string[], token: string | null): Promise<void> {
  const res = await authFetch('/api/storage/delete-batch', token, {
    method: 'POST',
    body: JSON.stringify({ paths }),
  });
  if (!res.ok) throw new Error('Failed to delete items');
}

export async function moveItems(sourcePaths: string[], targetPath: string, token: string | null): Promise<void> {
  const res = await authFetch('/api/storage/move', token, {
    method: 'POST',
    body: JSON.stringify({ sourcePaths, targetPath }),
  });
  if (!res.ok) throw new Error('Failed to move items');
}

export async function copyItems(sourcePaths: string[], targetPath: string, token: string | null): Promise<void> {
  const res = await authFetch('/api/storage/copy', token, {
    method: 'POST',
    body: JSON.stringify({ sourcePaths, targetPath }),
  });
  if (!res.ok) throw new Error('Failed to copy items');
}

export function getDownloadUrl(path: string, token: string | null): string {
  return `/api/storage/download/item?path=${encodeURIComponent(path)}`;
}

export async function downloadFile(path: string, name: string, token: string | null) {
  const res = await authFetch(`/api/storage/download/item?path=${encodeURIComponent(path)}`, token);
  if (!res.ok) throw new Error('Failed to download file');
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
