export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: string;
  clickCount: number;
}

export interface UrlStats {
  totalUrls: number;
  totalClicks: number;
  recentUrls: ShortenedUrl[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}