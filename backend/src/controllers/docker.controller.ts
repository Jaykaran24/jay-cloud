import { Request, Response } from 'express';
import Dockerode from 'dockerode';

const docker = new Dockerode({ socketPath: '/var/run/docker.sock' });

export async function listContainers(_req: Request, res: Response): Promise<void> {
  try {
    const containers = await docker.listContainers({ all: true });
    const formatted = containers.map(c => ({
      id: c.Id.slice(0, 12),
      name: c.Names[0]?.replace('/', '') ?? 'unnamed',
      image: c.Image,
      status: c.State as string,
      state: c.Status,
      ports: c.Ports.map(p =>
        p.PublicPort ? `${p.PublicPort}:${p.PrivatePort}` : `${p.PrivatePort}`
      ).filter(Boolean),
      created: new Date(c.Created * 1000).toISOString(),
      uptime: c.Status,
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list containers' });
  }
}

export async function startContainer(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const container = docker.getContainer(id);
    await container.start();
    res.json({ message: 'Container started' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to start container' });
  }
}

export async function stopContainer(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const container = docker.getContainer(id);
    await container.stop();
    res.json({ message: 'Container stopped' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to stop container' });
  }
}

export async function restartContainer(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);
    const container = docker.getContainer(id);
    await container.restart();
    res.json({ message: 'Container restarted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to restart container' });
  }
}
