import { Elysia } from 'elysia';

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
}

export const rateLimitMiddleware = (
  options: RateLimitOptions = {
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  }
) => {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return new Elysia().derive(({ request, set }) => {
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    const now = Date.now();
    const resetTime = now + options.windowMs;

    if (!requests.has(ip)) {
      requests.set(ip, { count: 1, resetTime });
      return {};
    }

    const requestData = requests.get(ip)!;

    if (now > requestData.resetTime) {
      requestData.count = 1;
      requestData.resetTime = resetTime;
      return {};
    }

    requestData.count++;

    if (requestData.count > options.max) {
      set.status = 429;
      set.headers['Retry-After'] = `${Math.ceil((requestData.resetTime - now) / 1000)}`;
      return { error: options.message };
    }

    return {};
  });
};
