import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function VerificationSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Verification Successful!</h1>
        <p className="mb-6">Thank you for verifying your salary submission. Your information has been successfully added to our database.</p>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}