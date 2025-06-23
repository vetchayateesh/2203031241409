import { ShortenedUrl, UrlStats, ApiResponse } from '../types';

class UrlService {
  private baseUrl = 'https://api.freeCodeCamp.org/api/shorturl';
  private localStorageKey = 'urlShortener_urls';

  // Generate a random short code
  private generateShortCode(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Validate URL format
  private isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  // Get stored URLs from localStorage
  private getStoredUrls(): ShortenedUrl[] {
    const stored = localStorage.getItem(this.localStorageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Save URLs to localStorage
  private saveUrls(urls: ShortenedUrl[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(urls));
  }

  // Shorten URL
  async shortenUrl(originalUrl: string): Promise<ApiResponse<ShortenedUrl>> {
    try {
      if (!this.isValidUrl(originalUrl)) {
        return {
          success: false,
          error: 'Invalid URL format'
        };
      }

      const urls = this.getStoredUrls();
      
      // Check if URL already exists
      const existing = urls.find(url => url.originalUrl === originalUrl);
      if (existing) {
        return {
          success: true,
          data: existing
        };
      }

      const shortCode = this.generateShortCode();
      const shortUrl = `https://fcc-url-shortener.herokuapp.com/${shortCode}`;
      
      const newUrl: ShortenedUrl = {
        id: Date.now().toString(),
        originalUrl,
        shortCode,
        shortUrl,
        createdAt: new Date().toISOString(),
        clickCount: 0
      };

      urls.unshift(newUrl);
      this.saveUrls(urls);

      return {
        success: true,
        data: newUrl
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to shorten URL'
      };
    }
  }

  // Get URL by short code
  async getUrl(shortCode: string): Promise<ApiResponse<ShortenedUrl>> {
    try {
      const urls = this.getStoredUrls();
      const url = urls.find(u => u.shortCode === shortCode);
      
      if (!url) {
        return {
          success: false,
          error: 'Short URL not found'
        };
      }

      // Increment click count
      url.clickCount++;
      this.saveUrls(urls);

      return {
        success: true,
        data: url
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to retrieve URL'
      };
    }
  }

  // Get statistics
  getStats(): UrlStats {
    const urls = this.getStoredUrls();
    return {
      totalUrls: urls.length,
      totalClicks: urls.reduce((sum, url) => sum + url.clickCount, 0),
      recentUrls: urls.slice(0, 10)
    };
  }

  // Get all URLs
  getAllUrls(): ShortenedUrl[] {
    return this.getStoredUrls();
  }

  // Delete URL
  deleteUrl(id: string): boolean {
    try {
      const urls = this.getStoredUrls();
      const filteredUrls = urls.filter(url => url.id !== id);
      this.saveUrls(filteredUrls);
      return true;
    } catch {
      return false;
    }
  }
}

export const urlService = new UrlService();