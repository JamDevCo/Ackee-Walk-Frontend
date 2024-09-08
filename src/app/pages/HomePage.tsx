import React from 'react'
import MainLayout from '../layouts/MainLayout'
import SalaryListView from '@/components/SalaryListView'

const sampleSalaries = [
  { id: 1, jobTitle: "Software Engineer", company: "TechCorp", salary: 85000, location: "New York" },
  { id: 2, jobTitle: "Product Manager", company: "InnovateCo", salary: 95000, location: "San Francisco" },
  { id: 3, jobTitle: "Data Analyst", company: "DataDrive", salary: 75000, location: "Chicago" },
]

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Ackee Walk - Salary Transparency</h1>
        <SalaryListView salaries={sampleSalaries} />
      </div>
    </MainLayout>
  )
}

export default HomePage