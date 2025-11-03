export default function BillingPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Billing & Subscriptions</h1>
      <p className="lead">
        Complete Stripe integration with subscription management, payment processing, and credit-based billing system.
      </p>

      <h2>Overview</h2>
      <p>
        The billing system uses Stripe for payment processing and subscription management. It includes a credit-based system where users can purchase subscription plans to receive monthly credits for AI usage.
      </p>

      <h2>Stripe Setup</h2>

      <h3>1. Create Stripe Account</h3>
      <ol>
        <li>Sign up at <a href="https://stripe.com" target="_blank">stripe.com</a></li>
        <li>Complete business verification</li>
        <li>Get your API keys from Dashboard → Developers → API keys</li>
      </ol>

      <h3>2. Configure Environment Variables</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`# Stripe API Keys
STRIPE_SECRET_KEY="sk_test_your_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Stripe Price IDs (from your products)
NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC="price_xxx"
NEXT_PUBLIC_STRIPE_PRICE_ID_PRO="price_xxx"
NEXT_PUBLIC_STRIPE_PRICE_ID_BUSINESS="price_xxx"`}</code>
      </pre>

      <h3>3. Create Products and Prices</h3>
      <p>In Stripe Dashboard:</p>
      <ol>
        <li>Go to Products → Add Product</li>
        <li>Create products for each plan (Free, Pro, Business)</li>
        <li>Add recurring prices (monthly and yearly)</li>
        <li>Copy Price IDs to environment variables</li>
      </ol>

      <h2>Subscription Plans</h2>

      <h3>Database Schema</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`model Plan {
  id              String   @id @default(cuid())
  name            String   @unique
  description     String?
  monthlyPrice    Float
  yearlyPrice     Float
  chatsPerMonth   Int      @default(-1)  // -1 = unlimited
  pdfsPerChat     Int      @default(-1)
  creditsPerMonth Int      @default(0)
  features        String[] // Array of features
  isActive        Boolean  @default(true)
}`}</code>
      </pre>

      <h3>Default Plans</h3>
      <div className="not-prose grid gap-4 md:grid-cols-3 my-6">
        <div className="rounded-xl border bg-card p-6">
          <h4 className="font-bold text-lg mb-2">Free</h4>
          <div className="text-3xl font-bold mb-4">$0<span className="text-sm text-muted-foreground">/mo</span></div>
          <ul className="text-sm space-y-2">
            <li>✓ 100 credits/month</li>
            <li>✓ Basic AI models</li>
            <li>✓ Community support</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-primary bg-card p-6">
          <div className="text-xs font-bold bg-primary text-primary-foreground rounded-full px-2 py-1 inline-block mb-2">POPULAR</div>
          <h4 className="font-bold text-lg mb-2">Pro</h4>
          <div className="text-3xl font-bold mb-4">$19<span className="text-sm text-muted-foreground">/mo</span></div>
          <ul className="text-sm space-y-2">
            <li>✓ 1,000 credits/month</li>
            <li>✓ All AI models</li>
            <li>✓ Priority support</li>
            <li>✓ API access</li>
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h4 className="font-bold text-lg mb-2">Business</h4>
          <div className="text-3xl font-bold mb-4">$49<span className="text-sm text-muted-foreground">/mo</span></div>
          <ul className="text-sm space-y-2">
            <li>✓ 5,000 credits/month</li>
            <li>✓ All AI models</li>
            <li>✓ Dedicated support</li>
            <li>✓ Custom integrations</li>
          </ul>
        </div>
      </div>

      <h3>Seeding Plans</h3>
      <p>Plans are automatically seeded when you run:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>npx prisma db seed</code>
      </pre>

      <h2>Checkout Flow</h2>

      <h3>1. Create Checkout Session</h3>
      <p>Users click "Subscribe" button, which triggers:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// POST /api/create-checkout
{
  "priceId": "price_xxx",
  "billingCycle": "monthly" // or "yearly"
}

// Response
{
  "url": "https://checkout.stripe.com/c/pay/cs_xxx"
}`}</code>
      </pre>

      <h3>2. Redirect to Stripe Checkout</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`const response = await fetch("/api/create-checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    priceId: selectedPlan.stripePriceId,
    billingCycle: "monthly",
  }),
});

const { url } = await response.json();
window.location.href = url; // Redirect to Stripe`}</code>
      </pre>

      <h3>3. Payment Processing</h3>
      <p>Stripe handles:</p>
      <ul>
        <li>Payment form (PCI compliant)</li>
        <li>Card validation</li>
        <li>3D Secure authentication</li>
        <li>Payment processing</li>
      </ul>

      <h3>4. Webhook Processing</h3>
      <p>After successful payment, Stripe sends webhook to:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>POST /api/webhooks/stripe</code>
      </pre>

      <h2>Webhook Events</h2>

      <h3>Handled Events</h3>
      <div className="not-prose rounded-xl border bg-card p-6 my-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-1">checkout.session.completed</h4>
            <p className="text-sm text-muted-foreground">Creates subscription and assigns credits when checkout succeeds</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">customer.subscription.created</h4>
            <p className="text-sm text-muted-foreground">Creates subscription record in database</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">customer.subscription.updated</h4>
            <p className="text-sm text-muted-foreground">Updates subscription status (active, past_due, canceled)</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">customer.subscription.deleted</h4>
            <p className="text-sm text-muted-foreground">Marks subscription as canceled</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">invoice.payment_succeeded</h4>
            <p className="text-sm text-muted-foreground">Records payment and renews credits for billing cycle</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">invoice.payment_failed</h4>
            <p className="text-sm text-muted-foreground">Marks subscription as past_due, sends notification</p>
          </div>
        </div>
      </div>

      <h3>Webhook Setup</h3>

      <h4>Local Development</h4>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy webhook signing secret to .env
STRIPE_WEBHOOK_SECRET="whsec_xxx"`}</code>
      </pre>

      <h4>Production</h4>
      <ol>
        <li>Go to Stripe Dashboard → Developers → Webhooks</li>
        <li>Click "Add endpoint"</li>
        <li>URL: <code>https://yourdomain.com/api/webhooks/stripe</code></li>
        <li>Select events:
          <ul>
            <li><code>checkout.session.completed</code></li>
            <li><code>customer.subscription.*</code></li>
            <li><code>invoice.*</code></li>
          </ul>
        </li>
        <li>Copy signing secret to production environment</li>
      </ol>

      <h2>Credit System</h2>

      <h3>How Credits Work</h3>
      <ul>
        <li>New users get 100 free credits</li>
        <li>Subscription plans include monthly credit allocations</li>
        <li>Credits are consumed when using AI features</li>
        <li>Credits reset at start of each billing cycle</li>
      </ul>

      <h3>Credit Consumption</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Deduct credits when user uses AI
await prisma.user.update({
  where: { id: userId },
  data: {
    credits: {
      decrement: creditsUsed,
    },
  },
});

// Track usage
await prisma.creditUsage.create({
  data: {
    userId,
    amount: creditsUsed,
    description: "AI Chat - GPT-4",
  },
});`}</code>
      </pre>

      <h3>Credit Renewal</h3>
      <p>Credits are automatically renewed on successful invoice payment:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// When invoice.payment_succeeded webhook received
const subscription = await prisma.subscription.findUnique({
  where: { stripeSubscriptionId },
  include: { plan: true },
});

await prisma.user.update({
  where: { id: subscription.userId },
  data: {
    credits: subscription.plan.creditsPerMonth,
  },
});`}</code>
      </pre>

      <h2>Subscription Management</h2>

      <h3>View Subscription</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// GET /api/subscriptions
const subscription = await prisma.subscription.findUnique({
  where: { userId: session.user.id },
  include: { plan: true },
});`}</code>
      </pre>

      <h3>Cancel Subscription</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// DELETE /api/subscriptions/{id}
await stripe.subscriptions.update(stripeSubscriptionId, {
  cancel_at_period_end: true,
});`}</code>
      </pre>

      <h3>Change Plan</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Update subscription
await stripe.subscriptions.update(stripeSubscriptionId, {
  items: [{
    id: subscriptionItemId,
    price: newPriceId,
  }],
  proration_behavior: 'create_prorations',
});`}</code>
      </pre>

      <h2>Payment Records</h2>

      <h3>Payment Model</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`model Payment {
  id              String   @id @default(cuid())
  userId          String
  stripePaymentId String   @unique
  amount          Float
  currency        String
  status          String   // succeeded, failed, pending
  description     String?
  invoiceUrl      String?
  receiptUrl      String?
  createdAt       DateTime @default(now())
}`}</code>
      </pre>

      <h3>View Payment History</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// GET /api/payments
const payments = await prisma.payment.findMany({
  where: { userId: session.user.id },
  orderBy: { createdAt: 'desc' },
});`}</code>
      </pre>

      <h2>Refunds</h2>

      <h3>Process Refund (Admin Only)</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Admin action
const refund = await stripe.refunds.create({
  payment_intent: paymentIntentId,
  amount: amountInCents, // Optional: partial refund
  reason: 'requested_by_customer',
});

// Update payment status
await prisma.payment.update({
  where: { stripePaymentId },
  data: { status: 'refunded' },
});`}</code>
      </pre>

      <h2>Testing</h2>

      <h3>Test Cards</h3>
      <div className="not-prose rounded-xl border bg-card p-6 my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Scenario</th>
              <th className="text-left py-2">Card Number</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Success</td>
              <td className="py-2"><code>4242 4242 4242 4242</code></td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Decline</td>
              <td className="py-2"><code>4000 0000 0000 0002</code></td>
            </tr>
            <tr className="border-b">
              <td className="py-2">3D Secure</td>
              <td className="py-2"><code>4000 0025 0000 3155</code></td>
            </tr>
            <tr>
              <td className="py-2">Insufficient Funds</td>
              <td className="py-2"><code>4000 0000 0000 9995</code></td>
            </tr>
          </tbody>
        </table>
        <p className="text-muted-foreground mt-4">Use any future expiry date and any 3-digit CVC.</p>
      </div>

      <h3>Test Webhooks Locally</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>{`# Start webhook listener
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger invoice.payment_succeeded`}</code>
      </pre>

      <h2>Best Practices</h2>

      <h3>Security</h3>
      <ul>
        <li>Never expose secret keys in client-side code</li>
        <li>Always verify webhook signatures</li>
        <li>Use HTTPS in production</li>
        <li>Implement idempotency for webhook handlers</li>
      </ul>

      <h3>Error Handling</h3>
      <ul>
        <li>Handle payment failures gracefully</li>
        <li>Notify users of failed payments</li>
        <li>Implement retry logic for failed webhooks</li>
        <li>Log all payment events for debugging</li>
      </ul>

      <h3>User Experience</h3>
      <ul>
        <li>Show clear pricing information</li>
        <li>Display credit balance prominently</li>
        <li>Send email confirmations for payments</li>
        <li>Provide easy cancellation process</li>
      </ul>

      <h2>Troubleshooting</h2>

      <h3>Webhook Not Receiving Events</h3>
      <ul>
        <li>Verify webhook URL is accessible</li>
        <li>Check webhook secret is correct</li>
        <li>Review Stripe webhook logs in dashboard</li>
        <li>Ensure endpoint returns 200 status code</li>
      </ul>

      <h3>Payment Declined</h3>
      <ul>
        <li>Check card has sufficient funds</li>
        <li>Verify card details are correct</li>
        <li>Test with Stripe test cards first</li>
        <li>Review Stripe dashboard for decline reason</li>
      </ul>

      <h3>Credits Not Updating</h3>
      <ul>
        <li>Check webhook was received and processed</li>
        <li>Verify subscription is active in database</li>
        <li>Review credit renewal logic</li>
        <li>Check for database transaction errors</li>
      </ul>

      <h2>API Reference</h2>
      <p>See the <a href="/api-docs">API Documentation</a> for billing endpoints:</p>
      <ul>
        <li><code>POST /api/create-checkout</code> - Create checkout session</li>
        <li><code>POST /api/webhooks/stripe</code> - Stripe webhooks</li>
        <li><code>GET /api/subscriptions</code> - List subscriptions</li>
        <li><code>GET /api/payments</code> - List payments</li>
      </ul>
    </div>
  );
}
