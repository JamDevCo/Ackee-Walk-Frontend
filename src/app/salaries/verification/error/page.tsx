'use client'

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import SimpleLayout from '@/app/layouts/SimpleLayout'

export default function VerificationError() {
  return (
    <SimpleLayout>
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h1>
        <p className="mb-6">We&apos;re sorry, but we couldn&apos;t verify your salary submission. This could be due to an expired or invalid verification link.</p>
        <p className="mb-6">If you believe this is an error, please try submitting your information again or contact our support team.</p>
        <Link href="/salaries">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
    </SimpleLayout>
  );
}