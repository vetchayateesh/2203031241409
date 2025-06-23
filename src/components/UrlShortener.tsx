import React, { useState } from 'react';
import { Link, Copy, Check, AlertCircle } from 'lucide-react';
import { urlService } from '../services/urlService';
import { ShortenedUrl } from '../types';

interface UrlShortenerProps {
  onUrlShortened: (url: ShortenedUrl) => void;
}

export const UrlShortener: React.FC<UrlShortenerProps> = ({ onUrlShortened }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrl | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    setIsLoading(true);
    setError('');
    setShortenedUrl(null);

    const result = await urlService.shortenUrl(originalUrl.trim());
    
    if (result.success && result.data) {
      setShortenedUrl(result.data);
      onUrlShortened(result.data);
      setOriginalUrl('');
    } else {
      setError(result.error || 'Failed to shorten URL');
    }
    
    setIsLoading(false);
  };

  const copyToClipboard = async () => {
    if (shortenedUrl) {
      try {
        await navigator.clipboard.writeText(shortenedUrl.shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Link className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Shortener</h1>
        <p className="text-gray-600">Transform long URLs into short, shareable links</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !originalUrl.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Shortening...</span>
            </>
          ) : (
            <>
              <Link className="w-5 h-5" />
              <span>Shorten URL</span>
            </>
          )}
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">URL Shortened Successfully!</h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shortenedUrl.shortUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-200"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};