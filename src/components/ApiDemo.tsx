import React, { useState } from 'react';
import { Code, Play, Copy } from 'lucide-react';

export const ApiDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shorten' | 'redirect'>('shorten');
  const [testUrl, setTestUrl] = useState('https://www.example.com');
  const [testCode, setTestCode] = useState('abc123');

  const shortenExample = `POST /api/shorturl
Content-Type: application/json

{
  "url": "${testUrl}"
}

Response:
{
  "original_url": "${testUrl}",
  "short_url": "https://fcc-url-shortener.herokuapp.com/abc123"
}`;

  const redirectExample = `GET /api/shorturl/${testCode}

Response:
{
  "original_url": "https://www.example.com",
  "short_url": "https://fcc-url-shortener.herokuapp.com/${testCode}",
  "click_count": 42
}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center space-x-2 mb-6">
        <Code className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">API Documentation</h2>
      </div>

      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('shorten')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeTab === 'shorten'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Shorten URL
        </button>
        <button
          onClick={() => setActiveTab('redirect')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeTab === 'redirect'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Get URL
        </button>
      </div>

      {activeTab === 'shorten' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test URL:
            </label>
            <input
              type="url"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              {shortenExample}
            </pre>
            <button
              onClick={() => copyToClipboard(shortenExample)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'redirect' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Code:
            </label>
            <input
              type="text"
              value={testCode}
              onChange={(e) => setTestCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
              {redirectExample}
            </pre>
            <button
              onClick={() => copyToClipboard(redirectExample)}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">API Endpoints</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li><code>POST /api/shorturl</code> - Create a shortened URL</li>
          <li><code>GET /api/shorturl/:short_url</code> - Redirect to original URL</li>
          <li><code>GET /api/shorturl/stats/:short_url</code> - Get URL statistics</li>
        </ul>
      </div>
    </div>
  );
};