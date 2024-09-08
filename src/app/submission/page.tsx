'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import SalarySubmissionForm from '@/components/SalarySubmissionForm'
import MainLayout from '@/app/layouts/MainLayout'

export default function SalarySubmissionPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Submit Salary Information</h1>
        <Card>
          <CardHeader>
            <CardTitle>Submit Salary Information</CardTitle>
          </CardHeader>
          <CardContent>
            <SalarySubmissionForm />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}