import React, { useState, useEffect } from 'react';
import { UrlShortener } from './components/UrlShortener';
import { UrlList } from './components/UrlList';
import { Stats } from './components/Stats';
import { ApiDemo } from './components/ApiDemo';
import { urlService } from './services/urlService';
import { ShortenedUrl, UrlStats } from './types';

function App() {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [stats, setStats] = useState<UrlStats>({ totalUrls: 0, totalClicks: 0, recentUrls: [] });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allUrls = urlService.getAllUrls();
    const urlStats = urlService.getStats();
    setUrls(allUrls);
    setStats(urlStats);
  };

  const handleUrlShortened = (newUrl: ShortenedUrl) => {
    loadData();
  };

  const handleDelete = (id: string) => {
    urlService.deleteUrl(id);
    loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <UrlShortener onUrlShortened={handleUrlShortened} />
        <Stats stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UrlList urls={urls} onDelete={handleDelete} />
          <ApiDemo />
        </div>

        <footer className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;