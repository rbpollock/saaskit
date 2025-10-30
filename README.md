# AI Saaskit

🏗️ ARCHITECTURE OVERVIEW

Framework: Next.js 15 (App Router)
Language: TypeScript
Database: PostgreSQL
ORM: Prisma
Auth: NextAuth (Google & GitHub)
Payments: Stripe
AI Models: OpenRouter API
Styling: Tailwind CSS v4 + ShadCN UI + Framer Motion
Structure: Monorepo (Turborepo recommended)
Deployment: Fully serverless (Vercel + PostgreSQL on Neon)

🔐 AUTHENTICATION & USER MANAGEMENT

NextAuth handles signup/sign-in (Google, GitHub)
Session management handled via NextAuth middleware
Middleware-based route protection (middleware.ts)
User profile management (name, email, plan, credits, role, lastLogin)
Roles: USER, ADMIN, SUPER_ADMIN
`lastLogin` field updated on each login event
Role and permission-based access handled at both DB and UI layers
Admin can assign or update roles and permissions

🧱 ROLE & PERMISSION SYSTEM (RBAC)

Tables:
Role → defines roles (Admin, Manager, User, etc.)
Permission → defines feature access (e.g., “manage_users”, “edit_discount”, “view_analytics”)
RolePermission → many-to-many relation between roles and permissions
UserRole → maps users to one or more roles

Implementation:
Controlled via Prisma models and RBAC middleware guards
Admin dashboard UI for managing roles and permissions
Middleware guard that checks user’s permissions before accessing pages/routes

Example permissions:
manage_users (CRUD on users)
manage_plans
manage_discounts
view_analytics
manage_roles
manage_blogs
create_payments

Super Admin:
Full unrestricted access including:

* User analytics and management
* Role and permission assignment
* Payment creation and discount management
* Blog creation, editing, and publishing

Frontend:
Hide or disable UI elements based on current user permissions
Centralized hook usePermission() to check access rights

💳 PAYMENT & BILLING (Stripe Integration)

Stripe subscriptions linked to PostgreSQL users
Plans:
Free → limited access
Pro → 5 chats/month, 1 PDF upload per chat
Business → unlimited chats and PDFs
Monthly / Yearly billing (10% yearly discount)
Discount code system with real-time validation
Admin dashboard for editing plan limits, prices, and discounts
Payment history and invoices stored in PostgreSQL via Prisma
Stripe webhook at /api/webhooks/stripe
Secure webhook verification

🤖 AI INTEGRATION (OpenRouter API)

AI chat system using OpenRouter models (GPT, Claude, Gemini, etc.)
Streaming AI responses via Server Actions
File upload & summarization (PDF to AI summary → downloadable PDF/CSV)
Credit-based usage system stored in PostgreSQL (credits per user)
Deduct credits per AI request based on plan
Logs stored in Chat, Message, and File tables via Prisma
Admin can monitor AI usage per user and model

📊 ANALYTICS & DASHBOARD

User dashboard:
Active chats, credits left, plan info
Admin dashboard (RBAC protected):
Revenue metrics (Stripe sync)
Active users and plans
AI usage analytics (per model, per plan)
Role management section (assign roles, permissions)
Super Admin dashboard for system-wide insights
Charts using Recharts or Chart.js integrated with ShadCN UI

📰 BLOG SECTION

Super Admin and Admin can:

* Create, edit, publish, and delete blogs
* Manage categories and tags
* View engagement analytics per post
  Blogs are stored in PostgreSQL with Prisma models (Blog, Category, Tag)

🎨 UI/UX

Tailwind CSS v4 + ShadCN UI components
Framer Motion for transitions
Dark/Light mode toggle
Responsive dashboard layout
Landing page with pricing, FAQ, and CTA
Smooth navigation animations

🗄️ DATABASE & ORM (Prisma + PostgreSQL)

Prisma ORM connected to PostgreSQL
Schema includes:
User, Role, Permission, RolePermission, UserRole
Plan, Subscription, Payment, DiscountCode
Chat, Message, File, CreditUsage
Blog, Category, Tag
Prisma migrations for schema updates
Aggregated analytics queries via Prisma
