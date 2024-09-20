interface Company {
    id: string;
    name: string;
    logo: string | null;
    website: string | null;
    description: string | null;
}

interface ExperienceLevel {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Industry {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Location {
    id: string;
    country: string;
    region: string;
    city: string;
    created_at: string;
    updated_at: string;
}

interface Salary {
    id: string;
    title: string;
    total_yearly_compensation: string;
    base_salary: string;
    stock_grant_value: string;
    bonus: string | null;
    years_of_experience: number;
    years_at_company: number;
    education_level: string;
    gender: string;
    race: string;
    additional_comments: string;
    company: Company;
    company_id: string;
    experience_level: ExperienceLevel;
    experience_id: string;
    industry: Industry;
    industry_id: string;
    location: Location;
    location_id: string;
    is_verified: boolean;
    posted_at: string;
    created_at: string;
    updated_at: string;
    verification_token: string | null;
}

export default Salary;