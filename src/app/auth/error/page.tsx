import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AuthError({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E5DBCF] px-4 text-[#1f1b18]">
      <Card className="w-full max-w-md rounded-[1.8rem] border-[#b8ab9c] bg-[#efe6dc] shadow-[0_24px_60px_-40px_rgba(31,27,24,0.45)]">
        <CardHeader className="space-y-1">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1f1b18] text-[#f3eadf]">
              <AlertCircle className="h-7 w-7" />
            </div>
          </div>
          <CardTitle className="font-display text-center text-3xl text-[#1f1b18]">
            Authentication Error
          </CardTitle>
          <CardDescription className="text-center text-[#5a524a]">
            {error === "Configuration"
              ? "There is a problem with the server configuration."
              : error === "AccessDenied"
                ? "You do not have permission to sign in."
                : error === "Verification"
                  ? "The verification token has expired or has already been used."
                  : "An error occurred during authentication."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/auth/signin">
            <Button className="w-full rounded-full bg-[#1f1b18] text-[#f3eadf] hover:bg-[#312a25]">
              Try Again
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
