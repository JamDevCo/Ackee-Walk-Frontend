'use client'

import SimpleLayout from '@/app/layouts/SimpleLayout'
import EnhancedSalaryListView from '@/components/EnhancedSalaryListView'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { SalaryProvider } from '@/contexts/SalaryContext'

export default function SalaryPage() {

  return (
    <SimpleLayout>
      <div className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className=" border-b border-gray-200 mb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center py-12">
              <h1 className="text-5xl font-bold text-gray-900 mx-auto max-w-[800px] text-center mb-4">The #1 Resource for All Salary Insights</h1>
              <p className="mt-4 text-lg text-gray-600 mx-auto max-w-[800px] text-center">Discover, compare, and analyze salaries from various companies, roles, and locations. Gain valuable insights to make informed career decisions and negotiate better compensation packages.</p>
              <div className="mt-6 mx-auto max-w-[800px]">
                <Link href="/salaries/form">
                  <Button size="lg" className="rounded-full">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Your Salary
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className="flex flex-row justify-between gap-6">
            <div className="w-full">
              <SalaryProvider>
                <EnhancedSalaryListView />
              </SalaryProvider>
            </div>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}