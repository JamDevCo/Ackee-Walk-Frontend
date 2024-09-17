'use client'
import MainLayout from '@/app/layouts/MainLayout'
import { Skeleton } from '@/components/ui/skeleton' 
import { Card } from '@/components/ui/card'
import SalaryListView from '@/components/SalaryListView'
import { useSalaryContext } from '@/contexts/SalaryContext'
import Salary from '@/types/Salary'

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
    <MainLayout>

<div className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mt-4 mb-4">Salary List</h2>
        <div className="flex flex-row justify-between gap-6">
          <div className="flex-4">
            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <SalaryListView salaries={salaries} />
            )}
          </div>
          <div className="flex-1">
            <div className="ad-space h-64 flex justify-center items-center bg-gray-100 border border-gray-300 rounded-md">
              <p className="text-gray-500 text-lg">Ad space available</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}