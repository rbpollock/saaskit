export default function DeploymentPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Deployment Guide</h1>
      <p className="lead">
        Deploy your AI SaaS application to production on Vercel, Railway, or any platform.
      </p>

      <h2>Pre-Deployment Checklist</h2>
      <div className="not-prose rounded-xl border bg-card p-6 my-6">
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>All environment variables configured</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Database migrations applied</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>OAuth redirect URLs updated for production domain</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Stripe webhooks configured for production</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Production build tested locally</span>
          </li>
        </ul>
      </div>

      <h2>Deploy to Vercel (Recommended)</h2>
      <p>Vercel is the easiest platform for deploying Next.js applications.</p>

      <h3>Step 1: Install Vercel CLI</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>npm install -g vercel</code>
      </pre>

      <h3>Step 2: Login to Vercel</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>vercel login</code>
      </pre>

      <h3>Step 3: Deploy</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Deploy to production
vercel --prod

# Or deploy via GitHub integration (recommended)
# Push to main branch and Vercel will auto-deploy`}</code>
      </pre>

      <h3>Step 4: Configure Environment Variables</h3>
      <p>In Vercel Dashboard:</p>
      <ol>
        <li>Go to Project Settings → Environment Variables</li>
        <li>Add all variables from your <code>.env</code> file</li>
        <li>Update <code>NEXTAUTH_URL</code> to your production domain</li>
        <li>Redeploy to apply changes</li>
      </ol>

      <h3>Step 5: Set Up Database</h3>
      <p>Use a managed PostgreSQL service:</p>
      <ul>
        <li><strong>Vercel Postgres</strong> - Integrated with Vercel</li>
        <li><strong>Railway</strong> - Easy PostgreSQL hosting</li>
        <li><strong>Supabase</strong> - PostgreSQL with extras</li>
        <li><strong>Neon</strong> - Serverless PostgreSQL</li>
      </ul>

      <h3>Step 6: Run Migrations</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Set DATABASE_URL environment variable
export DATABASE_URL="your-production-database-url"

# Run migrations
npx prisma migrate deploy

# Seed database (if needed)
npx prisma db seed`}</code>
      </pre>

      <h2>Deploy to Railway</h2>
      <p>Railway provides hosting for both your app and database.</p>

      <h3>Step 1: Create Railway Project</h3>
      <ol>
        <li>Go to <a href="https://railway.app" target="_blank">Railway</a></li>
        <li>Click "New Project"</li>
        <li>Select "Deploy from GitHub repo"</li>
        <li>Connect your repository</li>
      </ol>

      <h3>Step 2: Add PostgreSQL</h3>
      <ol>
        <li>Click "+ New" → "Database" → "PostgreSQL"</li>
        <li>Railway will automatically set <code>DATABASE_URL</code></li>
      </ol>

      <h3>Step 3: Configure Build Settings</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Build Command
npm run build && npx prisma migrate deploy

# Start Command
npm start`}</code>
      </pre>

      <h3>Step 4: Add Environment Variables</h3>
      <p>Add all your environment variables in Railway dashboard.</p>

      <h2>Deploy to Any Platform</h2>
      <p>The app can be deployed to any platform that supports Node.js:</p>

      <h3>Docker Deployment</h3>
      <p>Create a <code>Dockerfile</code>:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]`}</code>
      </pre>

      <h3>Build and Run</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`docker build -t ai-saas .
docker run -p 3000:3000 ai-saas`}</code>
      </pre>

      <h2>Post-Deployment Configuration</h2>

      <h3>Update OAuth Redirect URLs</h3>
      <p>Update redirect URLs in OAuth provider dashboards:</p>
      <ul>
        <li><strong>Google</strong>: <code>https://yourdomain.com/api/auth/callback/google</code></li>
        <li><strong>GitHub</strong>: <code>https://yourdomain.com/api/auth/callback/github</code></li>
      </ul>

      <h3>Configure Stripe Webhooks</h3>
      <ol>
        <li>Go to Stripe Dashboard → Developers → Webhooks</li>
        <li>Add endpoint: <code>https://yourdomain.com/api/webhooks/stripe</code></li>
        <li>Select events:
          <ul>
            <li><code>checkout.session.completed</code></li>
            <li><code>customer.subscription.created</code></li>
            <li><code>customer.subscription.updated</code></li>
            <li><code>customer.subscription.deleted</code></li>
            <li><code>invoice.payment_succeeded</code></li>
            <li><code>invoice.payment_failed</code></li>
          </ul>
        </li>
        <li>Copy webhook signing secret to <code>STRIPE_WEBHOOK_SECRET</code></li>
      </ol>

      <h3>Set Up Custom Domain</h3>
      <p><strong>Vercel:</strong></p>
      <ol>
        <li>Go to Project Settings → Domains</li>
        <li>Add your custom domain</li>
        <li>Update DNS records as instructed</li>
      </ol>

      <h3>Enable HTTPS</h3>
      <p>Most platforms (Vercel, Railway) provide automatic HTTPS. Make sure:</p>
      <ul>
        <li><code>NEXTAUTH_URL</code> uses <code>https://</code></li>
        <li>All OAuth and webhook URLs use <code>https://</code></li>
      </ul>

      <h2>Monitoring & Maintenance</h2>

      <h3>Error Tracking</h3>
      <p>Set up error tracking with:</p>
      <ul>
        <li><strong>Sentry</strong> - Application monitoring</li>
        <li><strong>LogRocket</strong> - Session replay</li>
        <li><strong>Datadog</strong> - Infrastructure monitoring</li>
      </ul>

      <h3>Analytics</h3>
      <p>Add analytics to track usage:</p>
      <ul>
        <li><strong>Google Analytics</strong> - Web analytics</li>
        <li><strong>PostHog</strong> - Product analytics</li>
        <li><strong>Mixpanel</strong> - Event tracking</li>
      </ul>

      <h3>Database Backups</h3>
      <p>Set up automated database backups:</p>
      <ul>
        <li>Most managed databases include automatic backups</li>
        <li>Schedule manual backups for critical data</li>
        <li>Test restore procedures regularly</li>
      </ul>

      <h3>Performance Optimization</h3>
      <ul>
        <li>Enable caching for API responses</li>
        <li>Use CDN for static assets</li>
        <li>Optimize images with Next.js Image component</li>
        <li>Monitor Core Web Vitals</li>
      </ul>

      <h2>Scaling</h2>

      <h3>Horizontal Scaling</h3>
      <p>Most platforms auto-scale:</p>
      <ul>
        <li><strong>Vercel</strong> - Automatic scaling with serverless</li>
        <li><strong>Railway</strong> - Scale replicas in dashboard</li>
        <li><strong>Kubernetes</strong> - Custom scaling rules</li>
      </ul>

      <h3>Database Scaling</h3>
      <ul>
        <li>Read replicas for read-heavy workloads</li>
        <li>Connection pooling (PgBouncer)</li>
        <li>Database caching (Redis)</li>
      </ul>

      <h2>Troubleshooting</h2>

      <h3>Build Failures</h3>
      <ul>
        <li>Check environment variables are set</li>
        <li>Verify DATABASE_URL is accessible during build</li>
        <li>Review build logs for errors</li>
      </ul>

      <h3>Runtime Errors</h3>
      <ul>
        <li>Check application logs</li>
        <li>Verify all environment variables</li>
        <li>Test database connectivity</li>
        <li>Check API rate limits</li>
      </ul>

      <h3>OAuth Issues</h3>
      <ul>
        <li>Verify redirect URLs match exactly</li>
        <li>Check NEXTAUTH_URL is correct</li>
        <li>Ensure HTTPS is used in production</li>
      </ul>

      <h2>Security Best Practices</h2>
      <ul>
        <li>Never commit <code>.env</code> files to git</li>
        <li>Use strong <code>NEXTAUTH_SECRET</code></li>
        <li>Keep dependencies updated</li>
        <li>Enable rate limiting on APIs</li>
        <li>Use HTTPS everywhere</li>
        <li>Regular security audits</li>
      </ul>
    </div>
  );
}
