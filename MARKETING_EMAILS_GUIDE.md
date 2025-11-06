# Marketing Emails Feature - Admin Guide

## Overview

The Marketing Emails feature allows Admins and SuperAdmins to send promotional emails to users for marketing campaigns, feature announcements, and newsletters.

## Access

- **Who can access:** Admin and SuperAdmin roles only
- **Location:** `/admin/marketing` in the Admin Dashboard

## Features

### 1. Send Promotional Emails

#### Recipient Types

Choose who receives your emails:

- **All Users** - Send to every registered user
- **Verified Users Only** - Send only to users with verified emails
- **Free Plan Users** - Target users on the free plan (upsell opportunity)
- **Pro Plan Users** - Send to Pro subscribers
- **Business Plan Users** - Send to Business subscribers
- **Custom Email List** - Specify exact email addresses (comma-separated)

#### Email Composition

**Subject Line** (Required)
- The email subject that appears in inboxes
- Example: "🎉 Exciting News: New Features Just Launched!"

**Preheader Text** (Optional)
- Preview text that appears next to the subject line
- Example: "Check out what's new in AI SaaS..."
- Improves open rates

**Email Content** (Required)
- HTML content for the email body
- Supports standard HTML tags
- Automatically wrapped in a professional email template
- User's name is automatically inserted

**Example HTML Content:**
```html
<p>We're excited to announce a brand new feature!</p>

<div class="highlight-box">
  <h3>What's New?</h3>
  <ul>
    <li>Enhanced AI chat capabilities</li>
    <li>Faster response times</li>
    <li>New PDF processing features</li>
  </ul>
</div>

<p>Try it out today!</p>

<center>
  <a href="http://localhost:3000/dashboard" class="button">Try Now</a>
</center>
```

### 2. Quick Templates

Pre-made templates for common use cases:

#### New Feature Announcement
- Professional feature announcement
- Highlights key benefits
- Call-to-action button

#### Upgrade Offer
- Promotion for upgrading to Pro
- Lists Pro features
- Special offer messaging

#### Newsletter
- Monthly newsletter format
- Highlights and stats
- Community updates

### 3. Email Preview

- Click "Preview" to see how your email will look
- Shows formatted HTML content
- Helps catch formatting errors before sending

### 4. Campaign History

View all sent campaigns with:
- Subject line
- Recipient type
- Success/failure counts
- Send date and status
- Sender information

## Email Template

All promotional emails use a professional template with:

- **Header** - App branding with gradient background
- **Personalization** - "Hi {UserName}! 👋"
- **Content** - Your HTML content
- **Footer** - Copyright, links, unsubscribe notice

### Available CSS Classes

Use these classes in your HTML content:

- `.button` - Styled call-to-action button
- `.highlight-box` - Blue highlighted content box

### Example Button
```html
<center>
  <a href="https://your-app.com/dashboard" class="button">
    Click Here
  </a>
</center>
```

### Example Highlight Box
```html
<div class="highlight-box">
  <h3>Important Update</h3>
  <p>This content will be highlighted in blue.</p>
</div>
```

## How to Send a Campaign

### Step 1: Navigate to Marketing
1. Sign in as Admin or SuperAdmin
2. Go to Admin Dashboard
3. Click "Marketing" in the sidebar

### Step 2: Compose Your Email
1. Enter a compelling subject line
2. (Optional) Add preheader text
3. Write or paste your HTML content
4. Select recipient type
5. (If custom) Enter comma-separated email addresses

### Step 3: Preview (Recommended)
1. Click "Preview" button
2. Review the formatted email
3. Check for any formatting issues
4. Make edits if needed

### Step 4: Send
1. Click "Send Email" button
2. Wait for the process to complete
3. View success/failure counts in toast notification
4. Check Campaign History for details

## Technical Details

### API Endpoint

**POST** `/api/admin/marketing/send-email`

**Request Body:**
```json
{
  "subject": "Email subject",
  "content": "<p>HTML content</p>",
  "preheader": "Preview text",
  "recipientType": "all|verified|free|pro|business|custom",
  "recipientEmails": ["email1@example.com", "email2@example.com"]
}
```

**Response:**
```json
{
  "message": "Promotional email sent successfully",
  "campaignId": "clx1234567890",
  "totalRecipients": 100,
  "successCount": 98,
  "failureCount": 2
}
```

### GET `/api/admin/marketing/send-email`

Get campaign history (last 50 campaigns).

### Database

Promotional emails are tracked in the `promotional_emails` table:

- `id` - Unique campaign ID
- `subject` - Email subject
- `content` - HTML content
- `sentBy` - User ID of sender
- `recipientType` - Type of recipients
- `recipientEmails` - Custom email list (if applicable)
- `totalRecipients` - Number of recipients
- `successCount` - Successfully delivered
- `failureCount` - Failed deliveries
- `status` - draft, sending, sent, failed
- `sentAt` - Timestamp
- `createdAt` - Creation timestamp

### Batch Sending

Emails are sent in batches of 10 with a 1-second delay between batches to:
- Avoid overwhelming the SMTP server
- Prevent rate limiting
- Maintain deliverability

### Error Handling

- Individual email failures don't stop the entire campaign
- Failed emails are logged to console
- Success/failure counts tracked for each campaign
- Campaign status reflects overall success

## Best Practices

### Email Subject Lines
✅ **Good:**
- "🎉 New Feature: AI Chat Now Supports PDFs"
- "Special Offer: 50% Off Pro Plan (Limited Time)"
- "Your Monthly AI SaaS Update"

❌ **Avoid:**
- "URGENT!!! BUY NOW!!!" (looks like spam)
- "re: re: fwd:" (confusing)
- All caps (aggressive)

### Email Content

✅ **Good Practices:**
- Keep it concise and scannable
- Use clear headings
- Include one clear call-to-action
- Personalization is automatic (userName)
- Use proper HTML structure
- Test with preview before sending

❌ **Avoid:**
- Wall of text without formatting
- Multiple competing CTAs
- Broken HTML
- Missing links
- Images without alt text

### Timing

- **Feature Announcements** - Send during business hours (9 AM - 5 PM user's timezone)
- **Promotional Offers** - Tuesday-Thursday typically best
- **Newsletters** - Consistent schedule (e.g., first of month)
- **Avoid** - Weekends, holidays, late nights

### Testing

Before sending to all users:

1. Use "Custom" recipient type
2. Send to your own email first
3. Check formatting on multiple devices
4. Verify all links work
5. Test on different email clients (Gmail, Outlook, etc.)

## Troubleshooting

### Emails Not Sending

**Check:**
1. SMTP configuration in `.env` file
2. Run test endpoint: `/api/test-email`
3. Check console logs for errors
4. Verify sender has Admin/SuperAdmin role

### Low Open Rates

**Improve:**
1. Write compelling subject lines
2. Add preheader text
3. Personalize content
4. Send at optimal times
5. Segment your audience

### High Failure Rate

**Possible Causes:**
1. Invalid email addresses in database
2. SMTP server issues
3. Rate limiting
4. Spam filters blocking
5. Network connectivity

**Solutions:**
- Clean up invalid emails
- Check SMTP credentials
- Reduce batch size
- Follow email best practices
- Monitor deliverability

### Status Badges

- 🕒 **Draft** - Campaign created but not sent
- 🕒 **Sending** - Currently in progress
- ✅ **Sent** - Successfully sent to all recipients
- ❌ **Failed** - Campaign failed completely

## Security & Permissions

### Role Requirements
- Must have `ADMIN` or `SUPER_ADMIN` role
- Enforced at both API and UI level
- Regular users cannot access `/admin/marketing`

### Audit Trail
- All campaigns track who sent them (`sentBy`)
- Timestamps for creation and sending
- Full campaign history preserved

### Rate Limiting
- Batch sending prevents server overload
- 1-second delay between batches
- Maximum 10 emails per batch

## Examples

### Example 1: Feature Announcement

```html
<p>We're thrilled to introduce our latest feature: <strong>AI-Powered PDF Analysis</strong>!</p>

<div class="highlight-box">
  <h3>🚀 What You Can Do Now:</h3>
  <ul>
    <li>Upload PDFs up to 50MB</li>
    <li>Ask questions about your documents</li>
    <li>Get instant summaries</li>
    <li>Extract key insights automatically</li>
  </ul>
</div>

<p>This feature is available on all plans, starting today!</p>

<center>
  <a href="http://localhost:3000/dashboard/chat" class="button">Try PDF Analysis</a>
</center>

<p>As always, we'd love to hear your feedback!</p>
```

### Example 2: Upgrade Promotion

```html
<p>For a limited time, get <strong>50% off your first month</strong> of Pro!</p>

<div class="highlight-box">
  <h3>💎 Pro Plan Includes:</h3>
  <ul>
    <li>Unlimited AI conversations</li>
    <li>Priority support</li>
    <li>Advanced analytics</li>
    <li>Custom integrations</li>
    <li>Early access to new features</li>
  </ul>
</div>

<p><strong>Use code:</strong> <code>UPGRADE50</code> at checkout</p>

<p>⏰ Offer expires in 7 days!</p>

<center>
  <a href="http://localhost:3000/dashboard/billing" class="button">Upgrade Now</a>
</center>
```

### Example 3: Newsletter

```html
<p>Here's what happened this month at AI SaaS:</p>

<h3>📈 By the Numbers</h3>
<div class="highlight-box">
  <ul>
    <li><strong>1,234</strong> new users joined</li>
    <li><strong>50,000+</strong> AI conversations</li>
    <li><strong>5</strong> new features released</li>
    <li><strong>99.9%</strong> uptime maintained</li>
  </ul>
</div>

<h3>✨ Feature Highlights</h3>
<p>We launched PDF analysis, improved response times by 40%, and added dark mode support!</p>

<h3>🗓️ Coming Next Month</h3>
<p>Voice input, mobile apps, and team collaboration features.</p>

<p>Thank you for being part of our community!</p>

<center>
  <a href="http://localhost:3000/dashboard" class="button">Visit Dashboard</a>
</center>
```

## Monitoring & Analytics

### Campaign Metrics

Track these metrics for each campaign:

- **Total Recipients** - How many users received the email
- **Success Count** - Successfully delivered emails
- **Failure Count** - Failed deliveries
- **Success Rate** - (successCount / totalRecipients) × 100%

### Console Logs

Watch for these indicators:

```
📧 Sending promotional email to 100 recipients...
✅ Email sent to user@example.com
❌ Failed to send to invalid@example.com: SMTP error
✅ Promotional email campaign completed: 98 sent, 2 failed
```

## FAQ

**Q: Can I schedule emails for later?**
A: Not yet, but the database supports `scheduledFor` - feature coming soon!

**Q: How do I know if users opened the email?**
A: Open tracking is not currently implemented. Consider adding tracking pixels in your HTML content.

**Q: Can I send attachments?**
A: Not currently supported. Use links to download files instead.

**Q: What's the maximum number of recipients?**
A: No hard limit, but batching ensures reliable delivery for large lists.

**Q: Can I use images in my emails?**
A: Yes, use standard `<img>` tags with absolute URLs (hosted images).

**Q: How do I prevent users from unsubscribing?**
A: The footer includes an unsubscribe link. Consider implementing user preferences in settings.

**Q: Can I save drafts?**
A: Not in the UI yet, but campaigns are saved with status "draft" initially.

**Q: Is there a way to A/B test subject lines?**
A: Not built-in, but you can send to custom lists with different subjects.

## Support

For issues or questions:
1. Check console logs for errors
2. Review Campaign History for failed sends
3. Test with `/api/test-email` endpoint
4. Check SMTP configuration
5. Review this documentation

---

**Remember:** With great power comes great responsibility. Use marketing emails thoughtfully and respect your users' inboxes! 📧
