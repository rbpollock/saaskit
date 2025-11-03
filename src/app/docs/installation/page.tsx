export default function InstallationPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Installation</h1>
      <p className="lead">
        Detailed guide for installing and configuring the AI SaaS Starter Kit.
      </p>

      <h2>System Requirements</h2>
      <ul>
        <li><strong>Node.js</strong>: Version 18.17 or later</li>
        <li><strong>PostgreSQL</strong>: Version 14 or later</li>
        <li><strong>Git</strong>: For version control</li>
        <li><strong>npm/yarn/pnpm</strong>: Package manager</li>
      </ul>

      <h2>Installation Methods</h2>

      <h3>Method 1: Clone from GitHub</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`git clone https://github.com/yourusername/ai-saas-starter.git
cd ai-saas-starter
npm install`}</code>
      </pre>

      <h3>Method 2: Use as Template</h3>
      <p>Click the "Use this template" button on GitHub to create your own repository.</p>

      <h2>Configuration</h2>

      <h3>Environment Variables</h3>
      <p>Create a <code>.env</code> file in the root directory:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_saas"

# NextAuth.js
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC="price_xxx"
NEXT_PUBLIC_STRIPE_PRICE_ID_PRO="price_xxx"
NEXT_PUBLIC_STRIPE_PRICE_ID_BUSINESS="price_xxx"

# OpenRouter AI
OPENROUTER_API_KEY="sk-or-v1-your-key"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"`}</code>
      </pre>

      <h3>Database Setup</h3>
      <p>Initialize and migrate your PostgreSQL database:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init

# Seed initial data (roles, plans)
npx prisma db seed`}</code>
      </pre>

      <h3>OAuth Provider Setup</h3>

      <h4>Google OAuth</h4>
      <ol>
        <li>Go to <a href="https://console.cloud.google.com/" target="_blank">Google Cloud Console</a></li>
        <li>Create a new project or select existing</li>
        <li>Enable Google+ API</li>
        <li>Create OAuth 2.0 credentials</li>
        <li>Add authorized redirect URI: <code>http://localhost:3000/api/auth/callback/google</code></li>
        <li>Copy Client ID and Client Secret to <code>.env</code></li>
      </ol>

      <h4>GitHub OAuth</h4>
      <ol>
        <li>Go to GitHub Settings → Developer settings → OAuth Apps</li>
        <li>Click "New OAuth App"</li>
        <li>Set Homepage URL: <code>http://localhost:3000</code></li>
        <li>Set Authorization callback URL: <code>http://localhost:3000/api/auth/callback/github</code></li>
        <li>Copy Client ID and generate Client Secret</li>
      </ol>

      <h3>Stripe Setup</h3>
      <ol>
        <li>Create a <a href="https://stripe.com" target="_blank">Stripe account</a></li>
        <li>Get your API keys from Dashboard → Developers → API keys</li>
        <li>Create subscription products and prices</li>
        <li>Set up webhook endpoint: <code>/api/webhooks/stripe</code></li>
        <li>Listen to events: <code>checkout.session.completed</code>, <code>customer.subscription.*</code>, <code>invoice.*</code></li>
      </ol>

      <h3>OpenRouter AI Setup</h3>
      <ol>
        <li>Sign up at <a href="https://openrouter.ai" target="_blank">OpenRouter</a></li>
        <li>Get your API key from Settings</li>
        <li>Add credits to your account</li>
        <li>Copy API key to <code>.env</code></li>
      </ol>

      <h2>Development Server</h2>
      <p>Start the development server:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>npm run dev</code>
      </pre>
      <p>The application will be available at <a href="http://localhost:3000">http://localhost:3000</a>.</p>

      <h2>Build for Production</h2>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Build
npm run build

# Start production server
npm start`}</code>
      </pre>

      <h2>Prisma Studio</h2>
      <p>View and edit your database with Prisma Studio:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>npx prisma studio</code>
      </pre>
      <p>Access at <a href="http://localhost:5555">http://localhost:5555</a>.</p>

      <h2>Verification</h2>
      <p>After installation, verify everything works:</p>
      <ul>
        <li>✅ Homepage loads at localhost:3000</li>
        <li>✅ Database connection successful</li>
        <li>✅ Sign in with OAuth works</li>
        <li>✅ API documentation at /api-docs</li>
        <li>✅ Admin dashboard at /admin</li>
      </ul>

      <h2>Next Steps</h2>
      <p>Once installed, check out:</p>
      <ul>
        <li><a href="/docs/authentication">Authentication Guide</a> - Set up user auth and roles</li>
        <li><a href="/docs/billing">Billing Guide</a> - Configure subscription plans</li>
        <li><a href="/docs/deployment">Deployment Guide</a> - Deploy to production</li>
      </ul>
    </div>
  );
}
