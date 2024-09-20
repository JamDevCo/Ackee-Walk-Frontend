"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SalaryDetailsSidebar from './SalaryDetailsSidebar'
import { MapPin } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useSalaryContext } from '@/contexts/SalaryContext'
import Salary from '@/types/Salary'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDebounce } from '@/hooks/useDebounce'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group" // Add this import

const EnhancedSalaryListView = () => {
  const { salaryData, loading, fetchSalaries } = useSalaryContext()
  const [selectedSalary, setSelectedSalary] = useState<Salary | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    industry: '',
    location: '',
    experience_level: '',
    sort_by: 'base_salary',
    sort_direction: 'desc' as 'asc' | 'desc',
    per_page: 20,
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Debounce the search filter
  const debouncedSearch = useDebounce(filters.search, 500)

  const handleRowClick = (salary: Salary) => {
    setSelectedSalary(salary)
    setIsSidebarOpen(true)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    if (key !== 'search') {
      setCurrentPage(1)
    }
  }

  const fetchSalariesWithFilters = useCallback(() => {
    fetchSalaries(currentPage, filters)
  }, [currentPage, filters, fetchSalaries])

  // Effect for non-search filter changes and pagination
  useEffect(() => {
    console.log('fetching salaries with filters', debouncedSearch)
    if (filters.search === debouncedSearch) {
      fetchSalariesWithFilters()
    }
  }, [currentPage,debouncedSearch, filters.search,filters.industry, filters.location, filters.experience_level, filters.sort_by, filters.sort_direction, fetchSalariesWithFilters])



  const levels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Manager', 'Director', 'VP', 'C-Suite']

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-9">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">Recent Submissions</CardTitle>
            <div className="">
              <Input 
                placeholder="Search by Job Title, Company, Location, or Experience Level" 
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full text-lg h-12"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">{salaryData?.total || 0} results</p>
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
                salaryData?.data.map((salary) => (
                  <div 
                    key={salary.id} 
                    className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(salary)}
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{salary.title}</h3>
                        <p className="text-sm text-gray-600">{salary.company.name}</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="text-gray-400" size={16} />
                          <p className="text-sm text-gray-500">{salary.location.city}, {salary.location.region}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{new Date(salary.posted_at).toLocaleDateString()}</p>
                      <p className="text-lg font-bold text-gray-900">${parseFloat(salary.base_salary).toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{salary.experience_level.name}</p>
                    </div>
                  </div> 
                ))
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="mx-4 text-gray-600">{currentPage} of {salaryData?.last_page}</span>
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, salaryData?.last_page || prev))}
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
            <div className="space-y-6">
              <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="industry-select">Industry</Label>
              <Select
                value={filters.industry}
                onValueChange={(value) => handleFilterChange('industry', value)}
              >
                <SelectTrigger id="industry-select">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Technology</SelectItem>
                  <SelectItem value="2">Finance</SelectItem>
                </SelectContent>
              </Select>
              </div>
              <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="location-select">Location</Label>
              <Select
                value={filters.location}
                onValueChange={(value) => handleFilterChange('location', value)}
              >
                <SelectTrigger id="location-select">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">New York</SelectItem>
                  <SelectItem value="2">San Francisco</SelectItem>
                </SelectContent>
              </Select>
              </div>
              <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="experience-level">Experience Level</Label>
              <ToggleGroup 
                type="single"
                variant="outline"
                value={filters.experience_level} 
                onValueChange={(value) => handleFilterChange('experience_level', value)}
                className="w-full flex flex-wrap gap-2 justify-start"
              >
                {levels.map((level, index) => (
                  <ToggleGroupItem key={index} value={(index + 1).toString()}>{level}</ToggleGroupItem>
                ))}
              </ToggleGroup>
              </div>
              <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="sort-select">Sort By</Label>
              <Select
                value={filters.sort_by}
                onValueChange={(value) => handleFilterChange('sort_by', value)}
              >
                <SelectTrigger id="sort-select">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="base_salary">Base Salary</SelectItem>
                  <SelectItem value="total_yearly_compensation">Total Compensation</SelectItem>
                  <SelectItem value="posted_at">Posted Date</SelectItem>
                </SelectContent>
              </Select>
              </div>
              <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="sort-order">Sort Order</Label>
              <RadioGroup defaultValue="asc">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asc" id="sort-order-asc" />
                    <Label htmlFor="sort-order-asc">ASC</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="desc" id="sort-order-desc" />
                    <Label htmlFor="sort-order-desc">DESC</Label>
                </div>
              </RadioGroup>
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