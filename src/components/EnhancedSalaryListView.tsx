"use client"
import React, { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SalaryDetailsSidebar from './SalaryDetailsSidebar'
import { MapPin, Building2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSalaryContext} from '@/contexts/SalaryContext'
import Salary from '@/types/Salary'

const EnhancedSalaryListView = () => {
  const { salaryData, loading, fetchSalaries } = useSalaryContext()
  const [selectedSalary, setSelectedSalary] = useState<Salary | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    title: '',
    company: '',
    location: '',
    experience: '',
    minSalary: '',
    maxSalary: '',
  })
  const [currentPage, setCurrentPage] = useState(salaryData?.current_page || 1) // Add this line to define currentPage

  useEffect(() => {
    if (salaryData) {
      setCurrentPage(salaryData.current_page)
    }
  }, [salaryData])

  console.log(salaryData)
  const handleRowClick = (salary: Salary) => {
    setSelectedSalary(salary)
    setIsSidebarOpen(true)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filteredSalaries = useMemo(() => {
    if (!salaryData) return []

    return (salaryData.data as unknown as Salary[]).filter((salary ) => 
      (filters.title ? salary.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
      (filters.company ? salary.company.name.toLowerCase().includes(filters.company.toLowerCase()) : true) &&
      (filters.location ? 
        (salary.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
         salary.location.region.toLowerCase().includes(filters.location.toLowerCase()) ||
         salary.location.country.toLowerCase().includes(filters.location.toLowerCase()))
        : true) &&
      (filters.minSalary ? parseFloat(salary.base_salary) >= parseFloat(filters.minSalary) : true) &&
      (filters.maxSalary ? parseFloat(salary.base_salary) <= parseFloat(filters.maxSalary) : true)
    )
    
  }, [salaryData, filters])

  const levels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Manager', 'Director', 'VP', 'C-Suite']
  const positions = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'Marketing', 'Sales', 'Finance', 'HR']

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-9">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">Recent Submissions</CardTitle>
            <div className="">
              <Input 
                placeholder="Search by Job Title, Company, Location, or Experience Level" 
                value={filters.title}
                onChange={(e) => handleFilterChange('title', e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{filteredSalaries.length} results</p>
            </div>
          </CardHeader>
          <CardContent>
            
            <div className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {/* Skeleton Loader */}
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow-sm">
                      <div className="flex-1 flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-300 rounded animate-pulse"></div>
                        <div className="flex flex-col">
                          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse mt-1"></div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse mb-1"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse mt-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                filteredSalaries.map((salary) => (
                  <div
                    key={salary.id}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(salary)}
                  >
                    <div className="flex-1 flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <Building2 className="text-gray-400" size={32} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">{salary.title}</h3>
                        <p className="text-sm text-gray-600">{salary.company.name}</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="text-gray-400" size={16} />
                          <p className="text-sm text-gray-500">{salary.location.city }, {salary.location.region}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{new Date(salary.posted_at).toLocaleDateString()}</p>
                      <p className="text-lg font-bold text-gray-900">${salary.base_salary.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{salary.experience_level.name}</p>
                    </div>
                  </div> 
                ))
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => fetchSalaries(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="mx-4 text-gray-600">{currentPage} of {salaryData?.last_page}</span>
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() =>{ 
                    console.log(currentPage,"currentPage")
                    fetchSalaries(currentPage + 1)}}
                disabled={currentPage === salaryData?.last_page}
              >
                Next
              </button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="Search by Job Title" value={filters.title} onChange={(e) => handleFilterChange('title', e.target.value)} />
              
              <div>
                <h3 className="font-semibold mb-2">Levels</h3>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Button key={level} variant="outline" size="sm" className="text-xs">
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Positions</h3>
                <div className="flex flex-wrap gap-2">
                  {positions.map((position) => (
                    <Button key={position} variant="outline" size="sm" className="text-xs">
                      {position}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <SalaryDetailsSidebar 
        salary={selectedSalary} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  )
}

export default EnhancedSalaryListView