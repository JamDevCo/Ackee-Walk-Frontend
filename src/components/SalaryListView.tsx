"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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