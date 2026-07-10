import { Request, Response } from 'express';
import Dockerode from 'dockerode';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const docker = new Dockerode({ socketPath: '/var/run/docker.sock' });

export async function uploadAndDeploy(req: Request, res: Response): Promise<void> {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'No zip file provided' });
      return;
    }

    const { projectName, envVars } = req.body;
    if (!projectName) {
      res.status(400).json({ error: 'Project name is required' });
      return;
    }

    let parsedEnv: string[] = [];
    if (envVars) {
      try {
        const envObj = JSON.parse(envVars);
        parsedEnv = Object.keys(envObj).map(key => `${key}=${envObj[key]}`);
      } catch (e) {
        // Fallback
      }
    }

    const extractDir = path.join(process.cwd(), 'storage', 'deployments', projectName);
    if (!fs.existsSync(extractDir)) {
      fs.mkdirSync(extractDir, { recursive: true });
    }

    const zipPath = path.join(extractDir, file.originalname);
    fs.renameSync(file.path, zipPath);

    await execPromise(`unzip -o ${zipPath} -d ${extractDir}`);

    const imageName = `jay-cloud-${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    await execPromise(`docker build -t ${imageName} ${extractDir}`);

    try {
      await execPromise(`docker rm -f ${imageName}`);
    } catch (e) {}

    const envArgs = parsedEnv.map(e => `-e "${e}"`).join(' ');
    await execPromise(`docker run -d --name ${imageName} ${envArgs} -P ${imageName}`);

    res.json({ message: 'Deployment successful', projectName });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Deployment failed' });
  }
}

export async function getDeployments(_req: Request, res: Response): Promise<void> {
  try {
    const containers = await docker.listContainers({ all: true });
    const deployments = containers
      .filter(c => c.Names.some(n => n.includes('/jay-cloud-')))
      .map(c => ({
        id: c.Id.slice(0, 12),
        name: c.Names[0]?.replace('/jay-cloud-', '') ?? 'unknown',
        image: c.Image,
        state: c.State,
        status: c.Status,
        ports: c.Ports.map(p =>
          p.PublicPort ? `${p.PublicPort}:${p.PrivatePort}` : `${p.PrivatePort}`
        ).filter(Boolean),
        created: new Date(c.Created * 1000).toISOString(),
      }));
    res.json(deployments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list deployments' });
  }
}
