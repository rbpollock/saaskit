"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Send, Users, CheckCircle, XCircle, Clock, Eye, ListIcon, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Campaign {
  id: string;
  subject: string;
  recipientType: string;
  totalRecipients: number;
  successCount: number;
  failureCount: number;
  status: string;
  sentAt: Date | null;
  createdAt: Date;
  sentByUser: {
    name: string | null;
    email: string;
  };
}

interface EmailRecipient {
  id: string;
  recipientEmail: string;
  recipientName: string | null;
  status: string;
  errorMessage: string | null;
  sentAt: Date | null;
  createdAt: Date;
}

export default function AdminMarketingPage() {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showRecipientsDialog, setShowRecipientsDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [recipients, setRecipients] = useState<EmailRecipient[]>([]);
  const [loadingRecipients, setLoadingRecipients] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    content: "",
    preheader: "",
    recipientType: "all",
    recipientEmails: "",
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/admin/marketing/send-email");
      if (!response.ok) throw new Error("Failed to fetch campaigns");

      const data = await response.json();
      setCampaigns(data.campaigns || []);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  const fetchRecipients = async (campaignId: string) => {
    setLoadingRecipients(true);
    try {
      const response = await fetch(`/api/admin/marketing/campaigns/${campaignId}/recipients`);
      if (!response.ok) throw new Error("Failed to fetch recipients");

      const data = await response.json();
      setRecipients(data.recipients || []);
    } catch (error) {
      console.error("Error fetching recipients:", error);
      toast.error("Failed to load recipient details");
    } finally {
      setLoadingRecipients(false);
    }
  };

  const handleViewRecipients = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowRecipientsDialog(true);
    fetchRecipients(campaign.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: any = {
        subject: formData.subject,
        content: formData.content,
        preheader: formData.preheader,
        recipientType: formData.recipientType,
      };

      if (formData.recipientType === "custom" && formData.recipientEmails) {
        payload.recipientEmails = formData.recipientEmails
          .split(",")
          .map((email) => email.trim())
          .filter((email) => email);
      }

      const response = await fetch("/api/admin/marketing/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      toast.success(
        `Email sent successfully! ${data.successCount}/${data.totalRecipients} delivered`
      );

      // Reset form
      setFormData({
        subject: "",
        content: "",
        preheader: "",
        recipientType: "all",
        recipientEmails: "",
      });

      // Refresh campaigns list
      fetchCampaigns();
    } catch (error: any) {
      toast.error(error.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      sent: { variant: "default", icon: CheckCircle },
      sending: { variant: "secondary", icon: Clock },
      failed: { variant: "destructive", icon: XCircle },
      draft: { variant: "outline", icon: Clock },
    };

    const { variant, icon: Icon } = variants[status] || variants.draft;

    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketing Emails</h1>
          <p className="text-muted-foreground mt-1">
            Send promotional emails to your users
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Compose Email Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Compose Email
            </CardTitle>
            <CardDescription>
              Create and send promotional emails to your users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line *</Label>
                <Input
                  id="subject"
                  placeholder="🎉 Exciting News: New Features Just Launched!"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preheader">Preheader Text (Optional)</Label>
                <Input
                  id="preheader"
                  placeholder="Check out what's new in AI SaaS..."
                  value={formData.preheader}
                  onChange={(e) =>
                    setFormData({ ...formData, preheader: e.target.value })
                  }
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  This appears next to the subject line in email clients
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Email Content (HTML) *</Label>
                <Textarea
                  id="content"
                  placeholder="<p>We're excited to announce...</p>"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={10}
                  required
                  disabled={loading}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  HTML content for the email body. Use standard HTML tags.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientType">Recipients *</Label>
                <Select
                  value={formData.recipientType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, recipientType: value })
                  }
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="verified">Verified Users Only</SelectItem>
                    <SelectItem value="free">Free Plan Users</SelectItem>
                    <SelectItem value="pro">Pro Plan Users</SelectItem>
                    <SelectItem value="business">Business Plan Users</SelectItem>
                    <SelectItem value="custom">Custom Email List</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.recipientType === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="recipientEmails">Recipient Emails *</Label>
                  <Textarea
                    id="recipientEmails"
                    placeholder="user1@example.com, user2@example.com, user3@example.com"
                    value={formData.recipientEmails}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recipientEmails: e.target.value,
                      })
                    }
                    rows={3}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter email addresses separated by commas
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  disabled={loading}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? "Hide" : "Preview"}
                </Button>
              </div>
            </form>

            {showPreview && formData.content && (
              <div className="mt-6 border rounded-lg p-4 bg-muted">
                <h3 className="font-semibold mb-2">Email Preview</h3>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Templates</CardTitle>
            <CardDescription>Pre-made email templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                setFormData({
                  ...formData,
                  subject: "🎉 New Feature Announcement",
                  content: `<p>We're excited to announce a brand new feature that will transform how you use AI SaaS!</p>
<div class="highlight-box">
  <h3>What's New?</h3>
  <ul>
    <li>Enhanced AI chat capabilities</li>
    <li>Faster response times</li>
    <li>New PDF processing features</li>
  </ul>
</div>
<p>Try it out today and let us know what you think!</p>
<center>
  <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" class="button">Try Now</a>
</center>`,
                })
              }
            >
              New Feature
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                setFormData({
                  ...formData,
                  subject: "💎 Special Offer: Upgrade to Pro",
                  content: `<p>For a limited time, get <strong>50% off</strong> on your first month of Pro!</p>
<div class="highlight-box">
  <h3>Pro Features Include:</h3>
  <ul>
    <li>Unlimited AI conversations</li>
    <li>Priority support</li>
    <li>Advanced analytics</li>
    <li>Custom integrations</li>
  </ul>
</div>
<p>Don't miss out on this exclusive offer!</p>
<center>
  <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/billing" class="button">Upgrade Now</a>
</center>`,
                })
              }
            >
              Upgrade Offer
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() =>
                setFormData({
                  ...formData,
                  subject: "📰 Monthly Newsletter",
                  content: `<p>Here's what happened this month at AI SaaS:</p>
<div class="highlight-box">
  <h3>Highlights:</h3>
  <ul>
    <li>1,000+ new users joined</li>
    <li>5 new features released</li>
    <li>99.9% uptime maintained</li>
  </ul>
</div>
<p>Thank you for being part of our community!</p>`,
                })
              }
            >
              Newsletter
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Campaign History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Campaign History
          </CardTitle>
          <CardDescription>Recent promotional email campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingCampaigns ? (
            <p className="text-center text-muted-foreground py-8">
              Loading campaigns...
            </p>
          ) : campaigns.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No campaigns sent yet
            </p>
          ) : (
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">
                      {campaign.subject}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="capitalize">{campaign.recipientType}</span>
                      <span>•</span>
                      <span>
                        {campaign.successCount}/{campaign.totalRecipients} sent
                      </span>
                      <span>•</span>
                      <span>
                        {campaign.sentAt
                          ? new Date(campaign.sentAt).toLocaleDateString()
                          : "Not sent"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRecipients(campaign)}
                    >
                      <ListIcon className="h-4 w-4 mr-1" />
                      View Recipients
                    </Button>
                    {getStatusBadge(campaign.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recipients Dialog */}
      <Dialog open={showRecipientsDialog} onOpenChange={setShowRecipientsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Campaign Recipients</DialogTitle>
            <DialogDescription>
              {selectedCampaign?.subject}
            </DialogDescription>
          </DialogHeader>

          {loadingRecipients ? (
            <div className="flex items-center justify-center py-8">
              <Clock className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading recipients...</span>
            </div>
          ) : recipients.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                No recipient tracking data available for this campaign.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                This feature was added after this campaign was sent.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 mb-4 p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Total Recipients</p>
                  <p className="text-2xl font-bold">{recipients.length}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Successfully Sent</p>
                  <p className="text-2xl font-bold text-green-600">
                    {recipients.filter(r => r.status === "sent").length}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">
                    {recipients.filter(r => r.status === "failed").length}
                  </p>
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent At</TableHead>
                      <TableHead>Error</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipients.map((recipient) => (
                      <TableRow key={recipient.id}>
                        <TableCell className="font-medium">
                          {recipient.recipientName || "—"}
                        </TableCell>
                        <TableCell>{recipient.recipientEmail}</TableCell>
                        <TableCell>
                          {recipient.status === "sent" ? (
                            <Badge variant="default" className="flex items-center gap-1 w-fit">
                              <CheckCircle className="h-3 w-3" />
                              Sent
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                              <XCircle className="h-3 w-3" />
                              Failed
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {recipient.sentAt
                            ? new Date(recipient.sentAt).toLocaleString()
                            : "—"}
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={recipient.errorMessage || ""}>
                          {recipient.errorMessage ? (
                            <span className="text-red-600 text-sm">
                              {recipient.errorMessage}
                            </span>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
