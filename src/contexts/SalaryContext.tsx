'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface Salary {
  id: number
  jobTitle: string
  company: string
  salary: number
  location: string
}

interface SalaryContextType {
  salaries: Salary[]
  loading: boolean
  error: string | null
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
  const [salaries, setSalaries] = useState<Salary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salaries`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch salaries')
        }
        const data = await response.json()
        setSalaries(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSalaries()
  }, [])

  return (
    <SalaryContext.Provider value={{ salaries, loading, error }}>
      {children}
    </SalaryContext.Provider>
  )
}

// Add this new component
export default function SalaryProviderWrapper({ children }: { children: React.ReactNode }) {
  return <SalaryProvider>{children}</SalaryProvider>
}