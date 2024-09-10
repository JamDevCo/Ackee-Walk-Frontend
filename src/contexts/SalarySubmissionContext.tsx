'use client'

import React, { createContext, useContext, useState } from 'react'

interface SalarySubmission {
  title: string;
  total_yearly_compensation: string;
  base_salary: string;
  stock_grant_value: string;
  bonus: string;
  years_of_experience: string;
  years_at_company: string;
  education_level: string;
  gender: string;
  race: string;
  additional_comments: string;
  company: string;
  location: string;
}

interface SalarySubmissionContextType {
  submitSalary: (data: SalarySubmission) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const SalarySubmissionContext = createContext<SalarySubmissionContextType | undefined>(undefined);

export const useSalarySubmissionContext = () => {
  const context = useContext(SalarySubmissionContext);
  if (!context) {
    throw new Error('useSalarySubmissionContext must be used within a SalarySubmissionProvider');
  }
  return context;
};

export const SalarySubmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitSalary = async (data: SalarySubmission) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salaries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);

        throw new Error('Failed to submit salary');
      }

      const jsonData = await response.json();
      console.log('Submission successful:', jsonData);
      // Handle successful submission
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SalarySubmissionContext.Provider value={{ submitSalary, loading, error }}>
      {children}
    </SalarySubmissionContext.Provider>
  );
};