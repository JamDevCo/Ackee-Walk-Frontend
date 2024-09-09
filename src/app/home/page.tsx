"use client"
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import SalaryListView from '@/components/SalaryListView'
import { useSalaryContext } from '../../contexts/SalaryContext'

const HomePage: React.FC = () => {
  const { salaries, loading, error } = useSalaryContext()

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Ackee Walk - Salary Transparency</h1>
        {loading ? (
          <p>Loading salaries...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <SalaryListView salaries={salaries} />
        )}
      </div>
    </MainLayout>
  )
}

export default HomePage