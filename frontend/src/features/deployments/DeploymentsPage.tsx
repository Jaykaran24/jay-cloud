import { useState, useEffect } from 'react';
import { Rocket, UploadCloud, RefreshCw, Server, Activity } from 'lucide-react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { getDeployments, uploadDeployment } from './services/deployments.service';

export default function DeploymentsPage() {
  const { token } = useAuth();
  const [deployments, setDeployments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [projectName, setProjectName] = useState('');
  const [envVars, setEnvVars] = useState('{\n  "PORT": "3000"\n}');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDeployments();
  }, []);

  const fetchDeployments = async () => {
    try {
      setLoading(true);
      const data = await getDeployments(token);
      setDeployments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || !selectedFile) {
      setError('Project name and ZIP file are required.');
      return;
    }
    
    try {
      if (envVars) JSON.parse(envVars);
    } catch (err) {
      setError('Environment variables must be valid JSON.');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      await uploadDeployment(projectName, selectedFile, envVars, token);
      setProjectName('');
      setSelectedFile(null);
      setEnvVars('{\n  "PORT": "3000"\n}');
      await fetchDeployments();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deployments</h1>
          <p className="text-muted-foreground mt-2">Deploy and manage your applications from ZIP archives.</p>
        </div>
        <button 
          onClick={fetchDeployments} 
          disabled={loading}
          className="p-2 border border-border rounded-lg hover:bg-accent transition-colors"
        >
          <RefreshCw size={20} className={loading ? "animate-spin text-muted-foreground" : "text-foreground"} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Upload Form */}
        <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 shadow-sm overflow-y-auto">
          <h3 className="mb-6 flex items-center gap-2 font-semibold text-lg border-b border-border pb-4">
            <UploadCloud size={20} className="text-primary" /> New Deployment
          </h3>
          
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name</label>
              <input 
                type="text" 
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                placeholder="my-cool-app"
                className="w-full bg-background border border-border rounded-lg p-2 text-sm focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Source Code (ZIP)</label>
              <input 
                type="file" 
                accept=".zip"
                onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full bg-background border border-border rounded-lg p-2 text-sm focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Environment Variables (JSON)</label>
              <textarea 
                value={envVars}
                onChange={e => setEnvVars(e.target.value)}
                rows={5}
                className="w-full bg-background border border-border rounded-lg p-2 text-sm font-mono focus:border-primary focus:outline-none"
              />
            </div>

            {error && <div className="text-destructive bg-destructive/10 p-3 rounded-lg text-sm">{error}</div>}

            <button 
              type="submit" 
              disabled={uploading}
              className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              {uploading ? <RefreshCw size={18} className="animate-spin" /> : <Rocket size={18} />}
              {uploading ? 'Deploying...' : 'Deploy App'}
            </button>
          </form>
        </div>

        {/* Deployments List */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm overflow-y-auto flex flex-col">
          <h3 className="mb-6 flex items-center gap-2 font-semibold text-lg border-b border-border pb-4">
            <Server size={20} className="text-primary" /> Active Deployments
          </h3>
          
          <div className="flex-1 overflow-y-auto pr-2">
            {deployments.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
                <Rocket size={48} className="mb-4 opacity-20" />
                <p>No deployments found. Upload a ZIP file to get started.</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deployments.map(app => (
                <div key={app.id} className="bg-background border border-border rounded-xl p-4 shadow-sm hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-600/20 flex items-center justify-center">
                        <Activity size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground truncate max-w-[150px]" title={app.name}>{app.name}</h4>
                        <div className="flex items-center gap-2 text-xs mt-0.5">
                          <span className={`w-2 h-2 rounded-full ${app.state === 'running' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-muted-foreground capitalize">{app.state}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-t border-border/50 pt-2">
                      <span className="text-muted-foreground">ID:</span>
                      <span className="font-mono text-xs">{app.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ports:</span>
                      <span className="font-mono text-xs">{app.ports.join(', ') || 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Uptime:</span>
                      <span className="text-xs">{app.status}</span>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
