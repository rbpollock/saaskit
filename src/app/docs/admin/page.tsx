export default function AdminPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Admin Dashboard</h1>
      <p className="lead">
        Complete admin panel with CRUD operations for users, subscriptions, payments, and blog management.
      </p>

      <h2>Access</h2>
      <p>The admin dashboard is available at <code>/admin</code> and requires ADMIN or SUPER_ADMIN role.</p>

      <h2>Features</h2>
      <ul>
        <li>User Management - Create, edit, delete users and manage roles</li>
        <li>Subscription Management - View and manage user subscriptions</li>
        <li>Payment Management - View payments and process refunds</li>
        <li>Blog Management - Create, edit, publish blog posts</li>
        <li>Role Management - View roles and permissions</li>
        <li>Analytics Dashboard - View key metrics and statistics</li>
      </ul>

      <h2>User Management</h2>

      <h3>List Users</h3>
      <p>At <code>/admin/users</code>:</p>
      <ul>
        <li>Paginated user list with search</li>
        <li>Filter by role</li>
        <li>View user details, roles, subscriptions</li>
        <li>Edit or delete users</li>
      </ul>

      <h3>Edit User</h3>
      <p>At <code>/admin/users/[id]</code>:</p>
      <ul>
        <li>Update user name, email, credits</li>
        <li>Assign/remove roles (SUPER_ADMIN only)</li>
        <li>View subscription and payment history</li>
        <li>Change subscription plan</li>
      </ul>

      <h2>Subscription Management</h2>

      <h3>View Subscriptions</h3>
      <p>At <code>/admin/subscriptions</code>:</p>
      <ul>
        <li>List all subscriptions</li>
        <li>Filter by status (active, canceled, past_due)</li>
        <li>View plan details and billing cycle</li>
        <li>Cancel subscriptions</li>
      </ul>

      <h2>Payment Management</h2>

      <h3>View Payments</h3>
      <p>At <code>/admin/payments</code>:</p>
      <ul>
        <li>List all payments</li>
        <li>Filter by user or status</li>
        <li>View payment details and invoices</li>
        <li>Process refunds (SUPER_ADMIN only)</li>
      </ul>

      <h2>Blog Management</h2>

      <h3>List Posts</h3>
      <p>At <code>/admin/blog</code>:</p>
      <ul>
        <li>View all blog posts (published and drafts)</li>
        <li>Quick publish/unpublish toggle</li>
        <li>Edit or delete posts</li>
        <li>Create new posts</li>
      </ul>

      <h3>Create/Edit Post</h3>
      <p>At <code>/admin/blog/new</code> or <code>/admin/blog/[id]</code>:</p>
      <ul>
        <li>Rich text editor for content</li>
        <li>Title, slug, excerpt fields</li>
        <li>Cover image upload</li>
        <li>Category selection</li>
        <li>Publish/draft toggle</li>
      </ul>

      <h2>Server Actions</h2>
      <p>Admin operations use Server Actions from <code>src/actions/admin.ts</code>:</p>
      <ul>
        <li><code>updateUser()</code> - Update user details</li>
        <li><code>deleteUser()</code> - Delete user</li>
        <li><code>assignRole()</code> - Assign role to user</li>
        <li><code>removeRole()</code> - Remove role from user</li>
        <li><code>cancelSubscription()</code> - Cancel user subscription</li>
        <li><code>changeUserPlan()</code> - Change subscription plan</li>
        <li><code>createBlogPost()</code> - Create new blog post</li>
        <li><code>updateBlogPost()</code> - Update blog post</li>
        <li><code>deleteBlogPost()</code> - Delete blog post</li>
        <li><code>refundPayment()</code> - Process payment refund</li>
      </ul>

      <h2>Authorization</h2>
      <p>All admin routes check for ADMIN or SUPER_ADMIN role:</p>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{`const userRoles = await prisma.userRole.findMany({
  where: { userId: session.user.id },
  include: { role: true },
});

const isAdmin = userRoles.some(
  (ur) => ur.role.name === "ADMIN" || ur.role.name === "SUPER_ADMIN"
);

if (!isAdmin) {
  redirect("/dashboard");
}`}</code>
      </pre>

      <h2>Security</h2>
      <ul>
        <li>All operations require authentication</li>
        <li>SUPER_ADMIN required for sensitive operations</li>
        <li>Cannot delete yourself</li>
        <li>Confirmation dialogs for destructive actions</li>
        <li>Audit logging for admin actions</li>
      </ul>
    </div>
  );
}
