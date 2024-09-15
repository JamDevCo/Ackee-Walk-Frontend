"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useSalarySubmissionContext } from '@/contexts/SalarySubmissionContext'
import { ComboboxSelect } from "@/components/ComboboxSelect"

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
  company_id: string;
  location_id: string;
  industry_id: string;
  experience_id: string;
  email: string;
}

interface Option {
  id: string;
  name: string;
}

const SalarySubmissionForm: React.FC = () => {
  const { submitSalary, loading, error: submissionError } = useSalarySubmissionContext();
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
    company_id: '',
    location_id: '',
    industry_id: '',
    experience_id: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [companies, setCompanies] = useState<Option[]>([]);
  const [locations, setLocations] = useState<Option[]>([]);
  const [industries, setIndustries] = useState<Option[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<Option[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/salary-form-data`);
        const data = await response.json();

        setCompanies(data.companies);
        setLocations(data.locations);
        setIndustries(data.industries);
        setExperienceLevels(data.experienceLevels);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.title) newErrors.title = "Job title is required";
    if (!formData.total_yearly_compensation) newErrors.total_yearly_compensation = "Total compensation is required";
    if (!formData.base_salary) newErrors.base_salary = "Base salary is required";
    if (!formData.company_id) newErrors.company_id = "Company is required";
    if (!formData.location_id) newErrors.location_id = "Location is required";
    if (!formData.industry_id) newErrors.industry_id = "Industry is required";
    if (!formData.experience_id) newErrors.experience_id = "Experience level is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const submissionData = {
          ...formData,
          company: companies.find(company => company.id === formData.company_id)?.name || '',
          location: locations.find(location => location.id === formData.location_id)?.name || '',
          industry: industries.find(industry => industry.id === formData.industry_id)?.name || '',
          experience_level: experienceLevels.find(level => level.id === formData.experience_id)?.name || '',
        };
        await submitSalary(submissionData);
        console.log('Salary submitted successfully');
        setSubmitSuccess(true);
        // Reset form
        setFormData({
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
          company_id: '',
          location_id: '',
          industry_id: '',
          experience_id: '',
          email: '',
        });
      } catch (err) {
        console.error('Error submitting salary:', err);
        setSubmitSuccess(false);
      }
    } else {
      console.log('Form validation failed', errors);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Submission Successful!</h2>
        <p className="mb-2">Thank you for submitting your salary information.</p>
        <p className="mb-4">Please check your email to verify your submission.</p>
        <p className="text-sm italic">Note: Your email is only used for verification and is not attached to the submission.</p>
      </div>
    );
  }

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
        <label htmlFor="years_of_experience">Years of Experience</label>
        <Input
          id="years_of_experience"
          name="years_of_experience"
          type="number"
          value={formData.years_of_experience}
          onChange={handleChange}
        />
        {errors.years_of_experience && <p className="text-red-500">{errors.years_of_experience}</p>}
      </div>

      <div>
        <label htmlFor="years_at_company">Years at Company</label> {/* New label for years_at_company */}
        <Input
          id="years_at_company"
          name="years_at_company"
          type="number"
          value={formData.years_at_company} // Bind to formData
          onChange={handleChange}
        />
        {errors.years_at_company && <p className="text-red-500">{errors.years_at_company}</p>} {/* Error message for years_at_company */}
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
      <div className="flex flex-col space-y-1.5">
        <label htmlFor="company_id">Company</label>
        <ComboboxSelect
          options={companies.map(company => ({ value: company.id, label: company.name }))}
          placeholder="Select company..."
          emptyMessage="No company found."
          value={formData.company_id}
          onValueChange={(value) => setFormData(prev => ({ ...prev, company_id: value }))}
        />
        {errors.company_id && <p className="text-red-500">{errors.company_id}</p>}
      </div>

      <div className="flex flex-col space-y-1.5">
        <label htmlFor="location_id">Location</label>
        <ComboboxSelect
          options={locations.map(location => ({ value: location.id, label: location.name }))}
          placeholder="Select location..."
          emptyMessage="No location found."
          value={formData.location_id}
          onValueChange={(value) => setFormData(prev => ({ ...prev, location_id: value }))}
        />
        {errors.location_id && <p className="text-red-500">{errors.location_id}</p>}
      </div>

      <div className="flex flex-col space-y-1.5">
        <label htmlFor="industry_id">Industry</label>
        <ComboboxSelect
          options={industries.map(industry => ({ value: industry.id, label: industry.name }))}
          placeholder="Select industry..."
          emptyMessage="No industry found."
          value={formData.industry_id}
          onValueChange={(value) => setFormData(prev => ({ ...prev, industry_id: value }))}
        />
        {errors.industry_id && <p className="text-red-500">{errors.industry_id}</p>}
      </div>

      <div className="flex flex-col space-y-1.5">
        <label htmlFor="experience_id">Experience Level</label>
        <ComboboxSelect
          options={experienceLevels.map(level => ({ value: level.id, label: level.name }))}
          placeholder="Select experience level..."
          emptyMessage="No experience level found."
          value={formData.experience_id}
          onValueChange={(value) => setFormData(prev => ({ ...prev, experience_id: value }))}
        />
        {errors.experience_id && <p className="text-red-500">{errors.experience_id}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email address"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      {submissionError && <p className="text-red-500">{submissionError}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Salary Information'}
      </Button>
      
    </form>
  );
}

export default SalarySubmissionForm