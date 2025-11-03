export default function AIPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>AI Integration</h1>
      <p className="lead">
        Connect to 200+ AI models via OpenRouter including GPT-4, Claude, Gemini, Llama, and more - all in one unified API.
      </p>

      <h2>Overview</h2>
      <p>
        The AI SaaS Starter Kit uses OpenRouter to provide access to multiple AI models through a single, consistent API. This allows you to switch between models easily and offer users choice in their AI provider.
      </p>

      <h2>OpenRouter Setup</h2>

      <h3>1. Create Account</h3>
      <ol>
        <li>Sign up at <a href="https://openrouter.ai" target="_blank">openrouter.ai</a></li>
        <li>Verify your email</li>
        <li>Add credits to your account</li>
      </ol>

      <h3>2. Get API Key</h3>
      <ol>
        <li>Go to Settings → API Keys</li>
        <li>Generate a new API key</li>
        <li>Copy to <code>.env</code>:</li>
      </ol>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code>OPENROUTER_API_KEY="sk-or-v1-your-key-here"</code>
      </pre>

      <h2>Available Models</h2>

      <h3>Popular Models</h3>
      <div className="not-prose my-6 space-y-2">
        <div className="rounded-lg border bg-card p-4">
          <h4 className="font-semibold mb-1">GPT-4 Turbo</h4>
          <p className="text-sm text-muted-foreground mb-2">OpenAI's most capable model</p>
          <code className="text-xs">openai/gpt-4-turbo</code>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h4 className="font-semibold mb-1">Claude 3.5 Sonnet</h4>
          <p className="text-sm text-muted-foreground mb-2">Anthropic's latest model</p>
          <code className="text-xs">anthropic/claude-3.5-sonnet</code>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h4 className="font-semibold mb-1">Gemini Pro</h4>
          <p className="text-sm text-muted-foreground mb-2">Google's multimodal model</p>
          <code className="text-xs">google/gemini-pro</code>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <h4 className="font-semibold mb-1">Llama 3 70B</h4>
          <p className="text-sm text-muted-foreground mb-2">Meta's open-source model</p>
          <code className="text-xs">meta-llama/llama-3-70b-instruct</code>
        </div>
      </div>

      <h2>Making API Calls</h2>

      <h3>Basic Chat Completion</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${process.env.OPENROUTER_API_KEY}\`,
    "HTTP-Referer": "https://yourdomain.com",
    "X-Title": "Your App Name",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "openai/gpt-4-turbo",
    "messages": [
      {
        "role": "user",
        "content": "Hello! How are you?"
      }
    ]
  })
});

const data = await response.json();
const message = data.choices[0].message.content;`}</code>
      </pre>

      <h3>With System Prompt</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`{
  "model": "anthropic/claude-3.5-sonnet",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful AI assistant specialized in coding."
    },
    {
      "role": "user",
      "content": "How do I create a React component?"
    }
  ]
}`}</code>
      </pre>

      <h3>Streaming Responses</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${process.env.OPENROUTER_API_KEY}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "openai/gpt-4-turbo",
    "messages": [...],
    "stream": true // Enable streaming
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  // Process chunk
}`}</code>
      </pre>

      <h2>Credit System Integration</h2>

      <h3>Deduct Credits</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`// Before API call
const user = await prisma.user.findUnique({
  where: { id: userId },
});

if (user.credits < requiredCredits) {
  throw new Error("Insufficient credits");
}

// Make AI call
const aiResponse = await callOpenRouter(messages);

// Deduct credits
await prisma.$transaction([
  prisma.user.update({
    where: { id: userId },
    data: { credits: { decrement: creditsUsed } },
  }),
  prisma.creditUsage.create({
    data: {
      userId,
      amount: creditsUsed,
      description: \`AI Chat - \${modelName}\`,
    },
  }),
]);`}</code>
      </pre>

      <h2>Cost Calculation</h2>
      <p>Different models have different costs. Example pricing:</p>
      <div className="not-prose my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Model</th>
              <th className="text-left py-2">Cost per 1K tokens</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">GPT-4 Turbo</td>
              <td className="py-2">$0.01 / $0.03 (input/output)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Claude 3.5 Sonnet</td>
              <td className="py-2">$0.003 / $0.015</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">GPT-3.5 Turbo</td>
              <td className="py-2">$0.0005 / $0.0015</td>
            </tr>
            <tr>
              <td className="py-2">Llama 3 70B</td>
              <td className="py-2">$0.00059 / $0.00079</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Chat History</h2>

      <h3>Database Schema</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`model Chat {
  id        String   @id @default(cuid())
  userId    String
  title     String?
  model     String   // Model used
  messages  Json     // Array of messages
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}`}</code>
      </pre>

      <h3>Storing Conversations</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`await prisma.chat.create({
  data: {
    userId,
    title: "Chat about Next.js",
    model: "gpt-4-turbo",
    messages: [
      { role: "user", content: "How do I..." },
      { role: "assistant", content: "To do that..." }
    ],
  },
});`}</code>
      </pre>

      <h2>Error Handling</h2>

      <h3>Common Errors</h3>
      <ul>
        <li><strong>401 Unauthorized</strong> - Invalid API key</li>
        <li><strong>402 Payment Required</strong> - Insufficient OpenRouter credits</li>
        <li><strong>429 Rate Limit</strong> - Too many requests</li>
        <li><strong>500 Server Error</strong> - Model provider issue</li>
      </ul>

      <h3>Example Error Handling</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`try {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    // ...config
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "AI request failed");
  }

  return await response.json();
} catch (error) {
  console.error("OpenRouter error:", error);
  // Return user-friendly error
  throw new Error("Unable to process AI request. Please try again.");
}`}</code>
      </pre>

      <h2>Model Selection</h2>

      <h3>Let Users Choose</h3>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`const models = [
  {
    id: "openai/gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "Most capable",
    creditsPerMessage: 10,
  },
  {
    id: "anthropic/claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    description: "Great for coding",
    creditsPerMessage: 8,
  },
  {
    id: "openai/gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Fast and affordable",
    creditsPerMessage: 2,
  },
];`}</code>
      </pre>

      <h2>Best Practices</h2>
      <ul>
        <li>Implement rate limiting per user</li>
        <li>Cache common responses when possible</li>
        <li>Monitor API usage and costs</li>
        <li>Provide clear error messages to users</li>
        <li>Show credit cost before making requests</li>
        <li>Implement conversation history limits</li>
        <li>Add timeout for long-running requests</li>
        <li>Use streaming for better UX</li>
      </ul>

      <h2>Advanced Features</h2>

      <h3>Function Calling</h3>
      <p>Some models support function calling for tool use:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`{
  "model": "openai/gpt-4-turbo",
  "messages": [...],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get weather for a location",
        "parameters": {
          "type": "object",
          "properties": {
            "location": { "type": "string" }
          }
        }
      }
    }
  ]
}`}</code>
      </pre>

      <h3>Vision Models</h3>
      <p>Send images to vision-capable models:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`{
  "model": "openai/gpt-4-vision-preview",
  "messages": [
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "What's in this image?" },
        {
          "type": "image_url",
          "image_url": { "url": "https://..." }
        }
      ]
    }
  ]
}`}</code>
      </pre>

      <h2>Monitoring</h2>
      <ul>
        <li>Track API usage per user</li>
        <li>Monitor response times</li>
        <li>Log errors and failures</li>
        <li>Set up alerts for high usage</li>
        <li>Review credit consumption patterns</li>
      </ul>

      <h2>Resources</h2>
      <ul>
        <li><a href="https://openrouter.ai/docs" target="_blank">OpenRouter Documentation</a></li>
        <li><a href="https://openrouter.ai/models" target="_blank">Available Models</a></li>
        <li><a href="https://openrouter.ai/activity" target="_blank">Usage Dashboard</a></li>
      </ul>
    </div>
  );
}
