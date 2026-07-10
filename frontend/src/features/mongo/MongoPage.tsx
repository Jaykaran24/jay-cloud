import { useState, useEffect } from 'react';
import { Database, Folder, FileJson, ChevronRight, ChevronDown } from 'lucide-react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { getMongoDatabases, getMongoCollections, getMongoDocuments } from './services/mongo.service';

export default function MongoPage() {
  const { token } = useAuth();
  const [databases, setDatabases] = useState<any[]>([]);
  const [expandedDb, setExpandedDb] = useState<string | null>(null);
  const [collections, setCollections] = useState<any[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDbs();
  }, []);

  const fetchDbs = async () => {
    try {
      setLoading(true);
      const data = await getMongoDatabases(token);
      setDatabases(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDbClick = async (dbName: string) => {
    if (expandedDb === dbName) {
      setExpandedDb(null);
      setCollections([]);
      return;
    }
    setExpandedDb(dbName);
    setSelectedCollection(null);
    setDocuments([]);
    try {
      setLoading(true);
      const data = await getMongoCollections(dbName, token);
      setCollections(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectionClick = async (dbName: string, colName: string) => {
    setSelectedCollection(colName);
    try {
      setLoading(true);
      const data = await getMongoDocuments(dbName, colName, token);
      setDocuments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">MongoDB Manager</h1>
        <p className="text-muted-foreground mt-2">Manage your databases, collections, and documents.</p>
      </div>
      
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-64 bg-card border border-border rounded-xl flex flex-col p-4 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-lg">
            <Database size={18} className="text-primary" /> Databases
          </h3>
          <div className="overflow-y-auto flex-1 pr-2 space-y-1">
            {databases.map(db => (
              <div key={db.name} className="mb-1">
                <div 
                  onClick={() => handleDbClick(db.name)}
                  className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors font-medium text-sm ${expandedDb === db.name ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'}`}
                >
                  {expandedDb === db.name ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <Database size={14} /> {db.name}
                </div>
                {expandedDb === db.name && (
                  <div className="pl-6 mt-1 flex flex-col gap-1">
                    {collections.map(col => (
                      <div 
                        key={col.name}
                        onClick={() => handleCollectionClick(db.name, col.name)}
                        className={`flex items-center gap-2 cursor-pointer p-2 rounded-md text-sm transition-colors ${selectedCollection === col.name ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'}`}
                      >
                        <Folder size={14} className={selectedCollection === col.name ? "text-primary" : "text-muted-foreground"} /> {col.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 bg-card border border-border rounded-xl flex flex-col p-6 shadow-sm min-w-0">
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-xl border-b border-border pb-4">
            <FileJson size={24} className="text-primary" /> {selectedCollection ? `Documents: ${selectedCollection}` : 'Select a collection'}
          </h3>
          
          {loading && <div className="text-muted-foreground flex justify-center py-10">Loading...</div>}
          {error && <div className="text-destructive bg-destructive/10 p-4 rounded-lg mb-4">{error}</div>}
          
          <div className="flex-1 overflow-y-auto">
            {selectedCollection && !loading && documents.length === 0 && (
              <div className="text-muted-foreground italic flex justify-center py-10">No documents found in this collection.</div>
            )}
            {documents.map((doc, i) => (
              <div key={doc._id || i} className="bg-background border border-border p-4 rounded-lg mb-4 shadow-sm">
                <pre className="text-sm font-mono text-foreground overflow-auto max-h-96 whitespace-pre-wrap break-all">
                  {JSON.stringify(doc, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
