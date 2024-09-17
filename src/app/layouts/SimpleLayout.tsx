'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Logo from '@/assets/icons/logo'


interface SimpleLayoutProps {
  children: React.ReactNode
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center">
                <Logo size={32}/>
                <span className="ml-2">Ackeewalk</span>
                <Badge variant="outline" className="ml-2">Beta</Badge>
              </Link>
              <nav className="hidden md:flex ml-10 space-x-4">
                {/* <Link href="/salaries" className="text-gray-500 hover:text-gray-900">
                  Salaries
                </Link>
                <Link href="/submission" className="text-gray-500 hover:text-gray-900">
                  Submit Salary
                </Link> */}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
            <Link href="/salaries/form" className="text-gray-500 hover:text-gray-900">
                    <Button>Add Your Salary</Button>
                </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Ackee Walk. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default SimpleLayout