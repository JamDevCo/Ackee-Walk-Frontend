'use client'

import React from 'react'
import Link from 'next/link'
import { Home, BarChart2, Users, Settings, PlusCircle } from 'lucide-react'

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Ackee Walk</span>
      </div>
      <nav>
        <Link href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">
          <Home className="inline-block mr-2" size={20} />
          Home
        </Link>
        <Link href="/salaries" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">
          <BarChart2 className="inline-block mr-2" size={20} />
          Salaries
        </Link>
        <Link href="/companies" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">
          <Users className="inline-block mr-2" size={20} />
          Companies
        </Link>
        <Link href="/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">
          <Settings className="inline-block mr-2" size={20} />
          Settings
        </Link>
        <Link href="/submit-salary" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200">
          <PlusCircle className="inline-block mr-2" size={20} />
          Submit Salary
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar