"use client"
import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SalaryDetailsSidebar from './SalaryDetailsSidebar'
import Salary from '@/types/Salary'
import { ComboboxSelect } from "@/components/ComboboxSelect"
import { Eye, ListFilter, File, PlusCircle } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

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
          <CardTitle className="mb-4">Salary List</CardTitle>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center">
              <TabsList >
                <TabsTrigger value="all" >All</TabsTrigger>
                <TabsTrigger value="verified" >Verified</TabsTrigger>
                <TabsTrigger value="unverified" >Unverified</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Verified
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Unverified</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Link href="/salaries/form">
                <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Salary 
                    </span>
                </Button>
                </Link>
              </div>
            </div>
          </Tabs>

          <div className="flex space-x-4 mt-4 pt-4">
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
                <TableHead>#</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Experience Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSalaries.map((salary, index) => (
                <TableRow 
                  key={salary.id} 
                  onClick={() => handleRowClick(salary)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>{(index + 1).toString().padStart(2, '0')}</TableCell> {/* Added cell for numbering with leading zeros */}
                  <TableCell className="font-bold">{salary.title}</TableCell> 
                  <TableCell >{salary.company.name}</TableCell>
                  <TableCell >${salary.base_salary.toLocaleString()}</TableCell>
                  <TableCell >{salary.location.city}, {salary.location.country}</TableCell> 
                  <TableCell >{salary.experience_level.name}</TableCell>
                  <TableCell ><Eye className="text-gray-500" size={20} /></TableCell>
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