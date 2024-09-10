'use client'

import React from 'react'
import { Search } from 'lucide-react'

const TopBar: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* <h2 className="font-semibold text-xl text-gray-800">Dashboard</h2> */}
          <div className="relative mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white border border-gray-300"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopBar