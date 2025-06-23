import React from 'react';
import { BarChart3, Link, MousePointer, TrendingUp } from 'lucide-react';
import { UrlStats } from '../types';

interface StatsProps {
  stats: UrlStats;
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total URLs</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUrls}</p>
          </div>
          <div className="bg-blue-100 rounded-full p-3">
            <Link className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Clicks</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalClicks}</p>
          </div>
          <div className="bg-green-100 rounded-full p-3">
            <MousePointer className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg. Clicks</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalUrls > 0 ? Math.round(stats.totalClicks / stats.totalUrls) : 0}
            </p>
          </div>
          <div className="bg-purple-100 rounded-full p-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};