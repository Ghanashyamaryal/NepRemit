"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Heading, Text } from "@/components/atoms/Typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="max-w-md mx-auto text-center px-4 py-16">
        <div className="text-6xl mb-4">⚠️</div>
        <Heading level="h1" className="mb-4">
          Something Went Wrong
        </Heading>
        <Text color="muted" className="mb-8">
          We apologize for the inconvenience. An unexpected error has occurred.
          Please try again or return to the home page.
        </Text>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={reset} size="lg">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg">
            <NextLink href="/">
              <Home className="h-4 w-4" />
              Go Home
            </NextLink>
          </Button>
        </div>
        {error.digest && (
          <Text variant="caption" color="muted" className="mt-8">
            Error ID: {error.digest}
          </Text>
        )}
      </div>
    </div>
  );
}
