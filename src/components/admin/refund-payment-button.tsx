"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { refundPayment } from "@/actions/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function RefundPaymentButton({
  paymentId,
  amount,
  userName,
}: {
  paymentId: string;
  amount: number;
  userName: string;
}) {
  const router = useRouter();
  const [isRefunding, setIsRefunding] = useState(false);

  const handleRefund = async () => {
    setIsRefunding(true);
    const result = await refundPayment(paymentId);

    if (result.success) {
      toast.success("Payment refunded successfully");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to refund payment");
    }
    setIsRefunding(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" disabled={isRefunding}>
          <DollarSign className="h-4 w-4 mr-1" />
          Refund
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Refund Payment?</AlertDialogTitle>
          <AlertDialogDescription>
            This will refund <strong>${amount.toFixed(2)}</strong> to <strong>{userName}</strong>.
            This will mark the payment as refunded in the database. You may need to process the actual refund through Stripe separately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRefund}>Process Refund</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
