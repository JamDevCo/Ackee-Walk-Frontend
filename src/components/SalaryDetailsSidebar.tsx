import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import Salary from "@/types/Salary"

interface SalaryDetailsProps {
  salary: Salary | null
  isOpen: boolean
  onClose: () => void
}

const SalaryDetailsSidebar: React.FC<SalaryDetailsProps> = ({ salary, isOpen, onClose }) => {
  if (!salary) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[500px] sm:w-[600px] bg-white">
        <SheetHeader>
          <SheetTitle>{salary.title} at {salary.company.name}</SheetTitle>
          <SheetDescription className="text-lg text-gray-500 " >Detailed salary information</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-6 bg-white">
          <div className="space-y-4">
            <DetailItem label="Base Salary" value={`$${salary.base_salary.toLocaleString()}`} />
            <DetailItem label="Bonus" value={salary.bonus ? `$${salary.bonus.toLocaleString()}` : 'N/A'} />
            <DetailItem label="Experience Level" value={salary.experience_level.name} />
            <DetailItem label="Location" value={`${salary.location.city}, ${salary.location.region}, ${salary.location.country}`} />
            <DetailItem label="Years at Company" value={salary.years_at_company.toString()} />
            <DetailItem label="Years of Experience" value={salary.years_of_experience.toString()} />
            <DetailItem label="Industry" value={salary.industry.name} />
            <DetailItem label="Posted At" value={new Date(salary.posted_at).toLocaleDateString()} />

            <DetailItem label="Job Description" value={salary.description} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <h4 className="font-semibold text-sm">{label}</h4>
    <p className="text-sm text-gray-500">{value}</p>
  </div>
)

export default SalaryDetailsSidebar