import { useState, useRef, ChangeEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { File as FileIcon, Folder, Download, Trash2, UploadCloud, FolderPlus, Image as ImageIcon, FileText, FileArchive, RefreshCw } from 'lucide-react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { getFiles, createFolder, uploadFile, deleteItem, downloadFile, StorageItem } from './services/storage.service';

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

const getFileIcon = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext || '')) return ImageIcon;
  if (['txt', 'md', 'json', 'csv'].includes(ext || '')) return FileText;
  if (['zip', 'tar', 'gz', 'rar'].includes(ext || '')) return FileArchive;
  return FileIcon;
}

export default function StoragePage() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [currentPath, setCurrentPath] = useState('/');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: items, isLoading, refetch } = useQuery<StorageItem[], Error>({
    queryKey: ['storage', currentPath],
    queryFn: () => getFiles(currentPath, token),
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadFile(currentPath, file, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['storage', currentPath] }),
  });

  const createFolderMutation = useMutation({
    mutationFn: (name: string) => createFolder(currentPath, name, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['storage', currentPath] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (path: string) => deleteItem(path, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['storage', currentPath] }),
  });

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(file => uploadMutation.mutate(file));
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => uploadMutation.mutate(file));
    }
  };

  const handleCreateFolder = () => {
    const name = prompt('New folder name:');
    if (name) createFolderMutation.mutate(name);
  };

  const navigateTo = (path: string) => setCurrentPath(path);
  const breadcrumbs = currentPath.split('/').filter(Boolean);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-background text-foreground h-full">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Storage</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
            <button onClick={() => navigateTo('/')} className="hover:text-foreground transition-colors">Home</button>
            {breadcrumbs.map((crumb, idx) => {
              const fullPath = '/' + breadcrumbs.slice(0, idx + 1).join('/');
              return (
                <span key={fullPath} className="flex items-center gap-2">
                  <span>/</span>
                  <button onClick={() => navigateTo(fullPath)} className="hover:text-foreground transition-colors">{crumb}</button>
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
          <button onClick={() => void refetch()} className="p-2 rounded-xl border border-border bg-card/60 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"><RefreshCw size={18} /></button>
          <button onClick={handleCreateFolder} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/60 hover:bg-accent transition-colors text-sm font-medium"><FolderPlus size={16} /> New Folder</button>
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"><UploadCloud size={16} /> Upload</button>
        </div>
      </motion.div>

      <div 
        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
        className={`relative min-h-[400px] rounded-2xl border-2 border-dashed p-6 transition-colors ${isDragOver ? 'border-primary bg-primary/5' : 'border-border/60 bg-card/20'}`}
      >
        {isDragOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl">
            <UploadCloud size={48} className="text-primary mb-4 animate-bounce" />
            <h3 className="text-xl font-bold">Drop files to upload</h3>
            <p className="text-muted-foreground mt-2">to {currentPath === '/' ? 'Home' : currentPath}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-full"><RefreshCw className="animate-spin text-muted-foreground" /></div>
        ) : items?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-20">
            <Folder size={48} className="text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">This folder is empty</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items?.map(item => {
              const isFolder = item.type === 'folder';
              const Icon = isFolder ? Folder : getFileIcon(item.name);
              const itemPath = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`;
              
              return (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={item.name}
                  className="group relative flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${isFolder ? 'bg-blue-500/10 text-blue-400' : 'bg-muted text-muted-foreground'}`}>
                      <Icon size={24} />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      {!isFolder && (
                        <button onClick={() => downloadFile(itemPath, item.name, token)} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground">
                          <Download size={14} />
                        </button>
                      )}
                      <button onClick={() => { if(confirm(`Delete ${item.name}?`)) deleteMutation.mutate(itemPath); }} className="p-1.5 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <button onClick={() => isFolder ? navigateTo(itemPath) : null} className={`text-left ${isFolder ? 'cursor-pointer hover:text-primary' : 'cursor-default'}`}>
                    <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                  </button>
                  <div className="flex items-center justify-between mt-1 pt-2 border-t border-border/30">
                    <span className="text-xs text-muted-foreground">{new Date(item.updatedAt).toLocaleDateString()}</span>
                    <span className="text-xs text-muted-foreground">{isFolder ? '--' : formatBytes(item.size)}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
