"use client"
import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SalaryDetailsSidebar from './SalaryDetailsSidebar'
import Salary from '@/types/Salary'
import { MapPin ,Building2} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface EnhancedSalaryListViewProps {
  salaries: Salary[]
}

const EnhancedSalaryListView: React.FC<EnhancedSalaryListViewProps> = ({ salaries }) => {
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

  const handleRowClick = (salary: Salary) => {
    setSelectedSalary(salary)
    setIsSidebarOpen(true)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filteredSalaries = useMemo(() => {
    return salaries.filter(salary => 
      (filters.title ? salary.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
      (filters.company ? salary.company.name.toLowerCase().includes(filters.company.toLowerCase()) : true) &&
      (filters.location ? `${salary.location.city}, ${salary.location.country}`.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      (filters.experience ? salary.experience_level.name.toLowerCase().includes(filters.experience.toLowerCase()) : true) &&
      (filters.minSalary ? salary.base_salary >= parseInt(filters.minSalary) : true) &&
      (filters.maxSalary ? salary.base_salary <= parseInt(filters.maxSalary) : true)
    )
  }, [salaries, filters])

  const levels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Manager', 'Director', 'VP', 'C-Suite']
  const positions = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'Marketing', 'Sales', 'Finance', 'HR']

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-9">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-4">Salary Explorer</CardTitle>
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
              {filteredSalaries.map((salary) => (
                <div 
                  key={salary.id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(salary)}
                >
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                      {/* <img src={salary.company.logo} alt="Company Logo" className="w-full h-full object-cover" /> */}
                      <Building2 className="text-gray-400" size={32} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900">{salary.title}</h3>
                      <p className="text-sm text-gray-600">{salary.company.name}</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-gray-400" size={16} />
                        <p className="text-sm text-gray-500">{salary.location.city}, {salary.location.country}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{new Date(salary.posted_at).toLocaleDateString()}</p>
                    <p className="text-lg font-bold text-gray-900">${salary.base_salary.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{salary.experience_level.name}</p>
                  </div>
                </div>
              ))}
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