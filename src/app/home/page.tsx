"use client"
import React from 'react'
import Image from 'next/image'
import MainLayout from '../layouts/MainLayout'
import { Card, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import headerImg from "@/assets/images/header-img-test.png" 

const HomePage: React.FC = () => {


  return (
    <MainLayout>
      <div className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white text-black p-8 rounded-lg mb-6 min-h-96 flex justify-between items-center">
          <div className="max-w-xl w-1/2 h-full">
            <h1 className="text-3xl font-bold mb-4">Unlock Your Earning Potential in Today&apos;s Job Market</h1>
            <p className="mb-6">Access in-depth salary insights and empower yourself with knowledge about compensation across diverse industries and roles.</p>
            <Button className="mb-4 w-fit">Start Your Journey</Button>
          </div>
          <div className="hidden md:block w-1/2 h-full justify-center items-center">
            <Image 
              src={headerImg}
              alt="Header illustration" 
              width={400} 
              height={400} 
              objectFit="contain"
              className="mx-auto"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Popular Jobs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {['Software Engineer', 'Product Manager', 'Data Scientist', 'Product Designer', 'Investment Banker', 'Management Consultant', 'Business Analyst', 'Accountant', 'Solutions Architecture'].map(job => (
            <Card key={job} className="p-4">
              <CardTitle>{job}</CardTitle>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-4">Popular Companies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Amazon', 'Microsoft', 'Google', 'Meta', 'Apple', 'Salesforce', 'Uber', 'Capital One', 'LinkedIn', 'Deloitte', 'Goldman Sachs', 'KPMG'].map(company => (
            <Card key={company} className="p-4">
              <CardTitle>{company}</CardTitle>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Input placeholder="Search for the company name" className="mb-4" />
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage