'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Salary {
  id: number
  jobTitle: string
  company: string
  salary: number
  location: string
}

interface PaginatedSalaryData {
  current_page: number
  data: Salary[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

interface SalaryContextType {
  salaryData: PaginatedSalaryData | null
  loading: boolean
  error: string | null
  fetchSalaries: (page?: number) => Promise<void>
}

const SalaryContext = createContext<SalaryContextType | undefined>(undefined)

export const useSalaryContext = () => {
  const context = useContext(SalaryContext)
  if (!context) {
    throw new Error('useSalaryContext must be used within a SalaryProvider')
  }
  return context
}

export const SalaryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [salaryData, setSalaryData] = useState<PaginatedSalaryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSalaries = async (page: number = 1) => {
    setLoading(true)
    setError(null)
    console.log(page,"test")
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salaries?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch salaries')
      }
      const data: PaginatedSalaryData = await response.json()
      setSalaryData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSalaries()
  }, [])

  return (
    <SalaryContext.Provider value={{ salaryData, loading, error, fetchSalaries }}>
      {children}
    </SalaryContext.Provider>
  )
}

export default function SalaryProviderWrapper({ children }: { children: React.ReactNode }) {
  return <SalaryProvider>{children}</SalaryProvider>
}