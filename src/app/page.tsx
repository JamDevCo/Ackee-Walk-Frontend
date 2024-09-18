import { SalaryProvider } from '../contexts/SalaryContext'
import SalariesPage from './salaries/page'

export default function Home() {
  return (
    <SalaryProvider>
      <SalariesPage />
    </SalaryProvider>
  )
}