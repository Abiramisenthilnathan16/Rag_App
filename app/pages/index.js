'use client'; // Required for using React hooks (useState, etc.)

import { useState } from 'react';

export default function Home() {
  const [urls, setUrls] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleScrape = async () => {
    const res = await fetch('/api/scrape', {
      method: 'POST',
      body: JSON.stringify({ urls }),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleQuery = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>RAG Chat Application</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter URLs (comma-separated)"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          style={{ width: '300px', padding: '10px', marginRight: '10px' }}
        />
        <button
          onClick={handleScrape}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Scrape URLs
        </button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Ask a question"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '300px', padding: '10px', marginRight: '10px' }}
        />
        <button
          onClick={handleQuery}
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Ask
        </button>
      </div>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}