import React from 'react';
import { ExternalLink, Copy, Trash2, Calendar, MousePointer } from 'lucide-react';
import { ShortenedUrl } from '../types';

interface UrlListProps {
  urls: ShortenedUrl[];
  onDelete: (id: string) => void;
}

export const UrlList: React.FC<UrlListProps> = ({ urls, onDelete }) => {
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (urls.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-gray-400 mb-4">
          <ExternalLink className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No URLs yet</h3>
        <p className="text-gray-600">Start by shortening your first URL above</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Shortened URLs</h2>
      <div className="space-y-4">
        {urls.map((url) => (
          <div key={url.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {url.originalUrl}
                  </h3>
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-blue-600 font-mono text-sm">{url.shortUrl}</span>
                  <button
                    onClick={() => copyToClipboard(url.shortUrl)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(url.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MousePointer className="w-3 h-3" />
                    <span>{url.clickCount} clicks</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDelete(url.id)}
                className="ml-4 text-gray-400 hover:text-red-600 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};