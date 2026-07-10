import React, { useState, useEffect } from 'react';
import { Database, Folder, FileJson, ChevronRight, ChevronDown } from 'lucide-react';
import { getMongoDatabases, getMongoCollections, getMongoDocuments } from '../../../shared/api';

export default function MongoDBPage() {
  const [databases, setDatabases] = useState([]);
  const [expandedDb, setExpandedDb] = useState(null);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDbs();
  }, []);

  const fetchDbs = async () => {
    try {
      setLoading(true);
      const data = await getMongoDatabases();
      setDatabases(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDbClick = async (dbName) => {
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
      const data = await getMongoCollections(dbName);
      setCollections(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectionClick = async (dbName, colName) => {
    setSelectedCollection(colName);
    try {
      setLoading(true);
      const data = await getMongoDocuments(dbName, colName);
      setDocuments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
      {/* Sidebar for DBs and Collections */}
      <div className="glass-panel" style={{ width: '250px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
          <Database size={20} color="var(--accent)" /> Databases
        </h3>
        <div style={{ overflowY: 'auto', flex: 1, paddingRight: '8px' }}>
          {databases.map(db => (
            <div key={db.name} style={{ marginBottom: '8px' }}>
              <div 
                onClick={() => handleDbClick(db.name)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 12px', borderRadius: '8px', background: expandedDb === db.name ? 'rgba(255,255,255,0.1)' : 'transparent', transition: 'background 0.2s', fontWeight: 500 }}
              >
                {expandedDb === db.name ? <ChevronDown size={16} color="var(--text-muted)" /> : <ChevronRight size={16} color="var(--text-muted)" />}
                <Database size={16} /> {db.name}
              </div>
              {expandedDb === db.name && (
                <div style={{ paddingLeft: '28px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {collections.map(col => (
                    <div 
                      key={col.name}
                      onClick={() => handleCollectionClick(db.name, col.name)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '8px 12px', borderRadius: '6px', fontSize: '14px', background: selectedCollection === col.name ? 'rgba(255,255,255,0.1)' : 'transparent', transition: 'background 0.2s' }}
                    >
                      <Folder size={14} color="var(--accent)" /> {col.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Area for Documents */}
      <div className="glass-panel" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '20px' }}>
          <FileJson size={24} color="var(--accent)" /> {selectedCollection ? `Documents: ${selectedCollection}` : 'Select a collection'}
        </h3>
        
        {loading && <div style={{ color: 'var(--text-muted)' }}>Loading...</div>}
        {error && <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '8px' }}>{error}</div>}
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {selectedCollection && !loading && documents.length === 0 && (
            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No documents found in this collection.</div>
          )}
          {documents.map((doc, i) => (
            <div key={doc._id || i} style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--border)' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '13px', overflowX: 'auto', color: 'var(--text-primary)' }}>
                {JSON.stringify(doc, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
