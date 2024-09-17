'use client'
// import MainLayout from '@/app/layouts/MainLayout'
import SimpleLayout from '@/app/layouts/SimpleLayout'
import { Skeleton } from '@/components/ui/skeleton' 
import { Card } from '@/components/ui/card'
import EnhancedSalaryListView from '@/components/EnhancedSalaryListView'
import { useSalaryContext } from '@/contexts/SalaryContext'
import Salary from '@/types/Salary'
// import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import { Search } from 'lucide-react'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function SalaryPage() {
  const { salaries, loading, error } = useSalaryContext() as unknown as { 
    salaries: Salary[]; 
    loading: boolean; 
    error: string | null; 
  }

  const LoadingSkeleton = () => (
    <Card className="w-full p-4 h-full">
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )

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
                  Add Salary
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </div>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className="flex flex-row justify-between gap-6">
          <div className="w-full">
            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <EnhancedSalaryListView salaries={salaries} />
            )}
          </div>
          </div>
        </div>
      </div>
     
    </SimpleLayout>
  )
}