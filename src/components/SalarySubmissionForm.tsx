import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface FormData {
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
}

const SalarySubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    total_yearly_compensation: '',
    base_salary: '',
    stock_grant_value: '',
    bonus: '',
    years_of_experience: '',
    years_at_company: '',
    education_level: '',
    gender: '',
    race: '',
    additional_comments: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.title) newErrors.title = "Job title is required";
    if (!formData.total_yearly_compensation) newErrors.total_yearly_compensation = "Total compensation is required";
    if (!formData.base_salary) newErrors.base_salary = "Base salary is required";
    if (!formData.years_of_experience) newErrors.years_of_experience = "Years of experience is required";
    if (!formData.years_at_company) newErrors.years_at_company = "Years at company is required";
    if (!formData.education_level) newErrors.education_level = "Education level is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // Here you would typically send the data to your backend
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Job Title</label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Software Engineer"
        />
        {errors.title && <p className="text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="total_yearly_compensation">Total Yearly Compensation</label>
        <Input
          id="total_yearly_compensation"
          name="total_yearly_compensation"
          type="number"
          value={formData.total_yearly_compensation}
          onChange={handleChange}
        />
        {errors.total_yearly_compensation && <p className="text-red-500">{errors.total_yearly_compensation}</p>}
      </div>

      <div>
        <label htmlFor="base_salary">Base Salary</label>
        <Input
          id="base_salary"
          name="base_salary"
          type="number"
          value={formData.base_salary}
          onChange={handleChange}
        />
        {errors.base_salary && <p className="text-red-500">{errors.base_salary}</p>}
      </div>

      <div>
        <label htmlFor="education_level">Education Level</label>
        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, education_level: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high_school">High School</SelectItem>
            <SelectItem value="bachelors">Bachelor&apos;s Degree</SelectItem>
            <SelectItem value="masters">Master&apos;s Degree</SelectItem>
            <SelectItem value="phd">PhD</SelectItem>
          </SelectContent>
        </Select>
        {errors.education_level && <p className="text-red-500">{errors.education_level}</p>}
      </div>

      <div>
        <label htmlFor="additional_comments">Additional Comments</label>
        <Textarea
          id="additional_comments"
          name="additional_comments"
          value={formData.additional_comments}
          onChange={handleChange}
          placeholder="Any additional information..."
        />
      </div>

      <Button type="submit">Submit Salary Information</Button>
    </form>
  )
}

export default SalarySubmissionForm