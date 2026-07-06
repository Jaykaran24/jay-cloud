const API_BASE_URL = 'http://localhost:3001/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Request failed');
  }
  return response.json();
}

export function getApps() {
  return request('/apps');
}

export function getFiles() {
  return request('/files');
}

export function uploadFiles(files) {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('files', file));

  return fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    return response.json();
  });
}

export function createFolder(name) {
  return request('/folders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
}

export function deleteFile(filename) {
  return request(`/files/${encodeURIComponent(filename)}`, {
    method: 'DELETE'
  });
}
