import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Salary {
  id: number
  jobTitle: string
  company: string
  salary: number
  location: string
}

interface SalaryListViewProps {
  salaries: Salary[]
}

const SalaryListView: React.FC<SalaryListViewProps> = ({ salaries }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary List</CardTitle>
        <div className="flex space-x-2 mt-6">
          <Input placeholder="Search job titles..." className="max-w-sm" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="san-francisco">San Francisco</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salaries.map((salary) => (
              <TableRow key={salary.id}>
                <TableCell>{salary.jobTitle}</TableCell>
                <TableCell>{salary.company}</TableCell>
                <TableCell>${salary.salary.toLocaleString()}</TableCell>
                <TableCell>{salary.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default SalaryListView