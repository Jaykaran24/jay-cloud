import { useState, useRef, ChangeEvent } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { File as FileIcon, Folder, Download, Trash2, UploadCloud, FolderPlus, Image as ImageIcon, FileText, FileArchive, RefreshCw, CheckSquare, Copy, MoveRight, X } from 'lucide-react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { getFiles, createFolder, uploadFile, deleteItem, downloadFile, deleteBatch, moveItems, copyItems } from './services/storage.service';
import type { StorageItem } from './services/storage.service';

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
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  
  // For Move/Copy Modal
  const [actionModal, setActionModal] = useState<{ type: 'move' | 'copy', paths: string[] } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const { data: items, isLoading, refetch } = useQuery<StorageItem[], Error>({
    queryKey: ['storage', currentPath],
    queryFn: () => getFiles(currentPath, token),
  });

  const uploadMutation = useMutation({
    mutationFn: ({ file, relativePath }: { file: File, relativePath: string }) => uploadFile(currentPath, file, relativePath, token),
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
  
  const deleteBatchMutation = useMutation({
    mutationFn: (paths: string[]) => deleteBatch(paths, token),
    onSuccess: () => {
      setSelectedItems(new Set());
      qc.invalidateQueries({ queryKey: ['storage', currentPath] });
    },
  });

  const moveMutation = useMutation({
    mutationFn: ({ paths, target }: { paths: string[], target: string }) => moveItems(paths, target, token),
    onSuccess: () => {
      setSelectedItems(new Set());
      setActionModal(null);
      qc.invalidateQueries({ queryKey: ['storage', currentPath] });
    },
  });

  const copyMutation = useMutation({
    mutationFn: ({ paths, target }: { paths: string[], target: string }) => copyItems(paths, target, token),
    onSuccess: () => {
      setSelectedItems(new Set());
      setActionModal(null);
      qc.invalidateQueries({ queryKey: ['storage', currentPath] });
    },
  });

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(file => uploadMutation.mutate({ file, relativePath: '' }));
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        // file.webkitRelativePath contains the full relative path if uploaded via folder input
        uploadMutation.mutate({ file, relativePath: file.webkitRelativePath || '' });
      });
    }
    // reset input
    e.target.value = '';
  };

  const handleCreateFolder = () => {
    const name = prompt('New folder name:');
    if (name) createFolderMutation.mutate(name);
  };

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    setSelectedItems(new Set()); // clear selection on navigate
  };
  
  const toggleSelection = (name: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const breadcrumbs = currentPath.split('/').filter(Boolean);

  const selectedPaths = Array.from(selectedItems).map(name => currentPath === '/' ? `/${name}` : `${currentPath}/${name}`);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-background text-foreground h-full relative">
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
          <input type="file" ref={folderInputRef} className="hidden" onChange={handleFileSelect} {...{ webkitdirectory: "true", directory: "true" } as any} />
          
          <button onClick={() => void refetch()} className="p-2 rounded-xl border border-border bg-card/60 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"><RefreshCw size={18} /></button>
          
          <div className="flex bg-primary rounded-xl overflow-hidden">
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"><UploadCloud size={16} /> Files</button>
            <div className="w-[1px] bg-primary-foreground/20"></div>
            <button onClick={() => folderInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"><FolderPlus size={16} /> Folder Upload</button>
          </div>
          
          <button onClick={handleCreateFolder} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/60 hover:bg-accent transition-colors text-sm font-medium"><FolderPlus size={16} /> New Folder</button>
        </div>
      </motion.div>

      {/* Bulk Action Toolbar */}
      {selectedItems.size > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between p-3 rounded-xl border border-primary/20 bg-primary/5 text-primary">
          <div className="flex items-center gap-3 font-medium text-sm">
            <CheckSquare size={18} /> {selectedItems.size} item{selectedItems.size !== 1 && 's'} selected
            <button onClick={() => setSelectedItems(new Set())} className="ml-2 text-xs opacity-70 hover:opacity-100">Clear</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setActionModal({ type: 'move', paths: selectedPaths })} className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg hover:bg-primary/10 transition-colors">
              <MoveRight size={14} /> Move
            </button>
            <button onClick={() => setActionModal({ type: 'copy', paths: selectedPaths })} className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg hover:bg-primary/10 transition-colors">
              <Copy size={14} /> Copy
            </button>
            <button onClick={() => { if(confirm(`Delete ${selectedItems.size} items?`)) deleteBatchMutation.mutate(selectedPaths); }} className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg hover:bg-red-500/10 text-red-400 transition-colors">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </motion.div>
      )}

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
              const isSelected = selectedItems.has(item.name);
              
              return (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={item.name}
                  className={`group relative flex flex-col p-4 rounded-xl border transition-all overflow-hidden ${isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/40'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Checkbox for selection */}
                      <button onClick={(e) => { e.stopPropagation(); toggleSelection(item.name); }} className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-border/50 group-hover:border-primary/50'}`}>
                        {isSelected && <CheckSquare size={14} className="opacity-100" />}
                      </button>
                      <div className={`p-2 rounded-lg ${isFolder ? 'bg-blue-500/10 text-blue-400' : 'bg-muted text-muted-foreground'}`}>
                        <Icon size={24} />
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      {!isFolder && (
                        <button onClick={(e) => { e.stopPropagation(); downloadFile(itemPath, item.name, token); }} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground">
                          <Download size={14} />
                        </button>
                      )}
                      <button onClick={(e) => { e.stopPropagation(); if(confirm(`Delete ${item.name}?`)) deleteMutation.mutate(itemPath); }} className="p-1.5 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-400">
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

      {/* Move/Copy Target Modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-lg capitalize">{actionModal.type} Items</h3>
              <button onClick={() => setActionModal(null)} className="text-muted-foreground hover:text-foreground"><X size={20}/></button>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">Enter the destination folder path (e.g., <code className="text-foreground bg-accent px-1 py-0.5 rounded">/Work/Projects</code>). Use <code className="text-foreground bg-accent px-1 py-0.5 rounded">/</code> for root.</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                const target = new FormData(e.currentTarget).get('target') as string;
                if (!target) return;
                if (actionModal.type === 'move') {
                  moveMutation.mutate({ paths: actionModal.paths, target });
                } else {
                  copyMutation.mutate({ paths: actionModal.paths, target });
                }
              }}>
                <input type="text" name="target" defaultValue={currentPath} className="w-full p-2.5 bg-background border border-border rounded-lg text-sm mb-4 focus:outline-none focus:border-primary" autoFocus />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setActionModal(null)} className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-lg transition-colors">Cancel</button>
                  <button type="submit" disabled={moveMutation.isPending || copyMutation.isPending} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                    {(moveMutation.isPending || copyMutation.isPending) && <RefreshCw size={14} className="animate-spin" />}
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
