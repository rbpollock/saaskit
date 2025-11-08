/**
 * Simple in-memory rate limiting
 * For production with multiple instances, use Redis/Upstash instead
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store
const store = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  /**
   * Unique identifier (e.g., user ID, email, IP)
   */
  identifier: string;

  /**
   * Maximum number of requests allowed
   */
  limit: number;

  /**
   * Time window in seconds
   */
  windowInSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if a request is within rate limits
 *
 * @example
 * const result = rateLimit({
 *   identifier: userEmail,
 *   limit: 5,
 *   windowInSeconds: 60
 * });
 * if (!result.success) {
 *   return error("Too many requests");
 * }
 */
export function rateLimit(config: RateLimitConfig): RateLimitResult {
  const { identifier, limit, windowInSeconds } = config;
  const now = Date.now();
  const windowMs = windowInSeconds * 1000;

  const entry = store.get(identifier);

  // No entry or entry expired
  if (!entry || entry.resetAt < now) {
    store.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + windowMs,
    };
  }

  // Entry exists and hasn't expired
  if (entry.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetAt,
    };
  }

  // Increment count
  entry.count++;
  store.set(identifier, entry);

  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    reset: entry.resetAt,
  };
}

/**
 * Reset rate limit for a specific identifier
 * Useful for testing or manual overrides
 */
export function resetRateLimit(identifier: string): void {
  store.delete(identifier);
}

/**
 * Get current rate limit status without incrementing
 */
export function getRateLimitStatus(identifier: string, limit: number): RateLimitResult | null {
  const entry = store.get(identifier);
  const now = Date.now();

  if (!entry || entry.resetAt < now) {
    return null;
  }

  return {
    success: entry.count < limit,
    limit,
    remaining: Math.max(0, limit - entry.count),
    reset: entry.resetAt,
  };
}
