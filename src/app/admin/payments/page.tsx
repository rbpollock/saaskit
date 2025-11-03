import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { RefundPaymentButton } from "@/components/admin/refund-payment-button";
import { DollarSign, TrendingUp, CreditCard } from "lucide-react";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const perPage = 50;

  const [payments, totalPayments, stats] = await Promise.all([
    prisma.payment.findMany({
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
      take: perPage,
      skip: (page - 1) * perPage,
    }),
    prisma.payment.count(),
    prisma.payment.aggregate({
      _sum: { amount: true },
      _count: true,
      where: {
        status: "succeeded",
      },
    }),
  ]);

  const succeededPayments = payments.filter((p) => p.status === "succeeded");
  const refundedPayments = payments.filter((p) => p.status === "refunded");
  const totalPages = Math.ceil(totalPayments / perPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <p className="text-muted-foreground">View and manage all transactions</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(stats._sum.amount || 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              From {stats._count} successful payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPayments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {succeededPayments.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunded</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {refundedPayments.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
          <CardDescription>Transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">User</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Transaction ID</th>
                  <th className="text-right p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div>
                        <p className="font-medium">{payment.user.name || "Anonymous"}</p>
                        <p className="text-sm text-muted-foreground">{payment.user.email}</p>
                      </div>
                    </td>
                    <td className="p-2">
                      <span className="font-bold">${payment.amount.toFixed(2)}</span>
                    </td>
                    <td className="p-2">
                      <Badge
                        variant={
                          payment.status === "succeeded"
                            ? "default"
                            : payment.status === "refunded"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="p-2 text-sm">
                      {format(new Date(payment.createdAt), "MMM d, yyyy HH:mm")}
                    </td>
                    <td className="p-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {payment.stripePaymentId?.substring(0, 20)}...
                      </code>
                    </td>
                    <td className="p-2">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/users/${payment.userId}`}>
                          <Button size="sm" variant="outline">
                            View User
                          </Button>
                        </Link>
                        {payment.status === "succeeded" && (
                          <RefundPaymentButton
                            paymentId={payment.id}
                            amount={payment.amount}
                            userName={payment.user.name || payment.user.email}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {payments.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No payments found</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {page > 1 && (
                <Link href={`/admin/payments?page=${page - 1}`}>
                  <Button variant="outline">Previous</Button>
                </Link>
              )}
              <span className="py-2 px-4">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link href={`/admin/payments?page=${page + 1}`}>
                  <Button variant="outline">Next</Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
