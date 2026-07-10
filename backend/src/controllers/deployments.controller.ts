import { Request, Response } from 'express';
import Dockerode from 'dockerode';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const docker = new Dockerode({ socketPath: '/var/run/docker.sock' });

export async function deployApp(req: Request, res: Response): Promise<void> {
  try {
    const { projectName, envVars, deploymentType, gitUrl, dockerImage, subdomain, port } = req.body;
    const file = req.file;

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

    const envArgs = parsedEnv.map(e => `-e "${e}"`).join(' ');
    const safeProjectName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const containerName = `jay-cloud-${safeProjectName}`;

    try {
      await execPromise(`docker rm -f ${containerName}`);
    } catch (e) {}

    try {
      await execPromise(`docker network inspect jay-cloud-net`);
    } catch (e) {
      await execPromise(`docker network create jay-cloud-net`);
    }

    let labelArgs = '';
    if (subdomain && port) {
      labelArgs = `--label 'traefik.enable=true' --label 'traefik.http.routers.${containerName}.rule=Host(\`${subdomain}.jay24codes.me\`)' --label 'traefik.http.services.${containerName}.loadbalancer.server.port=${port}'`;
    }
    const networkArgs = `--network jay-cloud-net`;

    const extractDir = path.join(process.cwd(), 'storage', 'deployments', safeProjectName);

    if (deploymentType === 'zip') {
      if (!file) {
        res.status(400).json({ error: 'No zip file provided' });
        return;
      }
      if (!fs.existsSync(extractDir)) {
        fs.mkdirSync(extractDir, { recursive: true });
      }
      const zipPath = path.join(extractDir, file.originalname);
      fs.renameSync(file.path, zipPath);
      await execPromise(`unzip -o ${zipPath} -d ${extractDir}`);
      await execPromise(`docker build -t ${containerName} ${extractDir}`);
      await execPromise(`docker run -d --name ${containerName} ${networkArgs} ${labelArgs} ${envArgs} -P ${containerName}`);
    } else if (deploymentType === 'github') {
      if (!gitUrl) {
        res.status(400).json({ error: 'Git URL is required' });
        return;
      }
      if (fs.existsSync(extractDir)) {
        fs.rmSync(extractDir, { recursive: true, force: true });
      }
      await execPromise(`git clone ${gitUrl} ${extractDir}`);
      await execPromise(`docker build -t ${containerName} ${extractDir}`);
      await execPromise(`docker run -d --name ${containerName} ${networkArgs} ${labelArgs} ${envArgs} -P ${containerName}`);
    } else if (deploymentType === 'image') {
      if (!dockerImage) {
        res.status(400).json({ error: 'Docker image name is required' });
        return;
      }
      await execPromise(`docker run -d --name ${containerName} ${networkArgs} ${labelArgs} ${envArgs} -P ${dockerImage}`);
    } else {
      res.status(400).json({ error: 'Invalid deployment type' });
      return;
    }

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

export async function stopDeployment(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const container = docker.getContainer(id);
    await container.stop();
    res.json({ message: 'Deployment stopped' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to stop deployment' });
  }
}

export async function startDeployment(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const container = docker.getContainer(id);
    await container.start();
    res.json({ message: 'Deployment started' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to start deployment' });
  }
}

export async function restartDeployment(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const container = docker.getContainer(id);
    await container.restart();
    res.json({ message: 'Deployment restarted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to restart deployment' });
  }
}

export async function deleteDeployment(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const container = docker.getContainer(id);
    await container.remove({ force: true });
    res.json({ message: 'Deployment deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete deployment' });
  }
}
