"use client"
import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SalaryDetailsSidebar from './SalaryDetailsSidebar'
import Salary from '@/types/Salary'
import { ComboboxSelect } from "@/components/ComboboxSelect"
import { Eye } from 'lucide-react'

interface SalaryListViewProps {
  salaries: Salary[]
}

const SalaryListView: React.FC<SalaryListViewProps> = ({ salaries }) => {
  const [selectedSalary, setSelectedSalary] = useState<Salary | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [titleFilter, setTitleFilter] = useState<string>('')
  const [companyFilter, setCompanyFilter] = useState<string>('')

  const handleRowClick = (salary: Salary) => {
    setSelectedSalary(salary)
    setIsSidebarOpen(true)
  }

  const uniqueTitles = useMemo(() => {
    const titles = new Set(salaries.map(s => s.title))
    return Array.from(titles).map(title => ({ value: title, label: title }))
  }, [salaries])

  const uniqueCompanies = useMemo(() => {
    const companies = new Set(salaries.map(s => s.company.name))
    return Array.from(companies).map(company => ({ value: company, label: company }))
  }, [salaries])

  const filteredSalaries = useMemo(() => {
    return salaries.filter(salary => 
      (titleFilter ? salary.title === titleFilter : true) &&
      (companyFilter ? salary.company.name === companyFilter : true)
    )
  }, [salaries, titleFilter, companyFilter])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Salary List</CardTitle>
          <div className="flex space-x-4 mt-4">
            <div className="w-1/2">
              <ComboboxSelect
                options={uniqueTitles}
                placeholder="Filter by Job Title"
                emptyMessage="No titles found"
                value={titleFilter}
                onValueChange={setTitleFilter}
              />
            </div>
            <div className="w-1/2">
              <ComboboxSelect
                options={uniqueCompanies}
                placeholder="Filter by Company"
                emptyMessage="No companies found"
                value={companyFilter}
                onValueChange={setCompanyFilter}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Experience Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSalaries.map((salary) => (
                <TableRow 
                  key={salary.id} 
                  onClick={() => handleRowClick(salary)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>{salary.title}</TableCell> 
                  <TableCell>{salary.company.name}</TableCell>
                  <TableCell>${salary.base_salary.toLocaleString()}</TableCell>
                  <TableCell>{salary.location.city}, {salary.location.country}</TableCell> 
                  <TableCell>{salary.experience_level.name}</TableCell>
                  <TableCell><Eye className="text-gray-500" size={20} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <SalaryDetailsSidebar 
        salary={selectedSalary} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  )
}

export default SalaryListView