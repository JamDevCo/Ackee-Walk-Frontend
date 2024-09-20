'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import Salary from '@/types/Salary'

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

interface FilterOptions {
  search?: string
  industry?: string
  location?: string
  experience_level?: string
  sort_by?: string
  sort_direction?: 'asc' | 'desc'
  per_page?: number
}

interface SalaryContextType {
  salaryData: PaginatedSalaryData | null
  loading: boolean
  error: string | null
  fetchSalaries: (page?: number, filterOptions?: FilterOptions) => Promise<void>
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

  const fetchSalaries = useCallback(async (page: number = 1, filterOptions: FilterOptions = {}) => {
    setLoading(true)
    setError(null)
    
    const queryParams = new URLSearchParams()
    queryParams.append('page', page.toString())
    
    // Append only if they exist
    if (filterOptions.search) queryParams.append('search', filterOptions.search)
    if (filterOptions.industry) queryParams.append('industry', filterOptions.industry)
    if (filterOptions.location) queryParams.append('location', filterOptions.location)
    if (filterOptions.experience_level) queryParams.append('experience_level', filterOptions.experience_level)
    queryParams.append('sort_by', filterOptions.sort_by || 'base_salary')
    queryParams.append('sort_direction', filterOptions.sort_direction || 'desc')
    queryParams.append('per_page', (filterOptions.per_page || 20).toString())

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salaries/search?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch salaries')
      }
      const data: PaginatedSalaryData = await response.json()
      setSalaryData(data)
      console.log(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
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