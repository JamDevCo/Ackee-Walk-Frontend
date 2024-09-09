interface Salary {
    id: number
    title: string
    company: { name: string }
    base_salary: number
    location: { city: string, region: string, country: string }
    bonus?: number
    experience_level: { name: string }
    years_at_company: number
    years_of_experience: number
    industry: { name: string }
    posted_at: string
    description: string
}

export default Salary